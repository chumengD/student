import React, { useState, useEffect } from 'react';
import { Table, Input, InputNumber, Form, Button } from 'antd';
import { useStates } from '../hooks/State';
import "../pages/styles/chageText.css"

interface MyTableProps {
  len: number;       // 学生人数
  courseNum: number; // 科目数量
  courseName:string[];
}

interface DataType {
  name: string;    // 学生姓名
  id: number;      // 学号
  scores: number[]; // 各科成绩数组
}

export const MyTable: React.FC<MyTableProps> = () => {
  const [current, setCurrent] = useState(1); // 默认第一页
  const pageSize = 7; // 定义每页行数
  const {test,setTest} =useStates();
  const [form] = Form.useForm();

  // 1. 直接计算 originData，不再使用 useState 和 useEffect 存储它
  // 只要 len 或 scoresNum 变了，这段代码会在渲染时自然重新执行
  // const originData: DataType[] = Array.from({ length: test.stuNumber }).map((_, i) => ({
  //   name: `学生 ${i + 1}`,
  //   id: 250907 + i,
  //   scores: Array(test.course).fill(0),
  // }));

  const getGlobalIndex = (index: number) => (current - 1) * pageSize + index;

  // 2. 使用 useEffect 仅用于同步 Form 的初始值
  // 这样 Form 内部的数据结构就能和我们的表格列对应上
  useEffect(() => {
    form.setFieldsValue({ students: test.students });
  }, [test.stuNumber, test.course, form]); 

  // 3. 定义列（逻辑保持不变）
  const columns = [
    {
      title: '姓名',
      render: (_: any, __: any, index: number) => {
        const globalIndex = (current - 1) * pageSize + index;

        return (<Form.Item name={['students', globalIndex, 'name']} noStyle>
          <Input
          
          style={{minWidth:"60px" ,maxWidth:"120px"}}/>
        </Form.Item>)
      },
    },
    {
      title: '学号',
      render: (_: any, __: any, index: number) => (
        <Form.Item name={['students', index, 'id']} noStyle>
          <InputNumber />
        </Form.Item>
      ),
    },
    ...Array.from({ length: test.course }).map((_, sIndex) => ({
      title: test.courseName[sIndex],
      render: (_: any, __: any, index: number) => (
        <Form.Item name={['students', index, 'scores', sIndex]} noStyle>
          <InputNumber 
          changeOnWheel={true}
          defaultValue={0}
          min={0} 
          max={100} />
          
        </Form.Item>
      ),
    })),
  ];

  return (
    <Form form={form} onFinish={(v) => console.log(v.students)} className='Mytable'>
      <Table
        
        dataSource={test.students} // 直接使用计算出来的数组
        columns={columns}
        rowKey="id"
        pagination={{
            current:current,
            pageSize:pageSize,
            onChange: (page) => {
            setCurrent(page);    // 当用户点击分页时更新状态
            },
        }}
        
        bordered
      />
    </Form>
  );
};