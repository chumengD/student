import { useState } from "react";
import { useStates } from "../hooks/State";
import { Select } from 'antd';
import "./select.css"


export function ColorSelect(){
    const [color,setColor] =useState<string>('grey');
    const {setStudent,student} =useStates();
    return (
   <Select
  className="antSelect"
   defaultValue={"grey"}
   value={color}
   onChange={(value)=>{
    setColor(value);
    setStudent({
        ...student,
        color: value
   })
}}
  
   options={[
    {value:'grey',label:(<div className="Ball" id="grey"></div>)},
    {value:'red',label:(<div className="Ball" id="red"></div>)},
    {value:'green',label:(<div className="Ball" id="green"></div>)},
    {value:'blue',label:(<div className="Ball" id="blue"></div>)},
   ]}
   />
    );

}