import "./styles/detail.css"
import { useStates } from "../hooks/State";
import { useState } from "react";
import { Button ,message,Popconfirm} from "antd";

export function DetailModal(){
    const {student,setIsDetail,setStudent,setIsChange,setIsDelete} =useStates();

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // 关键：只有点击的对象是 overlay 本身时才触发关闭
        // 防止点击内部的 .modal 区域时也触发关闭
        if (e.target === e.currentTarget) {
            setIsDetail(false);
        }
    };

    return(
    <div className="overlay" onClick={handleOverlayClick}>
        <div className="modal">

            <div className="closebut" onClick={()=>{
                setIsDetail(false);
                setIsDelete(false);
                }} ><img style={{width:"40px"}} src="/close.png"/></div>

            <div className="coverContainer">
                <img  className="cover" src="/luna.png"/>
            </div>

            <div className="studentInfo">
                <ul className="UlInfo">
                    <li>姓名: {student.name}</li>
                    <li>学号: {student.id}</li>
                    <li>年级: {student.grade}</li>
                    <li>学院: {student.department}</li>
                    <li>来自: {student.from}</li>
                    <li>联系方式: {student.contact}</li>
                    <li>标识: <span className="detailColor" style={{backgroundColor:"white"}}></span></li>
                </ul>
            </div>

        <div className="detailTextareaContainer">
                        <textarea
                        className="detailTextarea"
                            value={student.note}
                            onChange={(e) => setStudent({
                                ...student,
                                note: e.target.value})}
                            placeholder="在这里写点什么..."
                            style={{
                                outline: "none",
                                resize: "none"
                            }}
                        />
        </div>

        <div className="changeButoons">
        
                <Button type="primary" className="changeBut" onClick={()=>{
                    setIsDetail(false);
                    setIsChange(true);
                }}>修改学生信息</Button>
                <Popconfirm
        title="提醒"
        description="你确定要删除吗？"
        onConfirm={()=>{
             setIsDelete(true);
             setIsChange(true);
             setIsDetail(false);
        }}
        onCancel={()=>message.error("已取消",3)}
        okText="确认"
        cancelText="取消"
      >
        <Button type="primary"  danger className="deleteBut">删除学生信息</Button>
      </Popconfirm>
               
        </div>


    </div>
</div>)
}