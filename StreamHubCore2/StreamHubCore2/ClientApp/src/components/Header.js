// Deps
import React, { useState, useEffect, useRef, createRef } from 'react'
import { useTranslation } from 'react-i18next'
import './header.css'

// Components
import AddFeedItem from './add-feed-item'
import SocialLoginDialog from './Social-login-dialog'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import LangSelector from "./LangSelector"
import streamHubLogo from "./StreamHub_Logo.png"


function Header(props){

    const [isAddFeedOpen, setAddFeedOpen] = useState(false)
    const [isLoginDialogOpen, setLoginDialogOpen] = useState(false)
    
    const { t } = useTranslation()

    const  openLoginDialog = () => {
        console.log('openLoginDialog')
        setLoginDialogOpen(true);
    }

    const childSocialLoginRef = createRef()

    const handleLoginDialogClose = () => {
        setLoginDialogOpen(false)
        setAddFeedOpen(false)
    }

    const handleLogoClick = () => {
        window.location.reload()
    }

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





    return (
        <div className="header-container">

            <img 
            className="header-logo" 
            src={streamHubLogo} 
            alt="StreamHub Logo"  
            onClick={handleLogoClick}/>

            <div  className="header-search">
                {true && /*autoComleteFeed.length>0*/ 
                    <Autocomplete className="app-autocomple" style={{width:300,height:60, marginTop:0}}
                    {...defaultProps}
                    id="auto-complete"
                    autoComplete
                    includeInputInList
                    renderInput={(params) => <TextField {...params} label="search" margin="normal" />}/>
                }
            </div>


            <div className="right-header-container">
                <LangSelector language={props.language} changeLanguage={props.changeLanguage}/>
                <div className="header-add-event">
                    <Button variant="contained" onClick={()=>{console.log('setAddFeedOpen');setAddFeedOpen(true)}} type="button">{t("Add Event")}</Button>
                </div>
                {true /*!getSocialUser()*/ &&
                    <div className="header-login">
                        <Button variant="contained" onClick={()=>{console.log('setAddFeedOpen');setLoginDialogOpen(true)}} type="button">{t("Login")}</Button>
                    </div>
                }
                {false/*getSocialUser()*/ &&
                    <div  className="header-logout">
                        <Button style={{marginTop:30,marginLeft:"auto"}} variant="outlined" onClick={()=>{console.log('setAddFeedOpen');  childSocialLoginRef.current.doLogout()}} type="button">Logout</Button>
                    </div>
                }
                {/* <div className="add-feed-item-container">
                    //{<Drawer ref={myRef} anchor={'right'} open={isAddFeedOpen} onClose={toggleDrawer( false)}>}
                    <AddFeedItem openLoginDialog={openLoginDialog} openAddFeedDialog={isAddFeedOpen}  handleAddFeedClose={()=>setAddFeedOpen(false)}></AddFeedItem>
                </div> */}
                <SocialLoginDialog  open={isLoginDialogOpen} onClose={handleLoginDialogClose}  ref={childSocialLoginRef}/>
            </div>
        </div>
    )
}

export default Header;
