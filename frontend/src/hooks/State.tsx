import { useState, createContext, useContext, type ReactNode } from "react";

// 把所有状态逻辑放在这里，方便 TS 推断
function useStatesSource() {
  const [page, setPage] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  // 在这里新增状态，不需要去别的地方改 interface
  const [user, setUser] = useState("Guest"); 

  return {
    page,
    setPage,
    isLogin,
    setIsLogin,
    user,
    setUser
  };
}

// 2. 自动提取类型
// 这里的 T 就是上面函数返回的所有对象的集合类型
type StatesContextType = ReturnType<typeof useStatesSource>;

// 3. 创建 Context (初始值设为 null)
const Context = createContext<StatesContextType | null>(null);

export function StatesProvider({ children }: { children: ReactNode }) {
  // 使用上面定义的逻辑
  const value = useStatesSource();
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

// 4. 导出使用
export function useStates() {
  const context = useContext(Context);
  if (!context) throw new Error("useStates must be used within StatesProvider");
  return context;
}