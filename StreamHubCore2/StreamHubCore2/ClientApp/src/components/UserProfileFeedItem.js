// Deps
import React, { Component } from 'react';
import moment from "moment"
import { withTranslation } from 'react-i18next';
import './user-profile-feed-item.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareSquare, faUser, faStar, faFlag } from '@fortawesome/free-regular-svg-icons'
import { faShareSquare as solidShare, faUser as solidUser, faStar as solidStar, faFlag as solidFlag, faMinus, faTimes, faLink } from '@fortawesome/free-solid-svg-icons'
import * as firebase from "firebase/app";
import "firebase/auth"
import fire from "../fire"; //required!

// Class Component
class UserProfileFeedItem extends Component{
  constructor(props){
    super(props)
    this.state = {
      catColor: "rgba(20, 20, 255, 0.65)",
      save: this.props.userData.savedItems ? this.props.userData.savedItems.includes(this.props.feed.itemID) ? true : false : false,
      share:false,
      host: false,
      report: false,
      views: Math.round(Math.random() * 500)

    }
  this.handleSave = this.handleRemoveSave.bind(this)
  this.handleShare = this.handleShare.bind(this)
  this.handleHost = this.handleHost.bind(this)
  this.handleReport = this.handleReport.bind(this)
  }

  componentDidMount(){
    const itemCategoryArr = eval(this.props.feed.itemTags)
    const itemCategory = itemCategoryArr[0]
    if(itemCategory === "kids"){this.setState({catColor: "rgba(241, 49, 255, 0.65)"})}
    else if(itemCategory === "lectures"){this.setState({catColor: "rgba(158, 120, 228, 0.65)"})}
    else if(itemCategory === "fitness"){this.setState({catColor: "rgba(91, 178, 206, 0.65)"})}
    else if(itemCategory === "fun"){this.setState({catColor: "rgba(32, 212, 159, 0.65)"})}
    else if(itemCategory === "other"){this.setState({catColor: "rgba(51, 190, 46, 0.65)"})}
    } 
  
  handleRemoveSave = () => {
    const savedItemsArr = this.props.userData.savedItems.split(',')
    const toDelete = savedItemsArr.indexOf(this.props.feed.itemID.toString())
    savedItemsArr.splice(toDelete, 1)
    const newList = savedItemsArr.join(',')
    this.props.setUserData(prevState => ({...prevState, savedItems: newList}))
    firebase.auth().currentUser.updateProfile({photoURL: newList})
  }

  handleShare(){
    this.setState({share: true})
    const shareURL = `https://www.facebook.com/sharer/sharer.php?u=${this.props.feed.itemURL}`
    setTimeout(() => {
      window.open(shareURL, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes')
      this.setState({share: false})
    }, 200);
  }

  handleHost(){
    this.setState({host: true})
    setTimeout(() => {
      window.open(this.props.feed.itemURL, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes')
      this.setState({host: false})}, 200);
  }

  handleReport(){
    this.setState({report: true})
    setTimeout(() => {
      window.location = `mailto:roigfrey@gmail.com
                      ?subject=streamHub: I would like to report Item #${this.props.feed.itemID}
                      &body=I would like to report the event "${this.props.feed.itemTitle}". please list the reason for reporting below:`
                      this.setState({report: false})}, 200);
  }

  render(){  
  
    const { t } = this.props


    const itemCategoryArr = eval(this.props.feed.itemTags)
    const itemCategory = itemCategoryArr[0] ? itemCategoryArr[0] : "other"
    const timeObj = moment(this.props.feed.itemStartDateObj).format("DD/MM | HH:mm")
    const timeEnd = moment(this.props.feed.itemStartDateObj).add(this.props.feed.itemDuration, "seconds").format("HH:mm")
    const timeLabel = moment(this.props.feed.itemStartDateObj).format(t("momenttimelabel"))
    
    // this.props.feed.itemURL          

    return (
      <div className="profile-feed-item">
          <img src={this.props.image} alt="Event" className="profile-feed-item-img"/>
          <div className="profile-feed-item-title">
            <h2 onClick={() => console.log(timeObj)} className={t("lang") === "he" ? "profile-feed-item-title-h2-rtl" : "profile-feed-item-title-h2"}>{this.props.feed.itemTitle}</h2>
            <h3>{`${timeObj}-${timeEnd}`}</h3>
            <a href={this.props.feed.itemURL} target="_blank" rel="noopener noreferrer">{t("Link to Live Event")}</a>
          </div>
          <div className="profile-feed-item-timelabel" style={{background: this.state.catColor}}>
            <h2>{timeLabel}</h2>
          </div>
          <div className="profile-feed-item-catlabel">
            <h2>{itemCategory}</h2>
          </div>
          <div className="profile-feed-item-right-cont">
            <FontAwesomeIcon onClick={this.handleRemoveSave} icon={faTimes} size="1x" style={{cursor: "pointer"}}/>
          </div>
      </div>
    )
  }
}

export default withTranslation()(UserProfileFeedItem)