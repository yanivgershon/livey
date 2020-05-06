// Deps
import React, { useState, useEffect } from 'react'
import "./user-profile.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import * as firebase from "firebase/app";
import "firebase/auth"
import fire from "../fire"; //required!
import { useTranslation } from 'react-i18next'


// Components
import UserProfileFeedPanel from "./UserProfileFeedPanel"

function UserProfile(props){

    const [showClearButton, setClearButton] = useState(false)

    const { t } = useTranslation()

    const handleCloseMenu = () => {
        props.handleHideProfile()
    }

    const handleSignOut = () => {
        firebase
        .auth()
        .signOut()
        .then(props.setIsLoggedIn(false))
    }

    const handleClearShow = () => {
        setClearButton(true)
    }

    const handleClearHide = () => {
        setClearButton(false)
    }

    const handleClearAll = () => {
        props.setUserData(prevState => ({...prevState, savedItems: ""}))
        firebase.auth().currentUser.updateProfile({photoURL: ""})
        handleClearHide()
    }

    const savedItemsPanel = <UserProfileFeedPanel 
                                userData={props.userData} 
                                feedItems={props.feedItems} 
                                isLoggedIn={props.isLoggedIn}
                                setUserData={props.setUserData}
                                userData={props.userData}
                            />

    return(
            <div className="user-profile-dropdown">
                <div className={t("lang") === "he" ? "user-profile-container-grid-rtl" : "user-profile-container-grid"}>
                    <div className="modal-close-button-login" onClick={handleCloseMenu}>
                        <FontAwesomeIcon icon={faTimes} size="1x"/>
                    </div>
                    <div className="user-profile-header">
                        <h2>{t("Hi")} {props.userData.displayName}</h2>
                        <h3>{t("Welcome to your personal pannel.")} <br/> {t("Here you can view all your saved items.")}</h3>
                    </div>
                    <div className="user-profile-saved-feed">
                        {props.userData.savedItems ? savedItemsPanel : <h3 className="user-profile-saved-feed-h3">{t("No Saved Events")}</h3>}
                    </div>
                    {props.userData.savedItems ? !showClearButton  
                    ?<div className="user-profile-saved-feed-clear">
                        <button type="button" className="user-profile-saved-feed-clear-button" onClick={handleClearShow}>{t("Clear All")}</button>
                    </div>
                    :<div className="user-profile-saved-feed-clear">
                        <h3>{t("Are you sure?")}</h3>
                        <div>
                            <button type="button" className="user-profile-saved-feed-clear-button-red" onClick={handleClearAll}>{t("Clear All")}</button>
                            <button type="button" className="user-profile-saved-feed-clear-button" onClick={handleClearHide}>{t("Cancel")}</button>
                        </div>
                    </div> : null}
                    <div className="user-profile-footer">
                        <button type="button" className="user-profile-logout-button" onClick={handleSignOut}>{t("Log Out")}</button>
                    </div>
                </div>
            </div>
    )
}

export default UserProfile