import { useState } from 'react'
import './App.css'
import { useStates } from './hooks/State'
import { Login } from './pages/login';
import { Home } from './pages/home';
import { Detail } from './pages/detail';

function App() {
  const {setPage,isLogin,page} =useStates();

  return (<>
  <div className='container'>
    {isLogin?
    page===0? <Home />:
    page===1? <Detail />:
    <>未知错误</>
    :
    <Login/>
    }
  </div>
  
  </>);
    
}

export default App
