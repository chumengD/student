import "./styles/home.css"
import {SearchBox} from "../components/search";
import { Note } from "../components/textarea";

export function Home(){
    return (<div className="homeContainer">
        <div className="homeBGContainer">
            <img className="homeBG" src="bg.png"/>
        </div>

        <div className="searchContainer">
            <div className="searchBar"><SearchBox /></div>
        </div>

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

    </div>);
}