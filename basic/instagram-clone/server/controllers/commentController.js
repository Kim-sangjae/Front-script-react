const User = require('../models/User');
const Article = require('../models/Article');
const Comment = require('../models/Comment');


// 댓글 가져오기
exports.find = async(req,res,next) =>{
    try{
        // 댓글을 불러올 게시물
        const article = await Article.findById(req.params.id);

        const where = {article: article._id}; // 검색조건 (불러온 게시물의 아이디)
        const limit = req.query.limit || 10;
        const skip = req.query.skip || 0;

        const commentCount = await Comment.count(where);
        const comments = await Comment
        .find(where)
        .populate({
            path: 'author',
            select: 'username avatar'
        })
        .sort({created : 'desc'})
        .limit(limit)
        .skip(skip)

        res.json({comments,commentCount});





    }catch(error){
        next(error)
    }
};




// 댓글 생성
exports.create = async(req,res,next) =>{
    try{
        const _comment = new Comment({
            article: req.params.id, // 댓글을 단 게시물의 아이디
            content: req.body.content, // 댓글 내용
            author: req.user._id // 댓글 작성자 ( 로그인한 유저 )
        })

        await _comment.save(); // 댓글 저장

        const comment = await _comment
        .populate({
         path: 'author', // User 컬렉션과 조인
         select : 'username avatar'   
        })

        res.json({comment});

    }catch(error){
        next(error)
    }
};



// 댓글 삭제
exports.delete = async(req,res,next) =>{
    try{
        // 파라미터로 삭제할 댓글 검색
        const comment = await Comment
        .findById(req.params.id);

        if(!comment){ // 댓글이 존재하지 않으면
            const err = new Error("Comment not found")
            err.status = 404;
            throw err;
        }

        if(req.user._id.toString() !== comment.author.toString()){ // 로그인유저와 게시글댓글의 유저가 다른경우
            const err = new Error("Incorrect user");
            err.status = 400;
            throw err;
        }

        await comment.deleteOne();

        res.json({comment}); // 삭제한 댓글을 전송

    }catch(error){
        next(error)
    }
};
