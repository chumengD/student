import "./styles/home.css"
import {SearchBox} from "../components/search";
import { Note } from "../components/textarea";
import { useStates } from "../hooks/State";
import { DetailModal } from "./detail";
import { ChangeModal } from "./changeDetali";
import { useEffect, useState } from "react";
import {readSelfNote} from "../hooks/selfNote.js"
 
export function Home(){
    const {setIsDetail,isDetail,setPage,isChange}= useStates();
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

        // 3. 立即执行
        fetchData();
    }, []); 


    return (<>
    <div className="homeContainer">
        <div className="homeBGContainer">
            <img className="homeBG" src="bg.png"/>
        </div>

        {/* <div className="searchContainer">
            <div className="searchBar"><SearchBox /></div>
        </div> */}

        {/* <button  style={{position:"absolute"}} onClick={()=>setIsDetail(true) }>你好</button> */}

        <div className="mainLayout">
        <div className="recentContainer">
                <div className="recent">
                    <div>全部考试</div>
                    <ul></ul>
                </div>
        </div>

        <div className="textareaContainer">
           <Note text={note} setText={setNote}/>
        </div>

        <div className="functionContainer">
            <div className="functions">
                <div className="function">功能区</div>
                <ul>
                    <li>添加考试</li>
                </ul>
            </div>
        </div>
        
        </div>
        
    </div>
    
    {/* {isDetail && <DetailModal/>}
    {isChange && <ChangeModal/>} */}
    

    </>);
}