import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../utils/requests";



export default function SignUp(){

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    // 제출 처리
    async function handleSubmit(e) {
        try{
            e.preventDefault();

            const newUser = {email , fullName , username , password};

            // 클라이언트에서 입력데이터 유효성 검사하기
            const _error = {};
            
            // 이메일 간단하게 검사 ( formik 이라는 사이트에서 좀 더 자세하게 검사할수있는 api가 나와있다 )
            if(email.indexOf("@") === -1){
                _error.email = "이메일이 올바르지 않습니다";
            }

            if(username.match( /[^a-z0-9_]/ )){
                _error.username= "아이디는 영어 소문자와 언더스코어, 숫자만 사용 가능합니다"
            }

            // 유효성 검사에 실패 (에러가 하나라도 있을경우...)
            if(Object.keys(_error).length > 0){
                throw _error;
            }


            // 유효성 검사 통과했을 경우 가입 요청
            await createUser(newUser);

            alert("가입 성공");

            // 로그인 페이지로 이동
            navigate("/");


        }catch(error){
            setError(error)
        }
    }

    // 타이틀 업데이트
    useEffect(()=>{
        document.title = "회원가입 - Instagram";
    },[]);


    return (
        <form onSubmit={handleSubmit} className="max-w-xs mx-auto p-4 mt-16">
          <div className="mt-4 mb-4 flex justify-center">
            <img src="/images/logo.png" className="w-36" />
          </div>
    
        {/* 이메일입력란 */}
          <div className="mb-2">
            <label className="block">
              <input
                type="text"
                name="email"
                className="border px-2 py-1 rounded w-full"
                onChange={({ target }) => setEmail(target.value)}
                placeholder="이메일"
              />
            </label>
            {error && <p className="text-red-500">{error.email}</p>}
          </div>
        {/* 이름입력란 */}
          <div className="mb-2">
            <label className="block">
              <input
                type="text"
                name="fullName"
                className="border rounded px-2 py-1 w-full"
                onChange={({ target }) => setFullName(target.value)}
                placeholder="이름"
              />
            </label>
          </div>

            {/* 유저이름 */}
            <div className="mb-2">
                <label className="block">
                    <input 
                        type="text"
                        name="username"
                        className="border px-2 py-1 rounded w-full"
                        onChange={({target})=> setUsername(target.value)}
                        placeholder="아이디" />
                </label>
                {error && <p className="text-red-500">{error.username}</p>}
            </div>

            {/* 비밀번호 */}
            <div className="mb-2">
                <label className="block">
                    <input 
                        type="password"
                        name="password"
                        className="border rounded px-2 py-1 w-full"
                        onChange={({target})=> setPassword(target.value)}
                        placeholder="비밀번호"
                        autoComplete="new-password" />
                </label>
            </div>

            {/* 제출버튼 */}
            <div className="mb-2">
                <button
                    tpye="submit"
                    className="bg-blue-500 rounded-lg text-sm font-semibold px-4 py-2 text-white w-full disabled:opacity-[0.5]"
                    disabled={email.trim().length < 5 || username.trim().length < 5 || password.trim().length < 5} >
                        가입
                </button>
                {error && <p className="text-red-500 text-center my-4">{error.message}</p>}
            </div>

            {/* 로그인링크 */}
            <p className="text-center mt-4">
                계정이 있으신가요 ? {" "}
                <Link to="/accounts/login" className="text-blue-500 font-semibold">
                    로그인
                </Link>
            </p>

        </form>
    )

}