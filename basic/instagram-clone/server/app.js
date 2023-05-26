//설치한 패키기 가져오기
const express = require("express");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const indexRouter = require("./routes/index");
const app = express();
const mongoose = require("mongoose");
const compression = require("compression");
const helmet = require("helmet");
require("dotenv").config();