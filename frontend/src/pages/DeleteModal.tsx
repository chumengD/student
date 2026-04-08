import { useStates } from "../hooks/State";
import "./styles/del.css"
import { Button ,message,Popconfirm} from "antd";

export function DeleteModal(){
    const {setIsDelete,testList,setTestList} =useStates();

    const getTestList = async ()=>{
        const data =await window.getTestList();
        console.log(data);
        if(data["code"]==200){
                setTestList(data["data"]);
                //message.success("获取考试信息成功！",5);
        }else{
            message.error("获取考试信息失败！",10);
        }
        }
    
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setIsDelete(false)
        }
    };

    const handleDelete =(index)=>{
        const a = async ()=>{
            const testName = testList[index].testName;
            const res = await window.deleteTest(testName);
            await getTestList();
            console.log(res);
            if (res["code"]==200){
                message.success("删除成功！",5);
            }else{
                message.error("删除失败",3);
            }
        }
        a();
        
    };

    return(
    <div className="overlay" onClick={handleOverlayClick}>
        <div className="modal">
             <div className="del_test">删除考试</div>
        <ul className="del_ul">
        {testList.map((test,index)=>{
            return <li key={index}>
            {index+1}. {test.testName}  
            <Popconfirm
                title="确定删除？"
                okText="确定"
                cancelText="不删"
                onConfirm={() => handleDelete(index)}>
                   <Button type="primary" danger className="del_button">删除</Button>
            </Popconfirm>
            </li>
        })
        } 
        </ul>    
    </div>
</div>)
}