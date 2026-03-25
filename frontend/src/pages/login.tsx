import { useState} from "react";
import { useStates } from "../hooks/State";
import { message } from "antd";
import "./styles/login.css";



export function Login(){
    const [ID,setID] = useState<string>();
    const [password,setPassword] = useState<string>();
    const [role,setRole] =useState<string>("教师");
    const {setPage,setIsLogin} = useStates();
    
    function handleInput(e:React.ChangeEvent<HTMLInputElement>){
      const { name, value } = e.currentTarget;
      if (name === "digit8") { 
        setID(value);
      }
      if (name === "password") setPassword(value);
    }
    
    async function handleSubmit(e:React.SubmitEvent<HTMLFormElement>){
      e.preventDefault();

      if (ID.length!==8){
        message.error("输入的不是8位数字!",4);
      }

      const loginPayload ={
        id:ID,
        password:password,
        role:role,
      }

      // const data =await window.login(loginPayload);
      const data ={
        isSucessce:true,
      };
      console.log(data);

      if (data["isSucessce"]){
        message.success("登录成功！",4);
        setIsLogin(true);
        setPage(0);
      }
      else{
        message.error("账号或者密码错误!",3);
      }
    }


    return (<div className="LoginContainer">
      <div className="content">
    <div className="bg"><img  src="/bg.png"/></div>
        <div className="iconShow">
            <img src="/icon.png"/>
        </div>

        <form onSubmit={handleSubmit} id="input">

      <label htmlFor="digit8" className="title">杭电学生管理系统</label>
      <div className="loginInput">
      <input
        type="text"
        id="digit8"
        name="digit8"
        value={ID}
        onChange={handleInput}
        // 以下是原生校验属性，在 TSX 中需注意大小写
        pattern="\d{8}"
        maxLength={8}
        minLength={8}
        placeholder="请输入学号/教师号"
        required
      />
       <input
        type="text"
        id="password"
        name="password"
        value={password}
        onChange={handleInput}
        placeholder="请输入密码"
        required
      />
      <select
  
  id ="loginSelet"
  value={role}
  onChange={(e) => setRole(e.target.value)}
>
  <option value="student">学生</option>
  <option value="teacher">教师</option>
</select>

      <button  type="submit">提交</button>
    </div>
    </form>
    <div className="info"></div>
    </div>
    </div>)
}










