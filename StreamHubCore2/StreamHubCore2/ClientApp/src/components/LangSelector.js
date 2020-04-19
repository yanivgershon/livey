import React, { useState, useEffect } from 'react'
import "./lang-selector.css"

function LangSelector(props){

    const [showMenu, setShowMenu] = useState(false)
    const [currentLanguage, setCurrentLanguage] = useState(false)

    useEffect(() => {
        if(props.language === "en"){
            setCurrentLanguage("English")
        } else if(props.language === "he"){
            setCurrentLanguage("Hebrew")
        }
    })

    useEffect(() => {
        if(showMenu){
            document.addEventListener('click', handleCloseMenu)
        }
    })

    const handleShowMenu = () => {
        setShowMenu(true)
    }

    const handleCloseMenu = () => {
        setShowMenu(false)
        document.removeEventListener('click', handleCloseMenu)
    }

    const handleLangChange = (lang) => {
        props.changeLanguage(lang)
        setShowMenu(false)
        document.removeEventListener('click', handleCloseMenu)
    }

    return(
        <div className="lang-dropdown">
            <div>
                <button 
                className="lang-dropdown-button" 
                onClick={handleShowMenu}>
                    {currentLanguage}
                </button>
                {showMenu ? 
                <div className="lang-dropdown-menu">
                    {currentLanguage === "Hebrew" ? 
                    <button className="lang-dropdown-menu-button" onClick={() => handleLangChange("en")}>English</button> 
                    : null}
                    {currentLanguage === "English" ? 
                    <button className="lang-dropdown-menu-button" onClick={() => handleLangChange("he")}>עברית</button> 
                    : null}
                </div> : null}
            </div>
        </div>
    )
}

export default LangSelector