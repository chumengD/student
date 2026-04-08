import { useState ,useEffect} from 'react'
import './App.css'
import { useStates } from './hooks/State'
import { Login } from './pages/login';
import { Home } from './pages/home';
import { message } from 'antd';
import { CreateText } from './pages/createTest';
import { ShowTest } from './pages/showTest';



function App() {
  const {isLogin,page} =useStates();
  
  return (<>
  <div className='container'>
    {isLogin?
    page===0? <Home />:
    page===1? <CreateText />:
    page===2? <ShowTest />:

    <>未知错误</>
    :
    <Login/>
    }
  </div>
  


  </>);
    
}

export default App
