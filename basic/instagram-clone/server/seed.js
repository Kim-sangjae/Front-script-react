// 샘플데이터 생성

const userArgs = process.argv.slice(2);
const mongoose = require("mongoose");
const User = require("./models/User");
const Article = require("./models/Article");

// 잘못된 db 주소를 전달했을 때 에러처리
if(!userArgs[0].startsWith("mongodb")){
    console.log("ERROR: You need to specify a valid mongodb URL");
    return;
}

seedDatabase();

// 샘플 데이터를 생성하는 함수
async function seedDatabase(){
    try{
        const MONGODB_URI = userArgs[0];
        await mongoose.connect(MONGODB_URI); // 데이터베이스 연결

        const users = [
            {
                username : 'cat',
                email : 'cat@example.com',
                fullName : 'Kitty',
                avatar : 'cat.jpeg',
                bio : "Meow"
            },
            {
                username : 'dog',
                email : 'dog@example.com',
                fullName : 'Mr.loyal',
                avatar : 'dog.jpeg',
                bio : "Bark"
            },
            {
                username : 'bird',
                email : 'bird@example.com',
                fullName : 'Blue and White',
                avatar : 'bird.jpeg',
                bio : ""
            }

        ]

        // 유저 객체 생성
        for(let i = 0 ; i < users.length; i++){
            const user = User(); // User의 인스턴스 생성
            user.username = users[i].username;
            user.email = users[i].email;
            user.fullName = users[i].fullName;
            user.avatar = users[i].avatar;
            user.bio = users[i].bio;


            await user.save();

            console.log(user);
        }


        // cat 유저의 게시물 생성
        for(let i = 1; i <= 4; i++){
            const user = await User.findOne({username : 'cat'});

            const article = new Article();
            article.photos = [`${i}.jpeg`];
            article.description = `cat photos ${i}`;
            article.author = user._id;    //몽고db 에 데이터를 저장하면
                                        //자동으로  _id 값이 생긴다 (데이터의 번호 라고 생각하면 됌)

            await article.save();

            console.log(article);
        }


        mongoose.connection.close(); // 데이터베이스 연결 종료



    }catch(error){
        console.log(err);
    }

};
