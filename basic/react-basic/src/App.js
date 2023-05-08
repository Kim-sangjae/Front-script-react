import { createContext,useContext , useState, useEffect} from 'react';
import{BrowserRouter as Router, Routes, Route, Link, Outlet, useParams}
from 'react-router-dom';




function App() {
  return <Snippet />;
 
}

export default App;


/*

리액트 튜토리얼

1. 리액트 기초
2. 리액트와 ES6(자바스크립트 문법)
3. JSX
4. 컴포넌트
5. 이벤트
6. 화면 업데이트
7. 데이터 요청


할일 목록 만들기


*/



/*
 1. 리액트 기초

 1) 리액트란
  UI 개발용 자바스크립트 라이브러리
  페이스북이 개발
  가장 인기있는 프론트앤드 프레임워크


 2) 리액트 특징
  - 컴포넌트 기반
  컴포넌트는 복잡한 UI를 설계하기 위해 사용하는 독립적이고 재사용 가능한 부품이다

  - 선언적 문법
  사용하기 쉽다


 3) 구조
 SPA(Single Page Application) 구조이다
 자바스크립트를 사용하여 화면을 업데이트 한다.


*/




/*
 2. 리액트와 ES6

 구조분해 할당
 스프레드 연산자
 let , const
 Array.map
 기타 등등
 

*/

// Array.map
// 배열의 가각의 아이템에 특정한 작업을 수행한다
// 업데이트된 배열을 리턴한다

// const numbers = [1,2,3];
// const result = numbers.map((item,index) => {
//   return item * 10; //작업수행부분

// })

// console.log(numbers);
// console.log(result);


// const beers = ["Guinness","Heineken","Budwiser"];

// const result = beers.map((beer)=>{
//   return beer.toUpperCase();
// });

// console.log(beers);
// console.log(result);


//////////////////////////////////////////////////////////////////
/*
  JSX(JavaScript Extension)
  자바스크립트의 확장 문법
  가상의 엘리먼트를 만들기 위해 사용한다

  선언적 문법
  일반 자바스크립트 객체로 변환된다.


  1. JSX 기초
  2. JSX Fragment
  3. JSX에서 변수 출력하기
  4. 조건부 렌더링
  5. JSX에서 리스트 출력하기


*/

// function Snippet(){
//   return(
//     <form>
//       <h1>Google</h1>
//       <input
//         type="search"
//         className="class1 class2" //JSX 에서는 class가아니고 className
//         style={{padding: "0.5rem", width:"20rem"}}
//         placeholder="구글검색"
//         autoComplete="off"
//         />
//     </form>
//   )

// }



// function Snippet(){
//   //JSX 에서는 트리가 하나의 동일한 엘리먼트로 감싸져야한다

//   // <></> 
//   // Fragment 가상의 태그 , 
//   // 여러태그를 쓸때는 하나의 태그로 감싸주어야하는데
//   // 그러한 불필요한 태그를 제거하기위해 빈 가상의 태그를 사용할 수 있다
  
//   return (
//     <> 
//       <h1>JSX Fragment</h1>
//       <ul>
//         <li>list item</li>
//         <li>list item</li>
//         <li>list item</li>
//         <li>list item</li>
//       </ul>
//     </>    
//   )
// }





// JSX에서 변수 출력하기
// function Snippet(){

//   let cat = {
//     name : "치즈",
//     age : 2,
//     home : null,
//     sound : function(){
//       return "야옹"
//     }
//   }


//   return(
//     <ul>
//       <li>이름 : {cat.name}</li>
//       <li>나이 : {cat.age}</li>
//       <li>집 : {cat.home}</li>
//       <li>소리 : {cat.sound()}</li>
//     </ul>
//   )

// }




// 조건부 랜더링

// function Snippet(){
//   return(
//     <>
//       <h1>조건부 렌더링</h1>

//       <hr/>

//       <h3>&& (논리연산자 AND)</h3>
//       <p>
//         expr1 && expr2<br/>
//         expr1이 참으로 간주되면 expr2를 렌더링한다
//       </p>
//       <p>{true && " 나는 보입니다 "}</p>
//       <p>{null && " 나는 안보입니다 "}</p>

//       <hr/>

//     <h3>|| (논리연산자 OR)</h3>
//     <p>
//       expr1 || expr2 <br/>
//       표현식 1이 참으로 간주되면 표현식 1을 렌더링한다 <br/>
//       표현식 1이 거짓으로 간주되면 표현식2를 렌더링한다
//     </p>
//     <p>{"나는 보입니다1" || "나는 안보입니다"}</p>
//     <p>{null || "나는 보입니다2"}</p>

//     <hr/>

//     <h3>? (삼항연산자)</h3>
//     <p>
//       조건 ? 표현식1 : 표현식2 <br/>
//       조건이 참이면 표현식1을 렌더링 한다 <br/>
//       조건이 거짓이면 표현식2를 렌더링 한다
//     </p>
//     <p>{true ? "조건이 참입니다" : "조건이 거짓입니다"}</p>
//     <p>{false ? "조건이 참입니다" : "조건이 거짓입니다"}</p>

//     </>
//   )
// }





// // 리스트 출력하기
// function Snippet(){

//   const beers=[
//     {name:"기네스", origin:"아일랜드"},
//     {name:"하이네켄", origin:"네덜란드"},
//     {name:"버드와이저", origin:"미국"}
//   ]

//   const beerList = beers.map((beer,index)=>( // () 엘리먼트를 리턴
//     // key는 고유한 값이어야 한다
//     <li key={index}> {beer.name}, {beer.origin} </li>
//   )); 

//     return(
//       <>
//         <h3>세계맥주</h3>
//         <ul>
//           {beerList}
//         </ul>
//       </>


//     )

// }


// Q1 JSX 문제

// function Snippet(){
//   const beers=[
//     {name:"기네스",origin:"아일랜드",availavle:false},
//     {name:"하이네켄",origin:"네덜란드",availavle:true},
//     {name:"버드와이저",origin:"미국",availavle:true}
//   ]

//   const beerList = beers.map((beer,index)=>(
     
//       <tr key={index}> 
//       <td>{beer.name}</td> 
//       <td>{beer.origin}</td> 
//       <td>{beer.availavle ? "예" : "아니오"} </td>
//       </tr>
//     )); 


//     return (
//       <table border="1">
//         <tr>
//           <th>이름</th>
//           <th>원산지</th>
//           <th>판매중</th>
//         </tr>

//           {beerList}
      
//       </table>
//     )


// }






/*
  컴포넌트(Component)

  1. 컴포넌트 합성
  2. props
  3. children props
  4. useContext Hook

 */




// function Content(){
//   return(
//     <>
//     <h2>고양이는 액체일까?</h2>

//     {/* video */}
    
//     <img 
//     src="http://ntx.wiki/data/file/homour/thumb-3553719312_LzPdU7lv_6e16808da4eb8dc99d1f3e3d4858f23c21fc6d59_600x600.jpg"
//     alt=""
//     width="100%"/>
    
//     </>
//   )
// }



// function Comments(){
//   return(
//     <ul>
//       <li>냥냥펀치!</li>
//       <li>냥냥펀치!</li>
//       <li>냥냥펀치!</li>
//     </ul>
//   )
// }



// function Suggested(){
//   return(
//     <ul>
//       <li>냥냥펀치!</li>
//       <li>냥냥펀치!</li>
//       <li>냥냥펀치!</li>
//     </ul>
//   )
// }



// function Snippet(){
//   return(
//     <>
//       <header>
//           <h1>YOUTUBE</h1>
//       </header>

//       <main>
//         <Content/>

//         <h2>댓글</h2>
//         <Comments/>
//       </main>

//       <aside>
//         <h2>추천영상</h2>
//         <Suggested/>
//       </aside>
//     </>
//   )
// }



// /*
//   2. props
//   컴포넌트에 전달되는 데이터
// */

// function Snippet(){

//   // 지역변수
//   const irishBeer = {
//     name : "기네스",
//     origin : "아일랜드",
//     available : false
//   }


//   return(

//     <>
//       <h1>맥주</h1>
//       <Beer beer={irishBeer}/>
//     </>
//   )

// }


// function Beer({beer}){
//  return(
//   <ul>
//     <li>이름 : {beer.name}</li>
//     <li>원산지 : {beer.origin}</li>
//     <li>판매중 : {beer.available ? "예" : "아니오"}</li>
//   </ul>
//  )

// }





//Q,. 다음의 데이터를 사용해서 유튜브 페이지를 완성해 보세요
// 영상 , 댓글 , 추천비디오 컴포넌트를 만들고 합성

// function Snippet(){
//   //DATA 라는 객체의 각각의 속성값으로 담겨있다
//   const DATA = {
//     video:{
//       id:"v0",
//       title:"고양이는 액체일까",
//       source:"http://ntx.wiki/data/file/homour/thumb-3553719312_LzPdU7lv_6e16808da4eb8dc99d1f3e3d4858f23c21fc6d59_600x600.jpg"
//     },

//     comments:[
//       {id:"c0",content:"1빠"},
//       {id:"c1",content:"2빠"},
//       {id:"c2",content:"3빠"}
//     ],

//     suggestedCideos:[
//       {id:'s0', title:"냥냥펀치1"},
//       {id:'s1', title:"냥냥펀치2"},
//       {id:'s2', title:"냥냥펀치3"},
//     ]
//   }



//   return(
//   <>
//   <h2>YOUTUBE</h2>
  

//   <Video v={DATA.video}/>
//   <Comments c ={DATA.comments}/>
//   <Suggest s={DATA.suggestedCideos} />

//   </>

//   )
// }






// function Video({v}){





//   return(
//     <>
//     <h2>{v.title}</h2>
//     <img src={v.source}></img>
//     </>
//   )
  
// }


// function Comments({c}){

// console.log(c);
// return(

//   <>
//   <h2>댓글</h2>
//     <ul>
//       <li>{c[0].content}</li>
//       <li>{c[1].content}</li>
//       <li>{c[2].content}</li>
//     </ul>
//   </>

// )
  
// }




// function Suggest({s}){


// const sList = s.map((ss)=>(

// <ul key={ss.id}>
//   <li>{ss.title}</li>
// </ul>

// ))



//   return(
//     <>
//     <h2>추천비디오</h2>

//       {sList}

//     </>
//   )
// }






// /*

//   children props
//   컴포넌트를 트리구조로 작성할 수 있다.

// */


// function Layout({children}){

// return(
//   <>
//     <h1>Instagram</h1>
//     <nav>
//       <ul>
//         <li>Home</li>
//         <li>Posts</li>
//         <li>Profile</li>
//       </ul>
//     </nav>


//     <main style={{padding:"2rem 0"}}>

//       {children}

//     </main>

//     <footer>
//       <small>2023 &copy; Instagtam</small>
//     </footer>
//   </>
// )

// }



// function Article(){

//   return(
//     <>
//       <img
//         src="https://i.ytimg.com/vi/6CLpdVI8P8g/hqdefault.jpg"
//         alt=""
//         width="100%"
//         />

//         <p>
//           <b>볶음 bab </b>
//           냠냠냠냠냠냠냠냠👍😁
//         </p>

//         <small>1일 전</small>
//     </>

//   )


// }



// function Snippet(){
//   return(
    
//     <Layout>
//       <Article/>
//     </Layout>

//   )
// }




///////////////////

/*

  4.useContext Hook
  children 컴포넌트에 데이터를 전달 할 수 있다.
  children 은 정해져있는 단어이다 바꿀 수 없다

  임포트해야한다
  import { createContext,useContext } from 'react';

*/


// const AuthContext = createContext();


// //유저데이터를 관리하는 컴포넌트
// function AuthProvider({children}){

//   // 유저데이터
//   const value = { username:'bunny'}


//   return (              //value 는 고정
//     <AuthContext.Provider value={value}>  
//       {children}
//     </AuthContext.Provider>
//   ); //하위 children에서는 모두 접근이 가능하다
// }





// function Layout({children}){

//   const auth = useContext(AuthContext);

//   console.log(auth);



//   return(
//     <>
//       <h1>Instagram</h1>
//       <nav>
//         <ul>
//           <li>Home</li>
//           <li>Posts</li>
//           <li>Profile</li>
//         </ul>
//       </nav>

//       <p>안녕하세요 {auth.username} <b>님</b></p>
  
//       <main style={{padding:"2rem 0"}}>
  
//         {children}
  
//       </main>
  
//       <footer>
//         <small>2023 &copy; Instagtam</small>
//       </footer>
//     </>
//   )
  
//   }
  
  
  
//   function Article(){

//     const auth = useContext(AuthContext);
  
//     return(
//       <>
//         <img
//           src="https://i.ytimg.com/vi/6CLpdVI8P8g/hqdefault.jpg"
//           alt=""
//           width="100%"
//           />
  
//           <p>
//             <b>볶음 bab </b>
//             냠냠냠냠냠냠냠냠👍😁
//           </p>
  
//           <small>1일 전</small>
//       </>
  
//     )
  
  
//   }
  
  
  
//   function Snippet(){
//     return(

//       <AuthProvider>
      
//       <Layout>
//         <Article/>
//       </Layout>

//       </AuthProvider>
  
//     )
//   }








// // 이벤트
// function Snippet(){

//   function handleClick(){

//     alert('lol');

//   }
//   // onClickEvent

//   return(
//     <>

//     <h2>이벤트처리</h2>
//     <button onClick={handleClick}>
//       Button
//     </button>
//     </>
//   )
// }








/*
화면 업데이트

1. useState Hook
상단에 useState 임포트 해야함

2. 리액트 라우터

*/


/*
 userState Hook

 const[state,setState] = useState(initialValue)

 state : 컴포넌트 내의 변수
 setState(newState) : state를 업데이트하는 메서드
 initialValue : state의 초기값

 */


// function Snippet(){
//   const[count,setCount] = useState(0);

//   return(
//     <>
//       <p>count: {count}</p>
//       <button onClick={()=>setCount(count+1)}>
//         Add
//       </button>
//     </>
//   )
// }


////////////////////////////////////////////////


// function Snippet(){


// const[changed,setChange] = useState(false);
    


//  return(
//   <>
//     <h1>Subscribe button</h1>

//     <button onClick={()=> setChange(!changed)}>
//       {changed ? "구독" : "구독하기" }
//     </button>

//   </>

//  )

// }




// // 리액트 라우터(기본)

// //메인 컴포넌트
// function Snippet(){
//   return(
//     <Router>
//       <nav>
//         <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/about">About</Link>
//         </li>
//         <li>
//           <Link to="/Posts">Posts</Link>
//         </li>
//         </ul>
//       </nav>



//       {/* 매핑과 객체 */}
//       <Routes>
//         <Route path="/" element={<Home/>} />
//         <Route path="/about" element={<About/>} />
//         <Route path="/posts" element={<Posts/>} />
//         <Route path="post/:postId" element={<Post/>} />
//         <Route path="*" element={<NotFound/>} />
//       </Routes>


//     </Router>
//   )
// }

// //홈
// function Home(){
//   return <h1>Home</h1>
// }

// // About
// function Posts(){
//   return(
//     <>
//       <h1>Posts</h1>
//       <ul>
//         <li>
//           <Link to="/post/p0">Post 1</Link>
//         </li>
//         <li>
//           <Link to="/post/p1">Post 2</Link>
//         </li>
//       </ul>
//     </>
//   )
// }

// // 게시물 목록
// function Post(){
//   //useParams : url의 매개변수에 접근할 수 있다
//   //url의 param값 접근
//   const{postId} = useParams();

//   return(
//     <>
//       <h1>Title</h1>
//       <p>{postId}</p>
//     </>
//   )
// }

// // 게시물 상세보기
// function About(){
//   return <h1>About</h1>
// }

// // 404 페이지
// function NotFound(){
//   return <h1>404 Not Found</h1>
// }








// // 메인 컴포넌트
// function Snippet(){
//   return(
//     <Router>

//       <AuthProvider>
//         <nav>
//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//             <Link to="/posts">Posts</Link>
//             </li>
//           </ul>
//         </nav>


//     <AuthStatus/>
    

//     <Routes>

//       <Route path="/" element={<Home/>}/>
//       <Route path="/posts" element={<Posts/>}/>

//       <Route path="/post/:postId" element={
        
//         <AuthRequired>
//           <Post/>
//         </AuthRequired>

//         } />

//       <Route path="*" element={<NotFound/>}/>

//     </Routes>

//       </AuthProvider>

//     </Router>
//   )
// }




// // AuthContext
// const AuthContext = createContext();




// // 유저데이터 관리
// // !!! 상위 컴포넌트의 state가 업데이트 되면
// //     하위 컴포넌트 들은 차례로 다시 렌더링 된다 !!!
// function AuthProvider({children}){

//   const[user,setUser] = useState(null);

//   const value = {user, setUser};


//   return(
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   )
// }


// // 로그인 상태 확인
// function AuthStatus(){

//   const{user,setUser} = useContext(AuthContext);
//   console.log(setUser)


//   return user ? (
//     <p>
//       안녕하세요 {user} 님! {" "}
//       <button onClick={()=> setUser(null)}>
//         로그아웃
//       </button>
//     </p>
//   ):(
//     <p>로그인하세요</p>
//   );

// }


// // 인증 관리
// function AuthRequired({children}){
//   const{user,setUser} = useContext(AuthContext);


//   // 로그인 처리
//   function handleSubmit(e){
//     e.preventDefault(); //페이지 새로고침 방지

//     const formData = new FormData(e.target);


//     //AJAX ( 서버 요청 )


//     // user 업데이트
//     setUser(formData.get("username"));

//   }


//   if(!user){
//     //로그인화면
//     return (

//       <form onSubmit={handleSubmit}>
//         <h1>로그인</h1>
//         <input type="text" name ="username" required />
//         <button type="submit">로그인</button>
//       </form>

//     )
//   }
  


//   // if조건문을 통과하면 자식 태그로 넘어간다
//   return children;
// }




// // 홈
// function Home(){
//   return <h1>Home</h1>
// }

// //게시물 목록
// function Posts(){
//   return(
//     <>
//       <h1>Posts</h1>
//       <ul>
//         <li>
//           <Link to="/post/p0">Post 1</Link>
//         </li>
//         <li>
//           <Link to="/post/p1">Post 2</Link>
//         </li>
//       </ul>
//     </>
//   )
// }

// //게시물 상세보기
// function Post(){
//   const {postId} = useParams();

//   return(
//     <>
//       <h1>Post</h1>
//       <p>{postId}</p>
//     </>
//   )
// }

// //404 페이지
// function NotFound(){
//   return <h1>404 NotFound</h1>
// }





/*
  데이터 가져오기(fetch data)

  1. useEffect Hook
  2. 데이터 가져오기 예시
*/

/*
  useEffect
  리액트 앱에서 여러가지 효과를 적용할 때 사용한다

  useEffect(effect): 컴포넌트가 렌더링 될 때마다 effect를 실행한다
  useEffect(effect,[]) : 최초 렌더링 시에만 effect가 실행된다
  useEffect(effect,[dep1,dep2, ...]) : 최초 렌더링 시에 effect가 실행된다.
  dependency가 바뀔 때 effect 가 실행된다

*/


// function Snippet(){

//   const [count,setCount] = useState(0);

//   useEffect(()=>{
//     console.log('rendered at', new Date().toLocaleTimeString());

//   },[]);

//   return (
//     <>
//       <h1>useEffect</h1>
//       <p>{count}</p>
//       <button onClick={()=> setCount(count + 1)}>
//         ADD
//       </button>
//     </>

//   )
// }




// 데이터를 서버에 요청하는 함수
function fetchData(){
  const DATA = {
    username: "안녕토끼",
    image:"https://item.kakaocdn.net/do/22123a4d3901f1c18f93ba6c3626fe3e8f324a0b9c48f77dbce3a43bd11ce785",
    bio: "하이하이"
  }


  // 데이터를 가져오는데 2초가 걸린다고 가정

  const promise = new Promise((res,rej)=>{

    setTimeout(()=>{
      res(DATA)
    },2000)

  })

  return promise;


}



function Snippet(){
  const[error,setError] = useState(null);
  const[isLoaded,setIsLoaded] = useState(false);
  const[profile,setProfile] = useState(null);

  useEffect(()=>{
    // 여기서 서버에 요청

    fetchData()
    .then(data => {
      setProfile(data)
    }) // 응답을 성공했을때 메서드
    .catch(error => {
      setError(error)
    }) // 응답을 실패했을때 메서드
    .finally(()=>{
      setIsLoaded(true)
    })
  },[])

  if(error) {
    return <p>fetching profile....</p>
  }
  if(!isLoaded){
    return <p>feching profile...</p>
  }

  return (
    <>
    <h1 align="center">Profile</h1>
      <div align="center" >
    <img 
      src={profile.image}
      alt={profile.username}
      style={{
        width: '300px',
        height: '300px',
        objectFit:'cover',
        borderRadius: '40%',
        
      }}  />
      </div>
      <h3 align="center">{profile.username}</h3>
      <p align="center">{profile.bio}</p>
    
    </>
  )
}