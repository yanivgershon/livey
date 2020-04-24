import React, { useState, useEffect } from "react"
import "./login-modal.css"
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons"
import * as firebase from "firebase/app";
import "firebase/auth"
import fire from "../fire"; //required!

function LoginModal(props){

    const [fireErrors, setFireErrors] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false)
    const [isLoginSuccess, setIsLoginSuccess] = useState(false)



    const { t } = useTranslation()

    const handleClose = (event) => {
        if(event.target === event.currentTarget) 
        props.handleHideLogin()
    }

    const handleCloseSuccess = () => {
        setIsLoginSuccess(true)
        setTimeout(() => {
            setIsLoginSuccess(false)
            setIsLoginLoading(false)
            props.handleHideLogin()
        }, 1000)
    }

    const handleLoginFacebook = () => {            
        const provider = new firebase.auth.FacebookAuthProvider;     

        setIsLoginLoading(true)
        firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => { 
        firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
            console.log(result)
            props.setIsLoggedIn(true)
            handleCloseSuccess()
        })
        .catch(e => setFireErrors(e.message))//.then(console.log("AuthErros:",fireErrors)) 
        })    
    }

    const handleLoginTwitter = () => {            
        const provider = new firebase.auth.TwitterAuthProvider();     

        setIsLoginLoading(true)
        firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => { 
        firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
            console.log(result)
            props.setIsLoggedIn(true)
            handleCloseSuccess()
        })
        .catch(e => setFireErrors(e.message))//.then(console.log("AuthErros:",fireErrors))
        }) 
    }

    const handleLoginGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();     

        setIsLoginLoading(true)
        firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => { 
        firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
            var isNewUser = result.additionalUserInfo.isNewUser
            console.log("isNewUser:",isNewUser)
            console.log("photoURL:",firebase.auth().currentUser.photoURL)
            if(isNewUser){
                firebase.auth().currentUser.updateProfile({photoURL: ""})
            }
            console.log(result)
            props.setIsLoggedIn(true)
            handleCloseSuccess()
        })
        .catch(e => setFireErrors(e.message))//.then(console.log("AuthErros:",fireErrors))  
        })
    }
    
    return(
        <div className="modal-container-login" name="mainmodal" onClick={handleClose}>
            <div className="modal-container-window-parent-login">
                <form className="modal-container-window-login">
                    <div className="modal-close-button-login" onClick={props.handleHideLogin}>
                        <FontAwesomeIcon icon={faTimes} size="1x"/>
                    </div>
                  {!isLoginLoading ? <div className="modal-form-container-login">
                        <button 
                        type="button"
                        name="facebook" 
                        className="Social-login-button-facebook"
                        onClick={handleLoginFacebook}
                        >
                            <FontAwesomeIcon icon={faFacebookF} size="lg"/>
                            <span style={{paddingRight:40}}>Login with Facebook</span>
                        </button>
                        <button 
                        type="button"
                        name="twitter" 
                        className="Social-login-button-twitter"
                        onClick={handleLoginTwitter}
                        >
                            <FontAwesomeIcon icon={faTwitter} size="lg"/>
                            <span style={{paddingRight:40}}>Login with Twitter</span>
                        </button>
                        <button 
                        type="button"
                        name="google" 
                        className="Social-login-button-google"
                        onClick={handleLoginGoogle}
                        >
                            <FontAwesomeIcon icon={faGoogle} size="lg"/>
                            <span style={{paddingRight:40}}>Login with Google</span>
                        </button>
                    </div>
                    : 
                    <div className="modal-form-container-login">
                        {isLoginSuccess ? 
                        <div>
                            <h2>Login Succesful!</h2>
                            <FontAwesomeIcon icon={faCheck} size="2x"/>
                        </div>
                        :<div className="modal-login-loader"></div>}
                    </div>}
                </form>
            </div>
        </div>
    )
}

export default LoginModal