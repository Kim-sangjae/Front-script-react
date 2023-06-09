const User = require('../models/User');
const Article = require('../models/Article');
const Follow = require('../models/Follow');
const Favorite = require('../models/Favorite');


// 프로필 리스트 가져오기
exports.find = async(req,res,next) =>{
    try{
        const where ={};
        const limit = req.query.limit || 10;
        const skip = req.query.skip || 0;

        // 프로필 검색 조건
        // 특정 유저가 팔로우 하는 프로필 리스트
        if('following' in req.query){
            const user = await User.findOne({username : req.query.following});
            const follows = await Follow
            .find({follower: user._id})

            where._id = follows.map(follow => follow.following);
        }

        // 특정유저를 팔로우 하는 프로필리스트
        if('followers' in req.query){
            const user = await User.findOne({username: req.query.followers});
            const follows = await Follow
            .find({following:user._id})

            where._id = follows.map(follow => follow.follower);
        }

        // 특정게시물을 좋아요 한 프로필리스트
        if('favorite' in req.query){
            const favorites = await Favorite.find({article: req.query.favorite})

            where._id = favorites.map(favorite => favorite.user);
        }


        // 특정 글자를 가진 유저이름의 프로필리스트
        if('username' in req.query){
            // RegExp : 정규식 사용
            where.username = new RegExp(req.query.username,'i');
        }



        // 실제 프로필 검색
        const profileCount = await User.count(where);

        const profiles = await User
        .find(where, 'username fullName avatar bio')
        .populate({
            path : 'isFollowing', // Follow 컬렉션과의 조인
            match : {follower: req.user._id} // 매치가 된다면 로그인한 유저가 팔로우한 유저임을 알수있다
        })
        .limit(limit)
        .skip(skip)

        res.json({profiles,profileCount});




    } catch (error){
        next(error)
    };



};

// 프로필 한개 가져오기
exports.findOne = async(req,res,next) =>{
    try {

        // 파라미터로 프로필검색
        const _profile = await User
        .findOne({username : req.params.username},'username fullName avatar bio')
        .populate({
            path: 'isFollowing',
            match: {follower: req.user._id}
        })

        if(!_profile){
            const err = new Error("Profile not found");
            err.status = 404;
            throw err;
        }

    const{
        username,
        fullName,
        avatar,
        bio,
        isFollowing

    } = _profile;

    // 프로필 유저의 팔로잉 수
    const followingCount = await Follow.count({follower : _profile._id})
    // 프로필 유저의 팔로워 수
    const followerCount = await Follow.count({following: _profile._id})
    // 프로필 유저의 게시물 수
    const articleCount = await Article.count({author:_profile._id})

    const profile = {
        username,
        fullName,
        avatar,
        bio,
        isFollowing,
        followingCount,
        followerCount,
        articleCount
    }

    res.json({profile})




    }catch (error){
        next(error)
    }

};


// 팔로우 처리
exports.follow = async(req,res,next) =>{
    try{
        // 로그인한 유저와 팔로우할 유저가 같을 경우 ( 본인 팔로우 )
        if(req.user.username === req.params.username){
            const err = new Error('Cannot Follow yourSelf')
            err.status = 400;
            throw err;
        }

        // 파라미터로 팔로우할 프로필을 검색
        const profile = await User
        .findOne({username:req.params.username}, 'username fullName avatar bio');

        // 프로필이 없을때
        if(!profile){
            const err = new Error('Profile not found');
            err.status = 404;
            throw err;
        }

        // 이미 팔로우 중인 경우
        const _follow = await Follow
        .findOne({follower : req.user._id , following: profile._id})

        // 팔로우중이 아니라면
        if(!_follow){
            const follow = new Follow({
                follower : req.user._id,
                following : profile._id
            })
            
            await follow.save();
        }

            res.json({profile}) // 방금 팔로우한 프로필을 전송


    }catch(error){
        next(error)
    }
};






// 팔로우 취소
exports.unfollow = async(req,res,next) =>{

    try{
        
        const username = req.params.username;
        // 팔로우 취소할 프로필 검색
        const profile = await User.findOne({username}, 'username fullName avatar bio');

        // 프로필이 없는경우
        if(!profile){
            const err = new Error("Profile not found")
            err.status = 404;
            throw err;
        }

        // 현재 팔로우 중인 프로필인지 확인
        const follow = await Follow
        .findOne({ follower: req.user._id , following: profile._id});

        // 팔로우 중이면 취소
        if(follow){
            await follow.deleteOne();
        }

        res.json({profile}); // 팔로우 취소한 프로필 반환

    } catch(error){
        next(error)
    }

};