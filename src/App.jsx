import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const products = [
    { title: '卷心菜', isFruit: false, id: 1 },
  { title: '大蒜', isFruit: false, id: 2 },
  { title: '苹果', isFruit: true, id: 3 },
  ];
  const listItems = products.map(product =>
    <li key={product.id}>
      {product.title}
    </li>
  );

  
  return (
    <div className='section'>
      <img src={reactLogo}></img>
      <br/>
      <h1>欢迎来到我的react应用</h1>
      <MyButton></MyButton>
      <br/>
      <MyButton></MyButton>
      <ul className='list'>
        {listItems}
      </ul>
    </div>
  )
}

function MyButton(){
  const [count, setCount] = useState(0);
  function handleClick(){
    setCount(count + 1);
  }
  return (
    <button onClick={handleClick}>按钮{count}</button>
  )
}

export default App
