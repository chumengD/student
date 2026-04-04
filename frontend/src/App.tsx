import { useState ,useEffect} from 'react'
import './App.css'
import { useStates } from './hooks/State'
import { Login } from './pages/login';
import { Home } from './pages/home';
import { message } from 'antd';
import { CreateText } from './pages/createTest';
import { ShowTest } from './pages/showTest';



function App() {
  const {isLogin,page,isDelete,student,setStuList} =useStates();
  

  // //调用删除学生函数
  // useEffect(  ()=>{
  //   const handleDelete = async () => {
  //   if (isDelete) {
  //     const data = await window.deleteStu(student);
      
  //     if (data.code === 200) {
  //       message.success(mes.mes, 5);
  //     } else {
  //       message.error("删除失败！", 5);
  //     }
  //   }
  // };
  // handleDelete();
  // },[isDelete])

  useEffect(()=>{
    const getTest = async ()=>{
      const data =await window.getTest();
      const serialiseData =JSON.parse(data)
      setStuList(serialiseData)
    }
    getTest();
  },[])
  

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
