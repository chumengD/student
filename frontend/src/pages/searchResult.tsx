import { useStates } from "../hooks/State";
import "./styles/searchResult.css"
import { SearchBox } from "../components/search";

export function SearchResult(){
    const {searchInput,setSearchInput} =useStates();
    return(
        <div className="searchResultContainer">
            <div className="searchContainer">
                <div className="searchBar"><SearchBox /></div>
            </div>


        </div>
    );
}