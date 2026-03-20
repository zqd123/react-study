import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Game from './components/Game';

function App() {
  const [count, setCount] = useState(1);  
  function handleClick(){
    setCount(count + 1);
  }
  
  return (
    <div className='section'>
      <img src={reactLogo}></img>
      <br/>
      <h1>欢迎来到我的react应用</h1>
      <MyButton count={count} onClick={handleClick}></MyButton>
      <h2>井字棋游戏</h2>
      <div className="board-center">
      <Game/>
      </div>
    </div>
  )
}


function MyButton({count,onClick}){
  return (
    <button onClick={onClick}>按钮{count}</button>
  )
}

export default App
