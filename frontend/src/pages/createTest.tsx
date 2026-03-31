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
} from 'antd';


const { RangePicker } = DatePicker;


export function CreateText(){
    const {test,setTest} =useStates();

    

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

    {/* <div className='testForm'> */}
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ width: '90%', maxWidth: '1200px' }}
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
          defaultValue={1}
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
            defaultValue={1}
            value={test.stuNumber}
            onChange={(value) => {
              const num = value || 0;
              // 使用 Array.from 建立 new_student 类型的初始数组
              const initialStudents: new_student[] = Array.from({ length: num }, (_, i) => ({
                id: i + 25050907,        // 默认生成一个 ID
                name: `学生 ${i+1}`,
                scores: [],
              }));

              setTest({
                ...test,
                stuNumber: num,
                students: initialStudents // 同步更新学生数组
              });
            }}
          />
    </Form.Item>

    <MyTable len={test.stuNumber} courseNum={test.course}  courseName={test.courseName}/>

          

        <Form.Item >
          <Button >创建</Button>
        </Form.Item>
      </Form>
    {/* </div> */}
        

    </div>)
}