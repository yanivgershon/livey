import React, { useState, useEffect } from 'react'
import "./lang-selector.css"
import { useTranslation } from 'react-i18next'

function LangSelector(props){

    const [showMenu, setShowMenu] = useState(false)
    const [currentLanguage, setCurrentLanguage] = useState(false)

    const { t } = useTranslation()

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
                type="button" 
                className="lang-dropdown-button" 
                onClick={handleShowMenu}>
                    {t("language")}
                </button>
                {showMenu ? 
                <div className="lang-dropdown-menu">
                    <button 
                    type="button" 
                    className="lang-dropdown-menu-button" 
                    onClick={() => handleLangChange(t("lang") === "en" ? "he" : "en")}>
                    {t("lang") === "en" ? "עברית" : "English"}
                    </button>
{/* 
                    {currentLanguage === "Hebrew" ? 
                    <button type="button" className="lang-dropdown-menu-button" onClick={() => handleLangChange("en")}>English</button> 
                    : null}
                    {currentLanguage === "English" ? 
                    <button type="button" className="lang-dropdown-menu-button" onClick={() => handleLangChange("he")}>עברית</button> 
                    : null} */}
                </div> : null}
            </div>
        </div>
    )
}

export default LangSelector