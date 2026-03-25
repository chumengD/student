import "./styles/detail.css"
import { useStates } from "../hooks/State";
import { useState } from "react";
import { ColorSelect } from "../components/select";

export function DetailModal(){
    const {student} =useStates();
    const [detailColor,setDetailColor] =useState<string>();
    return(
    <div className="overlay">
        <div className="modal">

            <div className="coverContainer">
                <img  className="cover" src="/luna.png"/>
            </div>

            <div className="selet">
                <ColorSelect/>
            </div>


            <div className="studentInfo">
                <ul className="UlInfo">
                    <li>姓名: {student.name}</li>
                    <li>学号: {student.id}</li>
                    <li>年级: {student.grade}</li>
                    <li>学院: {student.department}</li>
                    <li>来自: {student.from}</li>
                    <li>联系方式: {student.contact}</li>
                </ul>
            </div>

        </div>
    </div>)
}