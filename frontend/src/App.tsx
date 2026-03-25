import { useState } from 'react'
import './App.css'
import { useStates } from './hooks/State'
import { Login } from './pages/login';
import { Home } from './pages/home';

function App() {
  const {setPage,isLogin,page} =useStates();

  return (<>
  <div className='container'>
    {isLogin?
    page===0? <Home />:
    <>未知错误</>
    :
    <Login/>
    }
  </div>
  
  </>);
    
}

export default App
