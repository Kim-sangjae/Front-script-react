const User = require('../models/User');
const Follow = require('../models/Follow');
const Article = require('../models/Article');
const Favorite = require('../models/Favorite');
const fileHandler = require('../utils/fileHandler');


// 피드 가져오기
exports.feed = async(req,res,next) =>{
    try{
        // follow 컬렉션중 팔로워가 로그인 유저인 도큐먼트
        const follows = await Follow.find({follower:req.user._id});

        // follows 에서 following 값만 추출하여 리스트를 생성
        // 로그인 유저가 팔로우하는 유저들의 id 리스트
        const followings = follows.map(follow => follow.following);

        const where = {author:[...followings, req.user.id]} // 검색조건
        const limit = req.query.limit || 5; 
        const skip = req.query.skip || 0;


        const articleCount = await Article.count(where); // 조건에 맞는 게시물 개수
        const articles = await Article
        .find(where)
        .populate({
            path : 'author',
            select : 'username avatar'
        })
        .populate({
            path : 'isFavorite'
        })
        .populate({
          path : 'commentCount'  
        })
        .sort({created:'desc'})
        .skip(skip)
        .limit(limit)

        res.json({articles,articleCount});


    } catch (error){
        next(error)
    }
};


// 게시물 가져오기
exports.find = async(req,res,next) =>{
    try{
        const where = {} // 검색 조건
        const limit = req.query.limit || 9 // 클라이언트에게 한번 전송할때 보낼 최대 객체의 수 ( 보여지는 갯수 )
        const skip = req.query.skip || 0 // 데이터베이스 안에서 건너 뛸 객체의 수 

        if('username' in req.query){ // 프로필의 타임라인 게시물
            const user = await User.findOne({username : req.query.username});
            where.author = user._id; // 검색조건 추가
        }


        const articleCount = await Article.count(where); // 해당하는 게시물의 갯수
        const articles = await Article
        .find(where, 'photos favoriteCount created') // find( 검색조건 , 검색 필드(컬럼값) )
        .populate({
            path:'commentCount' // 조인컬럼 : 게시물에 달린 댓글 갯수을 알 수 있다
        })
        .sort({created:'desc'}) // 생성일 기준 내림차순
        .limit(limit)
        .skip(skip)

        res.json({articles,articleCount}); // 검색결과를 전송



    }catch(error){
        next(error)
    }
};



// 게시물 한개 가져오기
exports.findOne = async(req,res,next) =>{
    try{
        const article = await Article
        .findById(req.params.id)
        .populate({ // populate 는 컬렉션 조인이라고 생각하면 된다
            path: 'author', // User컬렉션 조인
            select : 'username avatar' // 필드 선택
        })
        .populate({ 
            path: 'isFavorite' // Favorit 컬랙션 조인
        })
        .populate({
            path : 'commentCount' // Comment 컬렉션 조인
        })

        if(!article){
            const err = new Error("Article not found");
            err.status = 404;
            throw err;
        }

        res.json({article})

    }catch(error){
        next(error)
    }
};



// 게시물 생성
exports.create = [
    fileHandler('articles').array('photos'),
    async (req, res, next) => {
      try {
        
        const files = req.files;
  
        if (files.length < 1) {
          const err = new Error('File is required');
          err.status = 400;
          throw err;
        }
  
        const photos = files.map(file => file.filename);
  
        const article = new Article({
          photos,
          description: req.body.description,
          author: req.user._id
        });
  
        await article.save();
  
        res.json({ article });
  
      } catch (error) {
        next(error)
      }
    }
  ]





// 게시물 삭제
exports.delete = async (req,res,next) =>{
try{
    // 삭제할 게시물
    const article = await Article.findById(req.params.id);

    if(!article){
        const err =new Error("Article not found")
        err.status = 404;
        throw err;
    } 

    // 본인게시물이 아닌경우
    if(req.user._id.toString() !== article.author.toString()){
        const err = new Error("Author is not correct")
        err.status = 400;
        throw err;
    }

    await article.deleteOne();

    res.json({article})



} catch(error){
    next(error)
}

};





// 좋아요
exports.favorite = async(req,res,next) =>{
    try{
        // 좋아요 누를 게시물 찾기
        const article = await Article.findById(req.params.id);

        if(!article){ // 게시물이 존재하지 않을 때
            const err = new Error("Article not found");
            err.status = 404; // NotFound
            throw err;
        }

        // 이미 좋아요한 게시물인지 확인
        const _favorite = await Favorite
        .findOne({user: req.user._id , article: article._id}) // req.user : 로그인한 유저

        // 처음 좋아요 요청한 게시물이면
        if(!_favorite){
            const favorite = new Favorite({
                user : req.user._id,
                article : article._id
            })
            await favorite.save(); // Favorite 테이블에 객체 생성

            article.favoriteCount++; // 게시물의 좋아요 수 증가 시키기
            await article.save(); // 변경사항을 저장 한다

        }

        res.json({article}) // 좋아요 처리를 완료한 게시물을 전송

    } catch(error){
        next(error)
    }
};

// 좋아요 취소
exports.unfavorite = async(req,res,next) =>{

    try{
        // 좋아요 누를 게시물 찾기
        const article = await Article.findById(req.params.id);

        if(!article){ // 게시물이 존재하지 않을 때
            const err = new Error("Article not found");
            err.status = 404; // NotFound
            throw err;
        }

        // 이미 좋아요한 게시물인지 확인
        const favorite = await Favorite
        .findOne({user: req.user._id , article: article._id}) // req.user : 로그인한 유저

        // 좋아요가 있을때
        if(favorite){
         
            await favorite.deleteOne();

            article.favoriteCount--; // 게시물의 좋아요 수 감소
            await article.save(); // 변경사항을 저장 한다

        }

        res.json({article}) // 좋아요 처리를 완료한 게시물을 전송

    } catch(error){
        next(error)
    }



};