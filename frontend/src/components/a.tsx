import React, { useRef, useState } from 'react';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

export const Sample = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  // 封装一个生成搜索列配置的函数，方便复用
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div 
        style={{ padding: 8 }} 
        onKeyDown={(e) => e.stopPropagation()} // 阻止按键事件冒泡导致表格内部快捷键冲突
      >
        <Search
          ref={searchInput}
          placeholder={`搜索 ${dataIndex}`}
          value={selectedKeys[0]}
          // 当输入框内容变化时，更新 selectedKeys
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          // 触发搜索（点击搜索图标或回车）
          onSearch={(value) => {
            confirm(); // 确认筛选条件，触发 Table 更新
            setSearchText(value);
            setSearchedColumn(dataIndex);
          }}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
          enterButton="搜索"
          allowClear
          // 点击原生的清除按钮时，重置并刷新表格
          onClear={() => {
            clearFilters();
            confirm({ closeDropdown: false });
            setSearchText('');
          }}
        />
        <Space>
          <Button
            type="link"
            size="small"
            onClick={() => {
              clearFilters();
              confirm({ closeDropdown: true });
              setSearchText('');
            }}
          >
            重置
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    // 展开面板后自动聚焦到 Search 框
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.focus(), 100);
      }
    },
    // 本地数据过滤逻辑（如果是服务端请求，请删除此配置，在 Table 的 onChange 中处理）
    onFilter: (value, record) => {
      const recordValue = record[dataIndex];
      return recordValue
        ? recordValue.toString().toLowerCase().includes(value.toLowerCase())
        : '';
    },
  });

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'), // 将自定义搜索注入该列
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('address'), // 将自定义搜索注入该列
    },
  ];

  const data = [
    { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
    { key: '2', name: 'Joe Black', age: 42, address: 'London No. 1 Lake Park' },
    { key: '3', name: 'Jim Green', age: 32, address: 'Sydney No. 1 Lake Park' },
    { key: '4', name: 'Jim Red', age: 32, address: 'London No. 2 Lake Park' },
  ];

  return <Table columns={columns} dataSource={data} />;
};

