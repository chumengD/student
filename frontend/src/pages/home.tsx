import "./styles/home.css"
import { Note } from "../components/textarea";
import { useStates } from "../hooks/State";
import { DeleteModal } from "./DeleteModal.js";
import { useEffect, useState } from "react";
import {readSelfNote} from "../hooks/selfNote.js"
import { Button, message } from "antd";

import bg from "../asserts/bg.png"
import qier from "../asserts/企鹅.png"
import nns from "../asserts/nns.png"
import icon from "../asserts/杭电icon.png"





export function Home(){
    const {
        setPage,
        setTestList,
        testList,
        setTest,
        isDelete,
        setIsDelete,
    }= useStates();
    const [note,setNote] =useState<string>("");

    
   useEffect(() => {
        // 1. 定义一个内部异步函数
        const fetchData = async () => {
            try {
                const result = await readSelfNote();
                console.log(result);
                setNote(result); 
            } catch (error) {
                console.error("加载笔记失败:", error);
            }
        };

        const getTestList = async ()=>{
            const data =await window.getTestList();
            console.log(data);
            if(data["code"]==200){
                 setTestList(data["data"]);
                 //message.success("获取考试信息成功！",5);
            }else{
                message.error("获取考试信息失败！",10);
            }
            }

        getTestList();
        fetchData();
    }, []); 

    //获取全部考试
    useEffect(()=>{

  },[])


    return (<>
    <div className="homeContainer">
        <div className="homeBGContainer">
            <img className="homeBG" src={bg}/>
        </div>

        <div className="pic1">
            <img  width={100} src={qier}/>
        </div>

        <div className="pic2">
            <img  width={100} src={nns}/>
        </div>

        <div className="icon">
            <img width={500} src={icon}/>
        </div>


        {/* <div className="searchContainer">
            <div className="searchBar"><SearchBox /></div>
        </div> */}

        {/* <button  style={{position:"absolute"}} onClick={()=>setIsDetail(true) }>你好</button> */}

        <div className="mainLayout">
        <div className="recentContainer">

                    <div>全部考试</div>
                    <ul>
                        {testList.map((item,index)=>( 
                            <li key={index}><Button type="primary" onClick={()=>{
                                setPage(2)
                                setTest(testList[index])
                                }}>{item.testName}</Button></li>))}
                    </ul>
      
        </div>

        <div className="textareaContainer">
           <Note text={note} setText={setNote}/>
        </div>

        <div className="functionContainer">
            <div className="functions">
                <div className="function">功能区</div>
                <ul className="functionUl">
                    <li><Button type="primary"  onClick={()=>setPage(1)}>添加考试</Button></li>
                    <li><Button type="primary"  danger onClick={()=>{setIsDelete(true)}}>删除考试</Button></li>
                </ul>
            </div>
        </div>
        
        </div>
        
    </div>
    
    {/* {isDetail && <DetailModal/>}*/}
    {isDelete && <DeleteModal/>} 
    

    </>);
}