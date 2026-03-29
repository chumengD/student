import { useState ,useEffect} from 'react'
import './App.css'
import { useStates } from './hooks/State'
import { Login } from './pages/login';
import { Home } from './pages/home';
import { SearchResult } from './pages/searchResult';
import { message } from 'antd';



function App() {
  const {setPage,isLogin,page,isDelete,student} =useStates();
  

  //调用删除学生函数
  useEffect(  ()=>{
    const handleDelete = async () => {
    if (isDelete) {
      const data = await window.deleteStu(student);
      
      if (data.code === 200) {
        message.success(mes.mes, 5);
      } else {
        message.error("删除失败！", 5);
      }
    }
  };
  handleDelete();
  },[isDelete])

  return (<>
  <div className='container'>
    {isLogin?
    page===0? <Home />:
    page===1? <SearchResult />:
    <>未知错误</>
    :
    <Login/>
    }
  </div>
  


  </>);
    
}

export default App
