const User = require("../models/User"); // 유저모델
const fileHandler = require("../utils/fileHandler"); // 파일처리
const {body,validationResult} = require("express-validator"); // 유효성 검사

/**
 * 입력 데이터 유효성 검사
 */
// 유효한 유저이름 체크
const isValidUsername = () => body('username')
    .trim()
    .isLength({min:5}).withMessage('Username must be at least 5 characters')
    .isAlphanumeric().withMessage('Username is only allowed in alphabet and number.')

// 이메일 체크
const isValidEmail = () => body('email')
    .trim()
    .isEmail().withMessage('E-mail is not valid')

// 비밀번호 체크
const isValidPassword = () => body('password')
    .trim()
    .isLength({min:5}).withMessage('Password must be at least 5 characters')

// 이메일 중복체크
const emailInUse = async(email)=>{
    const user = await User.findOne({email}); // User 컬렉션(테이블) 에서 검사한다 findOne(컬럼값) jpa와 비슷한 방식

    if(user){
        return Promise.reject('E-mail is already in use');
    }
}
// 이름 중복체크
const usernameInUse = async(username)=>{
    const user = await User.findOne({username});

    if(user){
        return Promise.reject('Username is already in use');
    }
}


// 이메일의 존재 여부(로그인 시 사용)
const doesEmailExists = async (email) =>{
    const user = await User.findOne({email});

    if(!user){
        return Promise.reject('User is not found');
    }
}

// 패스워드 일치 여부
const doesPasswordMatch = async (password, {req}) => {
    const email = req.body.email;
    const user = await User.findOne({email});

    if(!user.checkPassword(password)){
        return Promise.reject("Password does not match");
    }
}




// 회원가입 로직(메서드)
exports.create = [
    isValidUsername().custom(usernameInUse),
    isValidEmail().custom(emailInUse),
    isValidPassword(),

    async(req,res,next) => {
        // 가입절차
        try {

            const errors = validationResult(req); // 유효성 검사 결과

            if(!errors.isEmpty()){ // 검사에 실패해서 에러에 값이 있을 경우
                const err = new Error();
                err.errors = errors.array();
                err.status = 400;
                throw err;
            }

            // 검사 통과했을경우 클라이언트가 전송한 데이터
            const {email , fullName , username , password}  = req.body;

            // 새로운 유저를 생성한다
            const user = new User();

            user.email = email;
            user.fullName = fullName;
            user.username = username;
            user.setPassword(password);

            await user.save();

            res.json({user}); // 서버에서 생성한 객체를 클라이언트에게 전달




        } catch (error){
            next(error); // next -> 전달받은 에러를 app.js에있는 에러 핸들러에 전달한다
        }
    }
];







// 정보 수정 로직
exports.update = [
    fileHandler('profiles').single('avatar'), // 사진 업로드 했을 때
    isValidUsername().custom(usernameInUse).optional(),
    isValidEmail().custom(emailInUse).optional(),

    async (req,res,next) =>{

        try{
            const errors = validationResult(req); // 유효성 검사 결과


            if(!errors.isEmpty()){
                const err = new Error();
                err.errors = errors.array();
                err.status = 400;
                throw err;
            }

            
            const _user = req.user; // req.user : user 객체

            if(req.file){// 프로필 사진을 전송할 경우 (avatar)
                _user.avatar = req.file.filename;
            }

            // Object.assign(객체 , 변경값) : user 객체 중에서 클라이언트가 요청한 속성만 업데이트한다
            Object.assign(_user , req.body);

            await _user.save();



            const token = _user.generateJWT(); // 토큰 재생성 (토큰에 username 속성이 들어있으므로 업데이트할때 다시 생성해주어야 한다)
            const user = {
                username : _user.username,
                email : _user.email,
                fullName : _user.fullName,
                avatar : _user.avatar,
                bio : _user.bio,
                token
            }

            res.json({user})



        } catch(error){
            next(error)
        }


    }
];










// 로그인 로직
exports.login = [
    isValidEmail().custom(doesEmailExists),
    isValidPassword().custom(doesPasswordMatch),
    
    async(req,res,next) => {
        try{
            const errors = validationResult(req); // 유효성 검사 결과

            if(!errors.isEmpty()){
                const err = new Error();
                err.errors = errors.array();
                err.status = 401;
                throw err;
            }


            const {email} = req.body;

            const _user = await User.findOne({email});
            const token = _user.generateJWT(); // 로그인 토큰을 생성

            const user = {
                username : _user.username,
                email : _user.email,
                fullName : _user.fullName,
                avatar : _user.avatar,
                bio : _user.bio,
                token
            }

            res.json({user}); // 클라이언트에게 데이터 전송



        } catch(error){
            next(error)
        }
    }

];