// Deps
import React,{ useState, useEffect, useRef, createRef } from 'react'
import moment from "moment"
import { useTranslation } from 'react-i18next'
import ReactGA from 'react-ga'


// Components
import './app.css'
import Header from "./Header"
import DaysPanel from "./DaysPanel"
import CategoryPanel from "./CategoryPanel"
import FeedPanel from './FeedPanel'
import Loading from "./Loading"

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
  const [categories, setCategories] = useState(null)
  const [filteredFeedItems, setFilteredFeedItems] = useState(null)
  const [isFetchedData,setIsFetchedData]= useState(false)
  const [autoComleteFeed,setAutoComleteFeed]= useState([])
  const [daySelected, setDaySelected] = useState(moment().format('YYYY-MM-DD'))
  const [catSelected, setCatSelected] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [language, setLanguage] = useState("en")
  const [searchFilter, setSearchFilter] = useState("")


  window.baseUrl="https://stream-hub.net/api/";
 // window.baseUrl="https://localhost:44339/api";
  window.allowPostWithoutLogin=true;
  const fetchItems = async () => {
    const apiCall = await fetch(`${ window.baseUrl}items/`);
    const items = await apiCall.json()
    setAutoComleteFeed(items)
    setFeedItems(items)
    setFilteredFeedItems(items)
    setIsLoading(false)
    setLanguage(i18n.language)
  }

  // const fetchCategories = async () => {
  //   const apiCall = await fetch("http://stream-hub.net/api/categories/")
  //   const _categories = await apiCall.json()
  //   setCategories(_categories)
  // }

  useEffect(() => {
    if (!isFetchedData){
      setIsFetchedData(true)
      fetchItems()
      //fetchCategories()
    }
  })

  if (isLoading) return (<Loading />)
  return (

    <div className="app" style={language === "he" ? {direction: "rtl"} : null}>
      
      <div className="app-header-container">
        <Header 
        autoComleteFeed={autoComleteFeed} 
        language={language} 
        changeLanguage={changeLanguage} 
        setSearchFilter={setSearchFilter}
        searchFilter={searchFilter}
        />
      </div>
      <div className="app-categories-container">
        <CategoryPanel 
        categories={categories} 
        cat={setCatSelected}
        />
      </div>
      <div className="app-days-container">
        <DaysPanel 
        dayChange={setDaySelected} 
        day={setDaySelected}
        />
      </div>
      <div className="app-feed-container">
        <FeedPanel 
        feeds={feedItems} 
        dayFilter={daySelected} 
        catFilter={catSelected} 
        searchFilter={searchFilter}
        />
      </div>
    </div>

  )
}

export default App
