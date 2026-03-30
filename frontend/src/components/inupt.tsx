import React, { useState,useEffect } from 'react';
import "../pages/styles/chageText.css"

import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
} from 'antd';

const { RangePicker } = DatePicker;


export const FormDisabledDemo: React.FC = () => { 
    


  return (
    <div className='testForm'>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="考试名字">
          <Input
        type="text"
        id="testName"
        name="testName"
        placeholder="请输入考试名称"
        required
      />
        </Form.Item>

        <Form.Item label="考试日期">
          <RangePicker />
        </Form.Item>

        <Form.Item label="考生人数">
          <InputNumber />
        </Form.Item>

        <Form.Item label="科目数">
          <InputNumber />
        </Form.Item>

        <Form.Item label="Button">
          <Button >Button</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

