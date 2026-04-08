import { useStates } from "../hooks/State";
import "./styles/del.css"
import { Button ,message,Popconfirm} from "antd";

export function DeleteModal(){
    const {setIsDelete,testList} =useStates();
    
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setIsDelete(false)
        }
    };

    const handleDelete =(index)=>{
        const res = window.deleteTest(index);
        if (res["code"]==200){
            message.success("删除成功！",5);
        }else{
            message.error("删除失败",3);
        }
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