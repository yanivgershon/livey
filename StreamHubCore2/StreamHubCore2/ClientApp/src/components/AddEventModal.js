import React, { useState, useEffect } from "react"
import "./add-event-modal.css"
import { useTranslation } from 'react-i18next'
//import { loadReCaptcha } from 'react-recaptcha-v3'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload, faPlus, faTimes, faCheck, faImage } from "@fortawesome/free-solid-svg-icons";
import moment from "moment"

function AddEventModal(props){
    
    const [state, setState] = useState({
        itemTitle:"",
        itemDuration:"",
        itemStartDateObj:"",
        itemURL:"",
        itemImgURL:"",
        itemTags:"[]",
        platformID:1,
        itemOwner:"",
    })
    const [date, setDate] = useState({
        date:"",
        startTime:"",
        endTime:"",
    })
    const [isError, setIsError] = useState(false)
    const [isErrorHighlight, setIsErrorHighlight] = useState(false)
    const [isImageLoad, setIsImageLoad] = useState(false)
    const [isImageDisplay, setIsImageDisplay] = useState(false)
    const [isImageError, setIsImageError] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    useEffect(() => {
        setState(prevState => ({ ...prevState, itemOwner: props.userData.userId }))
    },[])

    const { t } = useTranslation()

    const handleChange = (event) => {
        const {name, value} = event.target
        setState(prevState => ({ ...prevState, [name]: value, itemOwner: props.userData.userId}))
    }

    const handleDateChange = (event) => {
        const {name, value, type} = event.target

        if(type === "text" && date[name].length === 2 && value.indexOf(":") === -1){
            setDate(prevState => ({ ...prevState, [name]: `${value.slice(0, 2)}:${value.slice(2, 4)}` }))
        } else { //if(type === "text" && date[name].length === 2){
            setDate(prevState => ({ ...prevState, [name]: value }))
        }
        
        const duration = moment.duration(moment(date.endTime,"HH:mm").diff(moment(date.startTime,"HH:mm"))).asSeconds()
        const datetimeFormatted = `${date.date.concat("T",date.startTime)}`
        setState(prevState => ({ ...prevState, itemDuration: duration, itemStartDateObj: datetimeFormatted }))
        console.log("date:",date)
        console.log("duration:",duration)      
    }

    const handleDateClear = (event) => {
        const {name} = event.target
        if(event.key === "Backspace"){
            setDate(prevState => ({ ...prevState, [name]: "" }))
        }
    }

    const handleCategoryChange = (event) => {
        const {name, value} = event.target
        const categoryFormatted = `['${value.toLowerCase()}']`
        setState(prevState => ({ ...prevState, [name]: categoryFormatted }))
    }

    const handleShowImageUpload = () => {
        setIsImageLoad(true)
    }

    const imageVerification = (src, good, bad) => {
        const img = new Image();
        img.onload = good; 
        img.onerror = bad;
        img.src = src;        
    }

    const handleImageUpload = (event) => {
        const {value, name, type} = event.target
        if(type === "text") {
            setState(prevState => ({ ...prevState, itemImgURL: value }))
        } else if(name === "upload") {
            imageVerification( 
                state.itemImgURL, 
                () => {
                    setIsImageLoad(false)
                    setIsImageDisplay(true)}, 
                () => {
                    setIsImageError(true)
                    setTimeout(function(){ setIsImageError(false) }, 2500)} 
            )
        } else if(name === "cancel") {
            setIsImageLoad(false)
            setIsImageDisplay(false)
            setState(prevState => ({ ...prevState, itemImgURL: "" }))
        } else if(name === "remove") {
            setIsImageDisplay(false)
            setState(prevState => ({ ...prevState, itemImgURL: "" }))
        }
    }


    const handleClose = (event) => {
        if(event.target === event.currentTarget) 
        props.handleHideAddEvent()
    }

    const handleSubmit = (event) => {
        console.log("item owner:",state.itemOwner)
        event.preventDefault()
        if(state.itemTitle && 
           state.itemDuration && 
           state.itemStartDateObj && 
           state.itemURL && 
           state.itemTags != "[]"){
               
            console.log("All Items Complete! Submitting...")
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json")

            var raw = JSON.stringify(state)

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            }
        
            fetch(`${window.baseUrl}items/`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error))
            .then(setIsSubmitted(true))
            .then(
                setTimeout(() => {
                    setIsSubmitted(false)
                    props.handleHideAddEvent()
                    }, 2000))
        } else {
            setIsError(true)
            setIsErrorHighlight(true)
            setTimeout(function(){ setIsErrorHighlight(false) }, 500);
        }
    }
    
    return(
        <div className="modal-container" name="mainmodal" onClick={handleClose}>
            <div className="modal-container-window-parent">
{!isSubmitted ? <form className="modal-container-window">
                    <div className={t("lang") === "he" ? "modal-close-button-rtl" : "modal-close-button"} onClick={props.handleHideAddEvent}>
                        <FontAwesomeIcon icon={faTimes} size="1x"/>
                    </div>
                     <div className="modal-form-container">
                        <div className="modal-form-img">
                            <button className={t("lang") === "he" ? "modal-form-img-button-rtl" : "modal-form-img-button"} type="button" onClick={handleShowImageUpload}>{t("Choose Photo")}<br/><br/>
                            <FontAwesomeIcon className="modal-form-img-button-icon" icon={faImage} size="2x"/>
                            </button>
                            {isImageLoad ? <div className="modal-form-img-popup">
                                <div className="modal-form-img-input-cont">
                                    <div className="modal-form-img-input-cont-inner">
                                        <input type="text" placeholder="www.photo-url.com/image.jpg" onChange={handleImageUpload} />
                                        <button type="button" name="upload" className="modal-form-img-input-cont-button-upload" onClick={handleImageUpload}>{t("Choose")}</button>
                                        <button type="button" name="cancel" className="modal-form-img-input-cont-button-cancel" onClick={handleImageUpload}>{t("Cancel")}</button>
                                    </div>
                                    {isImageError ? <h4 style={{color:"red", fontWeight: "200"} }>{t("Invalid URL. Please enter a valid image url and retry.")}</h4> : null}
                                </div>
                            </div> : null}
                        </div>  
                        {isImageDisplay ? <img className={t("lang") === "he" ? "temp-img-rtl" :"temp-img"} alt="" src={state.itemImgURL}/> : null }
                        {isImageDisplay ? <button type="button" name="remove" className="modal-form-img-button-remove" onClick={handleImageUpload}>{t("Remove")}</button> : null }
                        <div className="modal-form">
                            <div className="modal-form-inputs">
                                <h3><span>* </span>{t("Tell us about your event")}</h3>
                                <textarea 
                                placeholder={t("Short description of your event...")} 
                                maxLength="90"
                                name="itemTitle"
                                value={state.itemTitle}
                                onChange={handleChange}
                                />
                                <p className={t("lang") === "he" ? "modal-form-inputs-p-rtl" : "modal-form-inputs-p"}>{state.itemTitle.length}/90</p>
                            </div>
                            <div className="modal-form-inputs">
                                <h3><span>* </span>{t("When is it?")}</h3>
                                <div className="modal-form-datetime" >
                                    <label>
                                        {t("Event Date")}<input 
                                        type="date" 
                                        name="date" 
                                        onKeyDown={handleDateClear}
                                        onChange={handleDateChange}  
                                        value={date.date}
                                    />
                                    </label>
                                    <label>
                                        {t("Start Time")}<input 
                                        type="text" 
                                        maxLength="5"
                                        pattern="[0-9].{1,}:[0-9].{1,}" 
                                        title="12:34"
                                        name="startTime" 
                                        placeHolder="12:30" 
                                        className="modal-form-datetime-time" 
                                        onKeyDown={handleDateClear}
                                        onChange={handleDateChange}
                                        onBlur={handleDateChange}
                                        value={date.startTime}
                                    />
                                    </label>
                                    <label>
                                    {t("End Time")}<input 
                                        type="text" 
                                        maxLength="5"
                                        pattern="[0-9].{1,}:[0-9].{1,}" 
                                        title="12:34"
                                        name="endTime" 
                                        placeHolder="13:45" 
                                        className="modal-form-datetime-time" 
                                        onKeyDown={handleDateClear}
                                        onChange={handleDateChange}
                                        onBlur={handleDateChange}
                                        value={date.endTime}
                                    />
                                    </label>
                                </div>
                            </div>

                            <div className="modal-form-inputs">
                                <h3><span>* </span>{t("Enter your event's URL")}</h3>
                                <input 
                                    name="itemURL" 
                                    type="text" 
                                    placeholder="www.amazing-event.com/live-video-url"
                                    onChange={handleChange}
                                    value={state.itemURL}
                                />
                            </div>
                            <div className="modal-form-categories">
                                <h3><span>* </span>{t("Choose Category")}</h3>
                                <div className="modal-form-categories-radio">
                                    <label className="modal-form-categories-radio-design">{t("Kids")}
                                        <input type="radio" 
                                            name="itemTags" 
                                            value="kids"
                                            onChange={handleCategoryChange}/>
                                        <span className="radio-checkmark"></span>
                                    </label>
                                    <label className="modal-form-categories-radio-design">{t("Lectures")}
                                        <input type="radio" 
                                            name="itemTags" 
                                            value="lectures"
                                            onChange={handleCategoryChange}/>
                                        <span className="radio-checkmark"></span>
                                    </label>
                                    <label className="modal-form-categories-radio-design">{t("Fitness")}
                                        <input type="radio" 
                                            name="itemTags" 
                                            value="fitness"
                                            onChange={handleCategoryChange}/> 
                                        <span className="radio-checkmark"></span>
                                    </label>
                                    <label className="modal-form-categories-radio-design">{t("Fun")}
                                        <input type="radio" 
                                            name="itemTags" 
                                            value="fun"
                                            onChange={handleCategoryChange}/> 
                                        <span className="radio-checkmark"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div> 
                    {isError ? <h4 style={{color:"red", fontWeight: isErrorHighlight ? "900" : "200"} }>{t("You must complete the form before submitting!")}</h4> : null}
                    <button className="modal-submit-button" type="submit" onClick={handleSubmit}>
                        <FontAwesomeIcon className={t("lang") === "he" ? "modal-submit-button-icon-rtl" : "modal-submit-button-icon"} icon={faPlus} size="1x"/>
                        {t("Add Event")}
                    </button>
                </form>:
                <div className="modal-container-window">
                    <div className="modal-form-container-login">
                        <div>
                            <h2>Event Added successfully!</h2>
                            <FontAwesomeIcon icon={faCheck} size="2x"/>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default AddEventModal


