// 비동기 작업( Asynchronous operations)

// 블록킹을 방지하기 위해 사용된다
//  예) 서버에 데이터 요청 등

// 1. 동기작업
// 2. 비동기작업

// 1. 동기작업 
// 호출된 순서대로 코드가 실행된다

// function f(){
//     console.log('작업1')
// }

// f();
// console.log('작업2')


// 2.비동기 작업( Asynchronous operations)
 
// 빠른것 부터 처리된다

// 서버에 데이터를 요청하고 받는데 1초가 걸린다고가정
// function fetchData(callback){

    // var data = {foo: 'bar'};
    
    // setTimeout(callback,ms ) : ms 뒤에 callback을 시행한다
    // setTimeout(function () {
    //     callback(null,data);
    // } ,1000)


// fetchData(function(error,data){
//     if(error){
//         return console.log(error);
//     }

//     console.log('서버에서 받은 데이터: ' , data);
// })

// console.log('다음작업');


// // 프로미스

// 비동기 작업의 성공 실패 여부와 그 결과를 나타내는 객체
// 비동이 작업의 가독성을 향상시키기 위해 사용된다

// 1. 프로미스 객체의 구조
// 2. 실제예시
// 3. async/await


// 1. 프로미스 객체의 구조
// - 프로미스 인스턴스 생성
// 생성자 함수에 두개의 매개변수를 가진 콜백을 전달한다

// 첫번째 매개변수(resolve) : 비동기 작업이 성공했을 경우 호출된다
// 두번째 매개변수(rejected) : 비동기 작업이 실패했을 경우 호출된다


// - 프로미스의 상태
// fullfilled: 작업의 성공
// rejected : 작업의 실패
// pending : 작업이 끝나기를 기다리는 상태


// - 프로미스 인스턴스의 메서드
// Promise.then() : 성공했을 경우 데이터를 다루는 메서드
// Promise.catch() : 실패했을 경우 에러를 다루는 메서드
// Promise.fonally() : 실패/성공 여부와 상관없이 실행되는 코드 메서드



// const promise = new Promise(function (res,rej){
//     res({foo:'bar'});
// })

// console.log(promise); // fullfilled

// const promise = new Promise(function(res,rej){
//     rej({ error : '..'}) //rejected
// })

// const promise = new Promise(function(res,rej){})
// console.log(promise); // pending


// const promise = new Promise(function(res,rej){
//     res({foo:'bar'})
// })



// promise
// .then(function(value){ // 데이터를 다루는 부분
//     console.log(value)
// })

// .catch(function(error){
//     console.error(error);
// })



// 실제 사용 예시 :
// 서버에 데이터 요청


// 서버에 데이터를 요청하는 함수
// 결과를 프로미스 객체로 리턴한다
// function fetchData(){
//     const promise = new Promise(function(res,rej){
//         res({foo:'bar'});
//     })

//     return promise;
// }

// fetchData()
// .then((data)=> {
//     console.log('서버에서 받은 데이터:' , data);
// })
// .catch((error)=>{
//     console.error(error);
// })

 
// console.log('다음작업')


/*
3.async / await

프로미스가 결과값을 반환할 때까지 기다린다
프로미스의 가독성을 향상시키기 위한 문법

try / catch 에서 에러를 처리한다
*/


// function fetchData(){
// const promise = new Promise((res,rej) => {
//     res({ foo : 'bar'});
// })    
// return promise;
// }

// f();
// console.log('다음작업')

// async function f(){
// try{

//     //...

// const data = await fetchData();

// console.log('서버에서 받은 데이터',data);



// }catch (error){
//     console.error(error)
// }


// }




/*
ES6 문법 (2015)

새로운 문법이 많이 나온 버전

let,const
화살표 함수
구조분해 할당
스프레드 연산자
클래스
프로미스
심볼
Array.map()

*/


/*
구조분해할당 - 배열

간단한 문법으 사용하여 배열의 아이템을변수에 할당할 수 있다
*/

// var beers = ["기네스","하이네켄","버드와이저"];

// var irishBeer = beers[0];
// var dutchBeer = beers[1];
// var americanBeer = beers[2];

// console.log(irishBeer);





// var beers = ["기네스","하이네켄","버드와이저"];

// // 구조분해할당
// // 인덱스를 사용하지 않는다 (필요가없다)

// var[irishBeer, dutchBeer,americanBeer] = beers;

// console.log(irishBeer);



/////////////

/*
구조분해할당 - 객체
간단한 문법으로 객체의 속성을 변수에 할당할 수 있다.
*/


// 기존 방식
// var irishBeer = { name : '기네스', origin:'아일랜드', available: false };

// var name = irishBeer.name;
// var origin = irishBeer.origin;
// var available = irishBeer.available;

// console.log(name,origin,available);

// // 구조분해할당 방식
// var irishBeer = { name : '기네스', origin:'아일랜드', available: false };

// var {name , origin , available} = irishBeer;

// console.log(name,origin,available);



/*
구조분해할당 - 매개변수
*/


//기존방식
// var irishBeer = { name : '기네스', origin:'아일랜드', available: false };

// function f(beer){

//     var name = beer.name;
//     var origin = beer.origin;
//     var available = beer.available;

//     console.log(name,origin,available);
// }

// f(irishBeer);


// //구조분해할당

// var irishBeer = { name : '기네스', origin:'아일랜드', available: false };

// function f ({name,origin,available}){
//     console.log(name,origin,available);
// }

// f(irishBeer);




/*
스프레드 연산자 - 배열

배열의 아이템을 간단하게 복사할 수 있다

... 복사할 배열

*/

// var beers = ['기네스','하이네켄'];
// var newBeer = '버드와이저';

// var updatedBeers = [...beers,newBeer];

// console.log(updatedBeers);




// var europeanBeers = ['기네스','하이네켄'];
// var asianBeers =['아사히','클라우드'];

// var worldBeers = [...europeanBeers, ...asianBeers];

// console.log(worldBeers);



// /*
// 스프레드 연산자 - 객체

// 객체의 속성을 간단하게 복사할 수 있다.
// ... 복사할 객체
// */

// // 기존
// var irishBeer = {
// name:'기네스',
// origin:'아일랜드',
// available:false

// }

// // 객체 요소변경
// irishBeer.available = true;

// console.log(irishBeer);




// // 스프레드방식

// var updatedBeers = {...irishBeer,available:true}; 
// // name과 origin만 복사, available 만 변경
// // 없는 요소를 적으면 추가된다

// console.log(updatedBeers);


//ES6 문제

//1. 구조분해할당

// var asianBeers = ['클라우드','아사히']
// // 구조분해할당 문법을 사용해서 각각의 맥주를 변수에 할당해보세요

// var[koreanBeer,japaneseBeer] = asianBeers;

// console.log(koreanBeer);
// console.log(japaneseBeer);


//2. 스프레드 연산자

// var cat = {
//     name:'치즈',
//     age:1,
//     home:null,
//     sound(){
//         return '야옹'
//     }
// }

// 스프레드 연산자를 사용해 치즈의 home을 '삼산동'으로 업데이트해보자
// 결과는 updateCat 변수에 할당



// var updateCat = {...cat,home:'삼산동'}

// console.log(updateCat,updateCat.sound());



/*
    객체와 JSON
    JSON(JavaScript Object Notation)
    자바스크립트 객체를 저장 또는 이동하기 위하여 사용되는 텍스트 포멧


    1. 객체와 JSON
    2. JSON.stringify()
    3. JSON.parse()


*/


// 1. 객체와 JSON

// var o = {foo:'bar'}

// var json = '{"foo":"bar"}' // ''Json방식 안에 ""key와 value를 지정
//                             // o 객체를 JSON포맷으로 표현


// console.log(typeof o); // object
// console.log(typeof json); // string


// 2. JSON.stringify()
// 객체를 JSON 포맷으로 변환한다

// var o = {foo:'bar'};

// var json = JSON.stringify(o);

// console.log(json); // {"foo":"bar"}
// console.log(typeof json); // string




// 3. JSON.parse()
// JSON 포맷을 객체로 변환한다

// var json = '{"foo":"bar"}';

// var o = JSON.parse(json);

// console.log(o); //{ foo: 'bar' }
// console.log(typeof o); // object











