import React from 'react';
import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { useStates } from '../hooks/State';
import { type new_student } from '../interface';


export const ShowTable: React.FC = () => {

    const {test} =useStates();
    const courseNum =test.course;
    const students =test.students;
   
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

    const courseColumns =test.courseName.map((course,i)=>({
        title:`${course}`,
        dataIndex:`score_${i}`,
        sorter:(a,b)=>  a[`score_${i}`] - b[`score_${i}`],
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
    ];


    
//     const data = students.map((student, index) => ({
//     key: index,
//     name: student.name,     
//     id: student.id,
//     average:student.average??null,
//     sum:student.sum??null,
//   }));



  return <Table columns={columns} dataSource={data}  />
};
