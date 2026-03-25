import "./styles/home.css"
import {SearchBox} from "../components/search";
import { Note } from "../components/textarea";
import { useStates } from "../hooks/State";
import { DetailModal } from "./detail";

export function Home(){
    const {setIsDetail,isDetail}= useStates();
    return (<>
    <div className="homeContainer">
        <div className="homeBGContainer">
            <img className="homeBG" src="bg.png"/>
        </div>

        <div className="searchContainer">
            <div className="searchBar"><SearchBox /></div>
        </div>

        <button  style={{position:"absolute"}} onClick={()=>setIsDetail(true) }>你好</button>

        <div className="mainLayout">
        <div className="recentContainer">
                <div className="recent">
                    <div>最近查看</div>
                    <ul></ul>
                </div>
        </div>

        <div className="textareaContainer">
            <div className="textarea"><Note/></div>
        </div>

        <div className="functionContainer">
            <div className="functions"></div>
        </div>
        
        </div>
        
    </div>
    
    {isDetail && <DetailModal/>}
    </>);
}