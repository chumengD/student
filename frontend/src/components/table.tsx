import React, { useState, useEffect } from 'react';
import { Table, Input, InputNumber, Form} from 'antd';
import { useStates } from '../hooks/State';
import "./table.css"

export const MyTable: React.FC = () => {
  const [current, setCurrent] = useState(1); // 默认第一页
  const pageSize = 7; // 定义每页行数
  const {test,setTest} =useStates();
  const [form] = Form.useForm();


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
          
          style={{minWidth:"80px" ,maxWidth:"120px"}}/>
        </Form.Item>)
      },
    },
    {
      title: '学号',
      render: (_: any, __: any, index: number) => (
        <Form.Item name={['students', getGlobalIndex(index), 'id']} noStyle>
          <InputNumber />
        </Form.Item>
      ),
    },
    ...Array.from({ length: test.course }).map((_, sIndex) => ({
      title: test.courseName[sIndex],
      render: (_: any, __: any, index: number) => (
        <Form.Item name={['students', getGlobalIndex(index), 'scores', sIndex]} noStyle>
          <InputNumber 
          changeOnWheel={true}
          min={0} 
          max={100} />
          
        </Form.Item>
      ),
    })),
  ];

  return (
    <Form 
    
    form={form}
    onFinish={(v) => console.log(v.students)} 
    onValuesChange={(_, allValues) => {
        setTest({
          ...test,
          students: allValues.students // 将 Form 维护的完整数组传回给全局
        });
      }}>
      <Table
        
        dataSource={test.students} // 直接使用计算出来的数组
        columns={columns}
        rowKey="id"
        pagination={{
            position:['bottomRight'],
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