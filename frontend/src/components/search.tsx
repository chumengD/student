import { Input, Select } from "antd";
import { useState } from "react";
import { useStates } from "../hooks/State";

const { Search } = Input;

export function SearchBox() {
  const [type, setType] = useState("id");
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

  const onSearch = () => {
    console.log("搜索类型:", type);
    console.log("搜索内容:", searchInput);
  };

  return (
    <Search
      addonBefore={selectBefore}
      placeholder="请输入搜索内容"
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      onSearch={onSearch}
      enterButton="搜索"
    />
  );
}