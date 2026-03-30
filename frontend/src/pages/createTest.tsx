import "./styles/chageText.css";
import { type test ,type new_student} from "../interface";
import { useState ,useEffect} from "react";
import { FormDisabledDemo } from "../components/inupt";

import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
} from 'antd';

const { RangePicker } = DatePicker;


export function CreateText(){
    const [test,SetTest] =useState<test>({
        testName:"",
        stuNumber:0,
        course:0,
        courseName:[],
        students:[],
    });



    useEffect(()=>{

    },[test.course])


    return (<div className="testContainer">
        <div className="create">创建考试</div>
        {/* <form className="createForm">

        <input
        type="text"
        id="testName"
        name="testName"
        value={test?.testName}
        onChange={(e)=>{SetTest({
            ...test,
            testName:e.currentTarget.value,
            })}
        }
        placeholder="请输入考试名称"
        required
      />

        <input
        type="text"
        id="testName"
        name="testName"
        value={test?.testName}
        onChange={(e)=>{SetTest({
            ...test,
            testName:e.currentTarget.value,
            })}
        }
        placeholder="请输入考试名称"
        required
      />

        </form> */}

    <div className='testForm'>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >

        <Form.Item label="考试名称">
          <Input
        type="text"
        id="testName"
        name="testName"
        value={test.testName}
        onChange={(e)=>{SetTest({
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
            value={test.course}
            onChange={(value) =>
            SetTest({
                ...test,
                course: value || 0
            })
            }
        />
        </Form.Item>

        {Array.from({length:test.course}).map(( _,index)=>(
            <Form.Item key={index} label={`科目 ${index+1}`}>
                    <Input
                value={test.courseName[index] || ""}
                onChange={(e) => {
                    const newCourses = [...test.courseName];
                    newCourses[index] = e.target.value;

                    SetTest({
                    ...test,
                    courseName: newCourses
                    });
                }}
                />
            </Form.Item>
        ))}

        <Form.Item label="考生人数">
          <InputNumber
            value={test.stuNumber}
            onChange={(value) =>
            SetTest({
                ...test,
                stuNumber: value || 0
            })
            }
        />
        </Form.Item>

        {Array.from({length:test.stuNumber}).map(( _,index)=>(
            <Form.Item key={index} label={`学生姓名 ${index+1}`}>
                    <Input
                value={test.students[index].name || ""}
                onChange={(e) => {
                    const student = [...test.students[index]];
                    student.name  = e.target.value;

                    SetTest({
                    ...test,
                    students[index].name : name
                    });
                }}
                />
            </Form.Item>
        ))}    

        <Form.Item label="Button">
          <Button >创建</Button>
        </Form.Item>
      </Form>
    </div>
        

    </div>)
}