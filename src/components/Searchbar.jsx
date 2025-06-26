import styles from "./Searchbar.module.css";

function Searchbar({searchValue,setSearchValue}) {
    function handleSearchValue(event){
        setSearchValue(event.target.value);
    }
    return ( 
        <div id={styles.searchBarMainContainer}>
            <input type="text" placeholder="Entere usernae to search.." value={searchValue} onChange={handleSearchValue} />
            <i className="fa-solid fa-square-xmark" onClick={()=>{setSearchValue("")}}></i>
        </div>
     );
}

export default Searchbar;