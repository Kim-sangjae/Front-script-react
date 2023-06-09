// 클라이언트가 전송한 파일을 처리하는 라이브러리

// 파일 처리 라이브러리
const multer = require('multer');
// 경로변수 설정할 수 있는 환경을 제공한다
const path = require('path');

module.exports = function fileHandler(dest) {

    return multer({
        
        //storage
        storage : multer.diskStorage({
            
            // 파일의 저장 경로를 설정
            destination : (req,file,cb) =>{
            cb(null, `${__dirname}/../files/${dest}/`);
            },
            // 파일의 랜덤이름 생성 (중복 방지)
        filename : (req,file,cb) =>{
            const ext = path.extname(file.originalname);
            cb(null,Date.now()+ext);
        }
        }),



        //fileFilter(필터링)
        fileFilter : (req,file,cb) =>{
            // 파일의 확장자(extension)
            const ext = path.extname(file.originalname);

            // 특정 포맷의 파일만 업로드 가능하게 설정
            if(ext === '.jpg' || ext === '.jpeg' || ext === '.png'){
                return cb(null,true);
            }

            const err = new TypeError('This type of file is not acceptable.');
            cb(err);
        },


        //limits
        limits: {
            fileSize : 1e7, // 10Mb 크기 까지만 업로드 가능 (숫자 1 e7)
            files : 10 // 파일 갯수 제한 , 10개 까지만 업로드 가능
        }
    })
};