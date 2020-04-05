import React from 'react';
import moment from "moment"
import './feed-item.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareSquare, faUser, faStar, faFlag } from '@fortawesome/free-regular-svg-icons'

//{props.feed.ItemTitle}

function FeedItem(props) {
  
  const imgURL = props.feed.categories && props.feed.categories[0]
  const timeObj = moment(props.feed.ItemStartDateObj).format("DD/MM | HH:mm")
  const timeEnd = moment(props.feed.ItemStartDateObj).add(props.feed.ItemDuration, "seconds").format("HH:mm")
  const catColor = () => {
    if(props.feed.categories === "kids"){return "rgba(241, 49, 255, 0.65)"}
    else if(props.feed.categories === "lectures"){return "rgba(241, 49, 255, 0.65)"}
    else if(props.feed.categories === "fitness"){return "rgba(158, 120, 228, 0.65)"}
    else if(props.feed.categories === "fun"){return "rgba(91, 178, 206, 0.65)"}
    else if(props.feed.categories === "other"){return "rgba(51, 190, 46, 0.65)"}
  }
  const labelStyle = props.feed.categories ? props.feed.categories : "red"
  
  return (
    <div className="feed-item">
        <img src={props.image} alt="Event Image"/>
        <div className="feed-item-title">
          <h2 onClick={() => console.log(timeObj)}>{props.feed.ItemTitle}</h2>
          <h3>{`${timeObj}-${timeEnd}`}</h3>
        </div>
        <div className="feed-item-timelabel" style={{background: labelStyle}}>
          <h2>8:00</h2>
        </div>
        <div className="feed-item-description">
          <p>{props.feed.ItemDescription}</p>
          <a href={props.feed.ItemURL}>Link to Live Event</a>
        </div>
        <div className="feed-item-icons">
          <div className="feed-item-icons-class">
            <FontAwesomeIcon className="feed-item-icons-class" icon={faStar} size="lg"/>
            <h3>Save</h3>
          </div>
          <div className="feed-item-icons-class">
            <FontAwesomeIcon className="feed-item-icons-class" icon={faShareSquare} size="lg"/>
            <h3>Share</h3>
          </div>
          <div className="feed-item-icons-class">
            <FontAwesomeIcon className="feed-item-icons-class" icon={faUser} size="lg"/>
            <h3>View Host</h3>
          </div>
          <div className="feed-item-icons-class">
            <FontAwesomeIcon className="feed-item-icons-class" icon={faFlag} size="lg"/>
            <h3>Report</h3>
          </div>
          <div className="feed-item-icons-class">
            <h2>1,045</h2>
            <h3>Views</h3>
          </div>

        </div>
    </div>
  );
}

export default FeedItem;
