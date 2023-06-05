//설치한 패키기 가져오기

// 서버개발 프레임워크
const express = require("express");
// 404에러 처리
const createError = require("http-errors");
// 클라이언트가 전송한 쿠키를 수집한다
const cookieParser = require("cookie-parser");
// 기록을 저장한다 , 콘솔에 실시간으로 출력도 한다
const logger = require("morgan");
// 서버에서 서버로 요청할 수 있게 한다
const cors = require("cors");
// 라우터(routes에있는 index파일을 가져온것)
const indexRouter = require("./routes/index");
// 앱
const app = express();
// 앱(현재 개발중인 api서버) 과 mongodb를 연결한다
const mongoose = require("mongoose");
// 압축기능 제공
const compression = require("compression");
// Http 요청 헤더정보를 위한 보안기능 제공
const helmet = require("helmet");
// 환경변수를 사용할 수 있는 환경을 제공해준다
require("dotenv").config();



// 데이터베이스 연결
mongoose.set("strictQuery",false);
mongoose
    .connect(process.env.MONGODB_URI)
    .catch(err => console.log(err));


// 미들웨어 - 서로 다른 애플리케이션이 서로 통신하는 데 사용되는 소프트웨어
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  }));
app.use(compression());
app.use(cors());



// 정적 경로 설정
app.use("/api/static", express.static("public"));
app.use("/api/files", express.static("files"));


// 라우터 prefix 설정
app.use("/api",indexRouter);


// 404 에러 처리
app.use((req,res,next)=> {
    next(createError(404));
})


// 에러핸들러 : 모든에러를 여기서 처리한다
app.use((err,req,res,next)=>{
    console.log(err);

    res.status(err.status || 500).json(err);
})

module.exports = app;