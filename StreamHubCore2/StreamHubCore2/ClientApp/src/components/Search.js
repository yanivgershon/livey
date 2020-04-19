import React from 'react'
import "./search.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'


function Search(props){
    
    const { t } = useTranslation()
   
    const handleChange = event => {
        props.setSearchFilter(event.target.value);
    };

    return(
        <div className="header-search-container">
            <input
            className="header-search"
            type="text"
            placeholder={t("Search")}
            value={props.searchFilter}
            onChange={handleChange}
            />
            
             <FontAwesomeIcon className={t("lang")==="he" ? "header-search-icon-rtl" : "header-search-icon"} icon={faSearch} size="1x"/>
        </div>
    )
}

export default Search
