// Deps
import React,{ useState, useEffect } from 'react'
import { debounce } from "lodash";
import moment from "moment"
import { useTranslation } from 'react-i18next'
import ReactGA from 'react-ga'
import * as firebase from "firebase/app";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons'

// Components
import './app.css'
import Header from "./Header"
import DaysPanel from "./DaysPanel"
import CategoryPanel from "./CategoryPanel"
import FeedPanel from './FeedPanel'
import Loading from "./Loading"
import Footer from "./Footer"

function App() {

  // Google Analytics
  ReactGA.initialize('UA-162926417-1')
  ReactGA.pageview("/app")

  // Translation
  const { t, i18n } = useTranslation()

  const changeLanguage = lang => {
    setLanguage(lang)
    i18n.changeLanguage(lang)
  }
  
  const [feedItems, setFeedItems] = useState(null)
  const [autoComleteFeed,setAutoComleteFeed]= useState([])
  const [daySelected, setDaySelected] = useState("all") //useState(moment().format('YYYY-MM-DD'))
  const [catSelected, setCatSelected] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [language, setLanguage] = useState("en")
  const [searchTerm, setSearchTerm] = useState("")
  const [searchFilter, setSearchFilter] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState({
    displayName: "",
    savedItems: "",
    email: "",
    userId: "",
  })


  useEffect(() => {
    if(userData.savedItems) {
      const savedListArr = userData.savedItems.split(",")
      const tempArr = [...savedListArr]
      feedItems && savedListArr.map(itemID => {
        const itemNotFound = feedItems.find(item => item.itemID === parseInt(itemID))
        if(!itemNotFound){
          const toDelete = tempArr.indexOf(itemID)
          tempArr.splice(toDelete, 1)
          const newList = tempArr.join(',')

          setUserData(prevState => ({...prevState, savedItems: newList}))
          firebase.auth().currentUser.updateProfile({photoURL: newList})

          console.log("toDelete",toDelete)
          console.log("ItemToDelete:",itemID)
          console.log("tempArr:",tempArr)
          console.log("NewList:",newList)
          console.log("savedListArr:",savedListArr)
        }
      })
    }
  }, [feedItems])


  useEffect(() => {
    const authListener = firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setIsLoggedIn(true)
        console.log("User Authenticated:",user)
        if (user.photoURL && user.photoURL.includes("https://")){
          setUserData(prevState => ({
            ...prevState, 
            displayName: user.displayName,
            savedItems: "",
            email: user.email,
            userId: user.uid,
          }))
        } else {

          setUserData(prevState => ({
            ...prevState, 
            displayName: user.displayName,
            savedItems: user.photoURL,
            email: user.email,
            userId: user.uid,
          }))
        }
      } else {
        setIsLoggedIn(false)
        console.log("No User:",user)
      }
    })
    return authListener
  }, [])

  window.baseUrl="https://stream-hub.net/api/";
 // window.baseUrl="https://localhost:44339/api";
  window.allowPostWithoutLogin=true;
  const fetchItems = async () => {
    const apiCall = await fetch(`${ window.baseUrl}items/`);
    const items = await apiCall.json()
    setAutoComleteFeed(items)
    setFeedItems(items)
    setIsLoading(false)
    setLanguage(i18n.language)
  }
  
  useEffect(() => {
    fetchItems()
  },[])
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchFilter(searchTerm);
    }, 800);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  if (isLoading) return (<Loading />)
  return (

    <div className="app" style={language === "he" ? {direction: "rtl"} : null}>
      
      <div className="app-header-container">
        <Header 
        autoComleteFeed={autoComleteFeed} 
        language={language} 
        changeLanguage={changeLanguage} 
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={isLoggedIn}
        setUserData={setUserData}
        userData={userData}
        feedItems={feedItems}
        />
      </div>
      <div className="app-categories-container">
        <CategoryPanel 
        cat={setCatSelected}
        />
      </div>
      <div className="app-days-container">
        <div className="days-panel-slider-arrows">
          <FontAwesomeIcon icon={faChevronLeft}/>
          <FontAwesomeIcon icon={faChevronRight}/>
        </div>
        <DaysPanel 
        dayChange={setDaySelected} 
        day={setDaySelected}
        />
      </div>
      <div className="app-feed-container">
        <FeedPanel 
        feed={feedItems} 
        dayFilter={daySelected} 
        catFilter={catSelected} 
        searchFilter={searchFilter}
        isLoggedIn={isLoggedIn}
        setUserData={setUserData}
        userData={userData}
        />
      </div>
      <div className="app-footer-container">
        <Footer />
      </div>
    </div>

  )
}

export default App
