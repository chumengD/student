import React from 'react';
import { Table,Popconfirm } from 'antd';
import type { TableColumnsType, TableProps,} from 'antd';
import { useStates } from '../hooks/State';
import { useState } from 'react';
import "./styles/showTest.css"

export const ShowTest: React.FC = () => {

    const {test,setPage,setTest} =useStates();
    
    const courseNum =test.course;
    const students =test.students;
   
    //转变学生数据
    const data = students.map((student, i) => {
        const scoreMap: any = {};

        student.scores.forEach((score, index) => {
            scoreMap[`score_${index}`] = score;
        });

        return {
            key: i,
            ...student,
            ...scoreMap,
        };
      }
    )

    //还原学生数据
    const revertData = (_data, courseNum) => {
        return _data.map((item) => {
            const scores = [];

            for (let i = 0; i < courseNum; i++) {
                scores.push(item[`score_${i}`]);
            }

            return {
                name: item.name,
                id: item.id,
                scores,
                average: item.average,
                sum:item.sum
                };
        });
    };

    //尝试加入编辑功能
    const [_data, set_Data] = useState(data);
    const [oldData,setOldData] =useState(data);
    const [editingKey, setEditingKey] = useState<number | ''>('');
    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        setOldData(structuredClone(_data))
        setEditingKey(record.key);
        };

    const cancel = () => {
        set_Data(oldData)
        setEditingKey('');
        };
    
    const save = (key) => {
        setEditingKey('');
        };
    
    const handleDelete = (key) => {
        const newData = _data.filter(item => item.key !== key);
        set_Data(newData);
        };
    //尝试加入编辑功能

    const courseColumns =test.courseName.map((course,i)=>({
        title:`${course}`,
        dataIndex:`score_${i}`,
        sorter:(a,b)=>  a[`score_${i}`] - b[`score_${i}`],
        render: (text, record) => {
        if (isEditing(record)) {
        return (
            <input
            style={{maxWidth:"50px"}}
            value={text}
            onChange={(e) => {
                const newData = [..._data];
                const index = newData.findIndex(item => item.key === record.key);
                newData[index][`score_${i}`] = Number(e.target.value);
                set_Data(newData);
            }}
            />
        );
        }
        return text;
    }
    }))

    const columns: TableColumnsType = [
    {
        title: '姓名',
        dataIndex: 'name',
    },
    {
        title: '学号',
        dataIndex: 'id',
        sorter: (a, b) => a.id - b.id,
    },
    ...courseColumns,
    {
        title: '平均分',
        dataIndex: 'average',
        sorter: (a, b) => a.average - b.average,
    },
    {
        title: '总分',
        dataIndex: 'sum',
        sorter: (a, b) => a.sum - b.sum,
    },
    {
  title: '操作',
  render: (_, record) => {
    const editable = isEditing(record);

    return editable ? (
      <span>
        <a onClick={() => save(record.key)}>保存</a>
        <span> </span>
        <a onClick={cancel}>取消</a>
        
      </span>
    ) : (
      <span>
      <a onClick={() => edit(record)}>编辑</a>
      <span> </span>
      <Popconfirm
        title="确定删除？"
        okText="确定"
        cancelText="不删"
        onConfirm={() => handleDelete(record.key)}
        >
        <a style={{ marginLeft: 8, color: 'red' }}>删除</a>
        </Popconfirm>
      </span>
    );
  },
}
    ];

  return (<>
   <div className='showTestName'>{test.testName}</div>
    <div className="returnArrow"><img  className="return" style={{width:"100px",}} src='/returnArrow.png' 
        onClick={()=>{
            setPage(0)
            const reData = revertData(_data,courseNum)
            setTest({
                ...test,
                students:reData
            })
            }}/></div>
  <div className='showTable'>
    <Table 
    columns={columns} 
    dataSource={_data} 
    pagination={false} />
  </div>
  </>)
};