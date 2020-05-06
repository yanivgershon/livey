import React, {useEffect, useState} from "react"
import "./terms-of-service.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { useTranslation } from 'react-i18next'
import { Redirect } from "react-router-dom"


function TermsOfService() {

    const [isClosing, setIsClosing] = useState(false)
    const { t } = useTranslation()

    useEffect(() => {
        setIsClosing(false)
    }, [])

    const handleClose = (event) => {
        if(event.target === event.currentTarget) 
        setIsClosing(true)
    }

    let homePageRedirect = isClosing ? 
    (<Redirect push to="/home" />) : null

    return(
        <div className="modal-container-terms" onClick={handleClose}>
            <div className="modal-container-window-parent-terms">
                <div className="modal-container-window-terms">
                    <div className="modal-close-button-terms" onClick={() => setIsClosing(true)}>
                        <FontAwesomeIcon icon={faTimes} size="1x"/>
                    </div>
                    {homePageRedirect}        
                </div>
            </div>
        </div>
    )
}

export default TermsOfService 