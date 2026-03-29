import { useStates } from "../hooks/State";
import "./styles/searchResult.css"
import {SearchBox} from "../components/search";

export function SearchResult(){
    const {searchInput,setSearchInput,setPage} =useStates();
    return(
        <div className="searchResultContainer">
             <div className="searchContainer">
                    <div className="searchBar"><SearchBox /></div>
             </div>

             <div className="resultContainer">
                <ul className="searchUl">
                    <li className="searchLi">
                        <div className="right">你好</div>
                        </li>
                </ul>

            <div onClick={()=>setPage(0)}>home</div>

             </div>

        </div>
    );
}