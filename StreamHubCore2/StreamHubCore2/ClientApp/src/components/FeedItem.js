import React, { Component } from 'react';
import moment from "moment"
import { withTranslation } from 'react-i18next';
import './feed-item.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareSquare, faUser, faStar, faFlag } from '@fortawesome/free-regular-svg-icons'
import { faShareSquare as solidShare, faUser as solidUser, faStar as solidStar, faFlag as solidFlag } from '@fortawesome/free-solid-svg-icons'


//{props.feed.itemTitle}

class FeedItem extends Component{
  constructor(props){
    super(props)
    this.state = {
      catColor: "rgba(20, 20, 255, 0.65)",
      save: false,
      share:false,
      host: false,
      report: false,
      views: Math.round(Math.random() * 500)

    }
  this.handleSave = this.handleSave.bind(this)
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
  
  handleSave(){
    this.state.save ? this.setState({save: false}) : this.setState({save: true})
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

    const timeObj = moment(this.props.feed.itemStartDateObj).format("DD/MM | HH:mm")
    const timeEnd = moment(this.props.feed.itemStartDateObj).add(this.props.feed.itemDuration, "seconds").format("HH:mm")
    const timeLabel = moment(this.props.feed.itemStartDateObj).format(t("momenttimelabel"))
  
    return (
      <div className="feed-item">
          <img src={this.props.image} alt="Event" className={t("lang") === "he" ? "feed-item-img-rtl" :"feed-item-img"}/>
          <div className="feed-item-title">
            <h2 onClick={() => console.log(timeObj)}>{this.props.feed.itemTitle}</h2>
            <h3>{`${timeObj}-${timeEnd}`}</h3>
          </div>
          <div className="feed-item-timelabel" style={{background: this.state.catColor}}>
            <h2>{timeLabel}</h2>
          </div>
          <div className="feed-item-description">
            <p>{this.props.feed.itemDescription}</p>
            <a href={this.props.feed.itemURL} target="_blank" rel="noopener noreferrer">{t("Link to Live Event")}</a>
          </div>
          <div className="feed-item-icons">
            <div className="feed-item-icons-class" onClick={() => null/*this.handleSave*/} style={{color:"#c7c7c7"}}>
              <FontAwesomeIcon className="feed-item-icons-class" icon={this.state.save ? solidStar : faStar} size="lg" />
              <h3>{t("Save")}</h3>
            </div>
            <div className="feed-item-icons-class" onClick={this.handleShare}>
              <FontAwesomeIcon className="feed-item-icons-class" icon={this.state.share ? solidShare : faShareSquare} size="lg"/>
              <h3>{t("Share")}</h3>
            </div>
            <div className="feed-item-icons-class" onClick={this.handleHost} style={{color:"#c7c7c7"}}>
              <FontAwesomeIcon className="feed-item-icons-class" icon={this.state.host ? solidUser : faUser} size="lg"/>
              <h3>{t("View Host")}</h3>
            </div>
            <div className="feed-item-icons-class" onClick={this.handleReport}>
              <FontAwesomeIcon className="feed-item-icons-class" icon={this.state.report ? solidFlag : faFlag} size="lg"/>
              <h3>{t("Report")}</h3>
            </div>
            <div className="feed-item-icons-counter">
              <h2>{this.state.views}</h2>
              <h3>{t("Views")}</h3>
            </div>

          </div>
      </div>
    )
  }
}

export default withTranslation()(FeedItem)