import React, { useState, useEffect } from "react"
import "./add-event-modal.css"
import { useTranslation } from 'react-i18next'
//import { loadReCaptcha } from 'react-recaptcha-v3'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import random9 from "./categorypics/random9.jpg"
import moment from "moment"



function AddEventModal(props){

    const [state, setState] = useState({
        itemTitle:"",
        itemDuration:"",
        itemStartDateObj:"",
        itemURL:"",
        itemTags:"[]",
        platformID:1
    })
    
    const [date, setDate] = useState({
        date:"",
        startTime:"",
        endTime:"",
    })

    const [isError, setIsError] = useState(false)
    
    //useEffect(() => loadReCaptcha("6Lc73uoUAAAAAHMQquUS6UUmL6bxWKTE_cPSmFmW"), [])

    const { t } = useTranslation()

    const handleChange = (event) => {
        const {name, value} = event.target
        setState(prevState => ({ ...prevState, [name]: value }))
    }

    const handleDateChange = (event) => {
        const {name, value} = event.target
        setDate(prevState => ({ ...prevState, [name]: value }))
        const duration = moment.duration(moment(date.endTime,"HH:mm").diff(moment(date.startTime,"HH:mm"))).asSeconds()
        const datetimeFormatted = `${date.date.concat("T",date.startTime)}`
        setState(prevState => ({ ...prevState, itemDuration: duration, itemStartDateObj: datetimeFormatted }))
            
    }

    const handleCategoryChange = (event) => {
        const {name, value} = event.target
        const categoryFormatted = `['${value.toLowerCase()}']`
        setState(prevState => ({ ...prevState, [name]: categoryFormatted }))
    }

    const handleClose = (event) => {
        if(event.target === event.currentTarget) 
        props.handleHideAddEvent()
    }

    const handleSubmit = () => {
        if(state.itemTitle && state.itemDuration && state.itemStartDateObj && state.itemURL && state.itemTags != "[]"){
            console.log("All Items Complete!")
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json")

            var raw = JSON.stringify(state)

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            }
        
            fetch("https://stream-hub.net/api/items/", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error))
            .then(props.handleHideAddEvent())
        } else {
            setIsError(true)
        }
        
        
    }
    

    return(
        <div className="modal-container" name="mainmodal" onClick={handleClose}>
            <div className="modal-container-window-parent">
                <div className="modal-container-window">
                <div className="modal-close-button" onClick={props.handleHideAddEvent}>
                    <FontAwesomeIcon icon={faTimes} size="1x"/>
                </div>
                    <div className="modal-form-container">
        {/* Remove Ternary expression to enable photo Upload */}
                {1===2 ? <div className="modal-form-img">
                             <button className="modal-form-img-button" type="button">{t("Upload Photo")}<br/><br/>
                            <FontAwesomeIcon className="modal-form-img-button-icon" icon={faFileUpload} size="2x"/>
                            </button> 
                        </div> : <img className={t("lang") === "he" ? "temp-img-rtl" :"temp-img"} alt="" src={random9}/>}

                        <form className="modal-form">
                            <div className="modal-form-inputs">
                                <h3><span>* </span>{t("Tell us about your event")}</h3>
                                <textarea 
                                placeholder={t("Short description of your event...")} 
                                maxLength="90"
                                name="itemTitle"
                                value={state.itemTitle}
                                onChange={handleChange}
                                />
                                <p>{state.itemTitle.length}/90</p>
                                
                            </div>
                            <div className="modal-form-inputs">
                                <h3><span>* </span>{t("When is it?")}</h3>
                                <div className="modal-form-datetime" >
                                    <label>
                                    {t("Event Date")}<input type="date" name="date" onChange={handleDateChange}  value={date.date}/>
                                    </label>
                                    <label>
                                    {t("Start Time")}<input type="time" name="startTime" onChange={handleDateChange} value={date.startTime}/>
                                    </label>
                                    <label>
                                    {t("End Time")}<input type="time" name="endTime" onChange={handleDateChange} value={date.endTime}/>
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
                        </form>
                    </div>
                    {isError ? <h4 style={{color:"red"}}>You must complete the form before submitting!</h4> : null}
                    <button className="modal-submit-button" type="button" onClick={handleSubmit}>
                        <FontAwesomeIcon className={t("lang") === "he" ? "modal-submit-button-icon-rtl" : "modal-submit-button-icon"} icon={faPlus} size="1x"/>
                        {t("Add Event")}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddEventModal