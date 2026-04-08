import { Input, Select } from "antd";
import { useState } from "react";
import { useStates } from "../hooks/State";
import "../pages/styles/showTest.css"

const { Search } = Input;

interface props {
  onSearch:(type:string,val:string) => void
}

export function SearchBox({onSearch}:props) {
  const [type, setType] = useState("name");
  const {searchInput,setSearchInput} = useStates();

  const selectBefore = (
    <Select
      value={type}
      onChange={(val) => setType(val)}
      style={{ width: 80 }}
      options={[
        { value: "name", label: "姓名" },
        { value: "id", label: "学号" },
      ]}
    />
  );

  const handleSearch = (val) => {
    onSearch(type,val);
  };

  return (
    <Search
      className="SearchBox"
      addonBefore={selectBefore}
      placeholder="请输入搜索内容"
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      onSearch={handleSearch}
      allowClear
      enterButton="搜索"
    />
  );
}