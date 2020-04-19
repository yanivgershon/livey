import React, {Component} from "react"
import { withTranslation } from 'react-i18next';
import FeedItem from "./FeedItem";
import './feed-panel.css';
import { th } from "date-fns/locale";



class FeedPanel extends Component{
    constructor(props){
        super(props)
        this.state = {
            map: null,
            count: "0 Results"
        }
    }
    
    render(){

        const { t } = this.props
        
        const feedItems = this.props.feeds && this.props.feeds.map(item => {
            const itemDate = item.itemStartDateObj &&item.itemStartDateObj.slice(0,10)
            const itemCategoryArr = eval(item.itemTags) 
            const itemCategory =itemCategoryArr && itemCategoryArr[0]
            console.log("tagName:",itemCategory)        
            const randomImg = `https://i.picsum.photos/id/${Math.round(Math.random() * 1000)}/200/300.jpg`;
            let isNull=true;     

            if (this.props.dayFilter === itemDate) {
                if(this.props.catFilter === null || this.props.catFilter === itemCategory) 
                {
                   isNull=(this.props.searchFilter==="" || this.props.searchFilter===item.title)?false:true;
                }
            }
           
            return isNull?null:<FeedItem key={item.itemID} feed={item} image={randomImg} handleCount={this.handleCount}/>
        })
  

        const filtered = feedItems.filter(function (el) {
        return el != null;
        });

        const results = filtered.length

        return(
            <div className="feed-panel">
                <h2 className="feed-panel-title">{t("Search Results")}</h2>
                <h3 className="feed-panel-title-items">{results} {t("Results")}</h3>
                <div className="feed-scroll-container">
                    <div className="feed-item-container">
                        {feedItems}
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation()(FeedPanel)