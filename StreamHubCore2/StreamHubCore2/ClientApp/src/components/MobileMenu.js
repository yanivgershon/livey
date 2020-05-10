import React, { useState, useEffect } from "react"
import "./mobile-menu.css"
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import LangSelector from "./LangSelector"
import streamHubLogo from "../StreamHub_Logo.png"
import { Link } from "react-router-dom"



function LoginModal(props){

    const [fireErrors, setFireErrors] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false)
    const [isLoginSuccess, setIsLoginSuccess] = useState(false)



    const { t } = useTranslation()

    const handleClose = (event) => {
        if(event.target === event.currentTarget) 
        props.handleHideMobileMenu()
    }

    return(
        <div className="mobile-menu" onClick={handleClose}>
            <div className="mobile-menu-container">
                <form className="mobile-menu-container-window">
                    <div className="mobile-menu-close-button" onClick={props.handleHideMobileMenu}>
                        <FontAwesomeIcon icon={faTimes} size="1x"/>
                    </div>
                    <img 
                        className="header-logo" 
                        src={streamHubLogo} 
                        alt="StreamHub Logo"  
                    />
                    <div className="mobile-menu-container-window-buttons">
                        <LangSelector 
                        language={props.language} 
                        changeLanguage={props.changeLanguage}
                        />
                        <div style={{position: "relative"}}>
                            <button 
                            type="button"
                            className="header-add-event-button" 
                            onClick={props.handleShowAddEvent}>
                            + {t("Add Event")}
                            </button>
                            {props.showMustLogin ? <div className="add-event-dropdown-alert">
                                            <FontAwesomeIcon icon={faInfoCircle} size="1x"/>
                                            <p>{t("Login Required!")}</p>
                                            </div> : null}
                        </div>
                    </div>
                    <div className="mobile-menu-terms-link">
                        <Link className="terms-link" to="/terms-of-service" style={{fontSize:"10pt"}}>StreamHub terms of service</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginModal