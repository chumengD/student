import "./styles/home.css"
import {SearchBox} from "../components/search";
import { Note } from "../components/textarea";
import { useStates } from "../hooks/State";
import { DetailModal } from "./detail";
import { ChangeModal } from "./changeDetali";
import { useEffect, useState } from "react";
import {readSelfNote} from "../hooks/selfNote.js"
import { Button } from "antd";
 
export function Home(){
    const {setPage,setTestList,testList,setTest}= useStates();
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
            const serialiseData =JSON.parse(data)
            setTestList(serialiseData)
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
            <img className="homeBG" src="bg.png"/>
        </div>

        <div className="pic1">
            <img  width={100} src="/企鹅.png"/>
        </div>

        <div className="pic2">
            <img  width={100} src="/nns.png"/>
        </div>

        <div className="icon">
            <img width={500} src="/杭电icon.png"/>
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
                    {/* <li><Button type="primary"  danger onClick={()=>{}}>删除考试</Button></li> */}
                </ul>
            </div>
        </div>
        
        </div>
        
    </div>
    
    {/* {isDetail && <DetailModal/>}
    {isChange && <ChangeModal/>} */}
    

    </>);
}