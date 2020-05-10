import React, { useState, useEffect } from "react"
import "./share-panel.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLink, faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { faWhatsapp, faTwitter, faFacebookF } from "@fortawesome/free-brands-svg-icons"


function SharePanel(props) {

    const [isMobile, setIsMobile] = useState(false)
    const [isCopied, setIsCopied] = useState(false)

    useEffect(() => {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
            setIsMobile(true)
        }
    }, [])

    const handleEmail = () => {
        window.location = `mailto:
        ?subject=streamHub.net - Live event shared with you
        &body=Check out this event I found using Stream-hub.net - Link to Event: %0D%0A${props.item.itemURL}`
        handleClose()
    }

    const handleFacebook = () => {
        const shareURL = `https://www.facebook.com/sharer/sharer.php?u=${props.item.itemURL}`
        window.open(shareURL, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes')
        handleClose()
    }

    const handleTwitter = () => {
        const shareURL = `https://twitter.com/share?url=${props.item.itemURL}&amp;text=${encodeURI(props.item.itemTitle)}&amp;hashtags=streamhub`
        window.open(shareURL, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes')
        handleClose()
    }

    const handleWhatsapp = () => {
        const shareURL = `whatsapp://send?text= Check out this event I found using Stream-hub.net - Link to Event: %0D%0A${props.item.itemURL}`
        window.open(shareURL, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes')
        handleClose()
    }

    const handleCopyLink = () => {
        navigator.clipboard.writeText(props.item.itemURL)
        .then(() => {
            setIsCopied(true)
        })
        setTimeout(() => {
            setIsCopied(false)
            }, 2000);
        handleClose()
    }

    const handleClose = () => {
        setTimeout(() => {
            props.closeShare()
            }, 2000);
    }

    return(
        <div className="share-panel-container">
            
            <form className="share-panel-triangle"></form>

            {/* <!-- Email --> */}
            <div onClick={handleEmail} style={{background: "rgb(216, 17, 60)"}}>
                <FontAwesomeIcon icon={faEnvelope} style={{color: "white"}} />
            </div>

            {/* <!-- Facebook --> */}
            <div onClick={handleFacebook} style={{background: "#4167b2"}}>
                <FontAwesomeIcon icon={faFacebookF} style={{color: "white"}} />
            </div>

            {/* <!-- Twitter --> */}
            <div onClick={handleTwitter} style={{background: "#1ca3f3"}}>
                <FontAwesomeIcon icon={faTwitter} style={{color: "white"}} />
            </div>
            
            {/* <!-- Whatsapp --> */}
            {isMobile ? 
            <div style={{background: "#24d364"}} onClick={handleWhatsapp}>
                <FontAwesomeIcon icon={faWhatsapp} style={{color: "white"}} />
            </div> : null}

            {/* <!-- Copy Link --> */}
            <div onClick={handleCopyLink}>
                <FontAwesomeIcon icon={faLink} style={{color: "white"}} />
            </div>
            {isCopied ? <form className="share-panel-copied-alert">Event URL Copied!</form> : null}
        </div>
    )
}

export default SharePanel