// Deps
import React, { useState, useEffect, useRef, createRef } from 'react'
import { useTranslation } from 'react-i18next' 
import './header.css'

// Components
import LangSelector from "./LangSelector"
import streamHubLogo from "./StreamHub_Logo.png"
import Search from "./Search"
import AddEventModal from "./AddEventModal"


function Header(props){

    const [showAddEvent, setShowAddEvent] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    
    const { t } = useTranslation()

    const handleLogoClick = () => {
        window.location.reload()
    }

    const handleShowAddEvent = () => {
        setShowAddEvent(true)
    }

    const handleHideAddEvent = () => {
        setShowAddEvent(false)
    }

    return (
        <div className="header-container">

            <img 
                className="header-logo" 
                src={streamHubLogo} 
                alt="StreamHub Logo"  
                onClick={handleLogoClick}
            />

            <Search 
                setSearchFilter={props.setSearchFilter}
                searchFilter={props.searchFilter}
            />
            <div className="right-header-container">
                <LangSelector 
                    language={props.language} 
                    changeLanguage={props.changeLanguage}
                />

                <button 
                    className="header-add-event-button" 
                    onClick={handleShowAddEvent}>
                    + {t("Add Event")}
                </button>
            </div>
            
            {showAddEvent ? <AddEventModal handleHideAddEvent={handleHideAddEvent}/> : null}
            
        </div>
    )
}

export default Header;


/* GRAVEYARD
    // import
    import AddFeedItem from './add-feed-item'
    import SocialLoginDialog from './Social-login-dialog'
    import Button from '@material-ui/core/Button'
    import TextField from '@material-ui/core/TextField'
    import Autocomplete from '@material-ui/lab/Autocomplete'
    //import

    // function header
    const [isAddFeedOpen, setAddFeedOpen] = useState(false)
    const [isLoginDialogOpen, setLoginDialogOpen] = useState(false)
    
    let  defaultProps = {
        options: props.autoComleteFeed,
        getOptionLabel: (option) => option.itemTitle,
    }

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        //setAddFeedOpen(false);
        //setLoginDialogOpen(false);
    }
 
    const doLogout = () => {
    }
    const onAutoCompleteChange = (event, values) => {
        props.search()
    }

    const  openLoginDialog = () => {
        console.log('openLoginDialog')
        setLoginDialogOpen(true);
    }

    const childSocialLoginRef = createRef()

    const handleLoginDialogClose = () => {
        setLoginDialogOpen(false)
        setAddFeedOpen(false)
    }
    // function header

    // return
        {/* <div className="right-header-container">
                    
                    <div className="header-add-event">
                        <Button variant="contained" onClick={()=>{console.log('setAddFeedOpen');setAddFeedOpen(true)}} type="button">{t("Add Event")}</Button>
                    </div>
                    {true /*!getSocialUser()* / &&
                        <div className="header-login">
                            <Button variant="contained" onClick={()=>{console.log('setAddFeedOpen');setLoginDialogOpen(true)}} type="button">{t("Login")}</Button>
                        </div>
                    }
                    {false/*getSocialUser()* / &&
                        <div  className="header-logout">
                            <Button style={{marginTop:30,marginLeft:"auto"}} variant="outlined" onClick={()=>{console.log('setAddFeedOpen');  childSocialLoginRef.current.doLogout()}} type="button">Logout</Button>
                        </div>
                    }
                    {/* <div className="add-feed-item-container">
                        //{<Drawer ref={myRef} anchor={'right'} open={isAddFeedOpen} onClose={toggleDrawer( false)}>}
                        <AddFeedItem openLoginDialog={openLoginDialog} openAddFeedDialog={isAddFeedOpen}  handleAddFeedClose={()=>setAddFeedOpen(false)}></AddFeedItem>
                    </div> * /}
                    <SocialLoginDialog  open={isLoginDialogOpen} onClose={handleLoginDialogClose}  ref={childSocialLoginRef}/> 
                </div> * /} 
    // return

    */
