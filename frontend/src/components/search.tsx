import { Input, Select } from "antd";
import { useState } from "react";

const { Search } = Input;

export function SearchBox() {
  const [type, setType] = useState("id");
  const [value, setValue] = useState("");

  const selectBefore = (
    <Select
      value={type}
      onChange={(val) => setType(val)}
      style={{ width: 80 }}
      options={[
        { value: "id", label: "学号" },
        { value: "name", label: "姓名" },
      ]}
    />
  );

  const onSearch = () => {
    console.log("搜索类型:", type);
    console.log("搜索内容:", value);
  };

  return (
    <Search
      addonBefore={selectBefore}
      placeholder="请输入搜索内容"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onSearch={onSearch}
      enterButton="搜索"
    />
  );
}