import "./styles/chageText.css";
import { type test ,type new_student} from "../interface";
import { useState ,useEffect} from "react";
import { FormDisabledDemo } from "../components/inupt";
import { MyTable } from "../components/table";
import { useStates } from "../hooks/State";

import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
} from 'antd';


const { RangePicker } = DatePicker;


export function CreateText(){
    const {test,setTest,setPage} =useStates();

    const handlestuNumberChange =(newNum) =>{
    const currentStu = [...test.students];
    const oldNum =currentStu.length;

    if(newNum>oldNum){
      const extra = Array.from({length:newNum-oldNum}).map((_,i)=>({
        name:`学生 ${oldNum+i+1}`,
        id:25050907+oldNum+i,
        scores: Array(test.course).fill(0),
      }))
      const newStu = [...test.students,...extra];
      setTest({ ...test, stuNumber: newNum, students: newStu })
    }else{
      const newStu =currentStu.slice(0,newNum)
      setTest({ ...test, stuNumber: newNum, students: newStu })
    }


  }

  const handleFinish =async (value) =>{
    //TODO
    const result = await window.submitTest(test);
    if (result['code'] ===200){
      message.success("创建成功！",5);
      setPage(0)
    }else{
      message.error("创建失败！请重新尝试",3);
    }
    
  }  

    return (<div className="testContainer">
        <div className="create">创建考试</div>
        <div className="returnArrow"><img  className="return" style={{width:"100px",}} src='/returnArrow.png' 
        onClick={()=>{setPage(0)}}/></div>

    {/* <div className='testForm'> */}
      <Form
        
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 14 }}
        onFinish={handleFinish}
        layout="horizontal"
        style={{ width: '90%', maxWidth: '1200px',margin: "0 auto" }}
      >

        <Form.Item label="考试名称">
          <Input
        type="text"
        id="testName"
        name="testName"
        value={test.testName}
        onChange={(e)=>{setTest({
        ...test,
        testName: e.currentTarget.value
      })}
        }
        placeholder="请输入考试名称"
        required
      />
        </Form.Item>

        <Form.Item label="考试日期">
          <RangePicker />
        </Form.Item>

        <Form.Item label="科目数">
          <InputNumber
          changeOnWheel={true}
          max={10}
          min={1}
            value={test.course}
            onChange={(value) =>
            setTest({
                ...test,
                course: value || 0
            })
            }
        />
        </Form.Item>

        {/*科目相关信息*/}
        {Array.from({length:test.course}).map(( _,index)=>(
            <Form.Item key={index} label={`科目 ${index+1}`}>
                    <Input
                value={test.courseName[index] || ""}
                onChange={(e) => {
                    const newCourses = [...test.courseName];
                    newCourses[index] = e.target.value;

                    setTest({
                    ...test,
                    courseName: newCourses
                    });
                }}
                />
            </Form.Item>
        ))}

    <Form.Item label="考生人数">
          <InputNumber
            changeOnWheel={true}
            max={50}
            min={1}
            value={test.stuNumber}
            onChange={(value) => {
            handlestuNumberChange(value)
            }}
          />
    </Form.Item>

    <MyTable/>

          

        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'center' ,marginTop:'5px'}} >
          <Button

          type="primary" htmlType="submit" className="createTestBut">创建考试</Button>
        </Form.Item>
      </Form>
    {/* </div> */}
        

    </div>)
}