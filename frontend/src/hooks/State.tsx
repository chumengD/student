import { useState, createContext, useContext, type ReactNode } from "react";
import { type student ,type test} from "../interface";

// const defaultStu:student ={
//     name:"樱小路露娜",
//     id:26050907,
//     appearance:"/luna.png",
//     department:"艺术学院",
//     grade:"大一",
//     from:"樱公馆",
//     contact:"暂无",
//     color:"red",
//     note:"我是露娜大人的狗",
// }

const list =[{
          testName:"期中考",
          stuNumber:2,
          course:10,
          courseName:["高数","英语","3","4","5","6","7","8","9","10"],
          students:[{
            name:"咕咕嘎嘎",
            id:111,
            scores:[12,13,3,4,5,6,7,8,9,0],
            average:12.5,
            sum:25
          },{
            name:"原神",
            id:222,
            scores:[13,14,3,4,5,6,7,8,9,0],
            average:13.5,
            sum:27
          }],
      },
      {
          testName:"期末考",
          stuNumber:2,
          course:2,
          courseName:["高数","离散数学"],
          students:[{
            name:"咕咕嘎嘎",
            id:111,
            scores:[12,13],
            average:12.5,
            sum:25
          },{
            name:"原神",
            id:222,
            scores:[13,14],
            average:13.5,
            sum:27
          }],
      }
    ];

const submitT= {
          testName:"测试",
          stuNumber:2,
          course:2,
          courseName:["cs","os"],
          students:[{
            name:"樱小路露娜",
            id:520,
            scores:[100,100],
          },{
            name:"小仓朝日",
            id:25,
            scores:[60,120],
            average:13.5,
            sum:27
          }]
        };

const showTest={
          testName:"期中考",
          stuNumber:2,
          course:2,
          courseName:["高数","英语"],
          students:[{
            name:"wwww",
            id:111,
            scores:[12,13],
            average:12.5,
            sum:25
          },{
            name:"aaa",
            id:222,
            scores:[13,14],
            average:13.5,
            sum:27
          }],
      }

// 把所有状态逻辑放在这里，方便 TS 推断
function useStatesSource() {
  const [page, setPage] = useState<number>(0);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isDetail,setIsDetail] =useState<boolean>(false);
  const [isChange,setIsChange] =useState<boolean>(false);
  const [isDelete,setIsDelete] =useState<boolean>(true);
  // const [student,setStudent] =useState<student>(defaultStu);
  const [searchInput,setSearchInput] =useState<string>("");
  const [submitTest,setSubmitTest]= useState<test>(submitT);
  const [testList,setTestList] =useState(list);
  const [test,setTest] =useState<test>(showTest);
    
  // 在这里新增状态，不需要去别的地方改 interface
  return {
    page,
    setPage,
    isLogin,
    setIsLogin,
    isDetail,
    setIsDetail,
    isChange,
    setIsChange,
    isDelete,
    setIsDelete,
    // student,
    // setStudent,
    searchInput,
    setSearchInput,
    test,
    setTest,
    testList,
    setTestList,
    submitTest,
    setSubmitTest,
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