import "./App.css";
import {useState , useEffect , useRef } from "react";


const FILTER_MAP = {
  All : () => true,
  Done : (task) => task.completed,
  Active: (task) => !task.completed
}


// Object.keys(객체) : 객체의 속성 이름을 문자열 배열로 리턴한다
const FILTER_NAMES = Object.keys(FILTER_MAP);

console.log(FILTER_NAMES);


// 로컬 스토리지를 동기화 하는 함수
function saveDoc(tasks){
  localStorage.setItem("tasks",tasks);
}

// tasks변수의 초기값
const initialTasks = localStorage.getItem("tasks") || "[]"; // 앞의 값이 없으면 || 뒤에 값 실행


// 메인 컴포넌트
export default function App(){

  const[tasks,setTasks] = useState(JSON.parse(initialTasks)); //parse -> JSON 배열을 자바스크립트 객체로
  const[filter,setFilter] = useState("All");

  console.log(tasks);

  // 할일을 추가하는 함수
  function addTask(name){
    const newTask ={
      id: `todo-${Date.now()}`,
      name,
      completed:false
    }

    const updatedTasks = [...tasks,newTask];
    setTasks(updatedTasks);

    // 로컬스토리지 동기화
    // updatedTasks 는 현재 자바스크립트 객체
    // 자바스크립 객체는 로컬스토리지에 저장 불가능하기때문에
    // JSON 객체로 변환해준 뒤 저장시킨다
    saveDoc(JSON.stringify(updatedTasks));

    
  }




  // 할일을 삭제하는 함수
  function deleteTask(id){
    console.log(id);
    //전달받은 id 와 일치하지 않는 id를 가진 task만 리턴한다
    const remainingTasks = tasks.filter(task=>task.id !== id);

    console.log(remainingTasks);

    setTasks(remainingTasks);
    saveDoc(JSON.stringify(remainingTasks));
  }





  // 할일의 완료상태를 다루는 함수
  function toggleTaskCompleted(id){
   

    const updatedTasks = tasks.map(task=>{

     if (task.id === id ){
      return {...task, completed:!task.completed}
     }

      return task;
    })

  setTasks(updatedTasks);
  saveDoc(JSON.stringify(updatedTasks));

  }




  // 할일을 수정하는 함수
  function editTask(){}






  const filterButtons = FILTER_NAMES.map(name => (
    <FilterButton
      key={name} //프롭스
      name={name}
      isPressed={filter == name}
      setFilter={setFilter}

      />
  ))




  // 할일 목록
  const tsakList = tasks.map(task =>(
    // 컴포넌트
    <Todo
      key={task.id}
      id={task.id}
      name={task.name}
      completed={task.completed}
      deleteTask={deleteTask}
      toggleTaskCompleted={toggleTaskCompleted}
      editTask={editTask}
      />
  ))

  return (
    <div className="app-container">

      {/* 제목 */}
      <h1 className="app-title">할일목록 &#128526; &#127928;</h1>

      {/* 폼 */}
      <Form addTask={addTask} />

      {/* 필터버튼 */}
      <div className="filter-btn-group">
        {filterButtons}
      </div>

      {/* 할일목록 */}
      <h2 className="remaining">{tsakList.length} 개 남았습니다</h2>
      <ul>
        {tsakList}
      </ul>

    </div>
  )
}










// 폼 컴포넌트
function Form({addTask}){
  const[name,setName] = useState("");

  function handleSubmit(e){
    e.preventDefault();

   addTask(name);

   //폼 제출후에 input 내용을 지운다
   setName("");
  }

  return(

    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="add-input"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        autoComplete="off"
        />

      <button
        type="submit"
        className="add-btn"
        disabled={!name.trim()}
        >
        추가
        </button>
    </form>

  )
}


// 필터 버튼
function FilterButton({name,isPressed,setFilter}){
  return(
    <button
      className="filter-btn">
        {name}
    </button>
  )
}


// Todo 컴포넌트
function Todo({id,name,completed,deleteTask,toggleTaskCompleted,editTask}){

  //템플릿 상태를 결정하는 변수
  //true 가 되면 편집 form이 보이게 할 것
  const [isEditing,setIsEditing] = useState(false);

  //새로운 할일 이름
  const [newName,setNewName] = useState("");


  // 업데이트 폼 제출
  function handleSubmit(){}


  const viewTemplate = (
    <div className="view-template">
      {/* 할일이름 */}
      <div className="todo-details">
        <input
          type="checkbox"
          id={id}
          className="todo-checkbox"
          checked={completed}
          onChange={()=> toggleTaskCompleted(id)} />

      <label htmlFor={id} className="todo-name">
        {name}
      </label>
      </div>

      {/* 버튼그룹 */}

      <div className = "view-btn-group">
          <button
          className="edit-btn"
          onClick={()=> setIsEditing(true)}>
            수정
          </button>

          <button
          className="delete-btn" onClick={()=> deleteTask(id)}>
            삭제
          </button>
      </div>

    </div>
  );

    const editingTemplate = (
      <p>
        이름을 수정하세요
      </p>
    )


  return(
    <li className="todo-item">
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  )

}