import React, {Component} from "react"
import { withTranslation } from 'react-i18next';
import FeedItem from "./FeedItem";
import './feed-panel.css';
import { th } from "date-fns/locale";
import categorypics from "./categorypics/categorypics"

/*// Category Stock Photo Imports
import fun0 from "./categorypics/fun0.jpg"
import fun1 from "./categorypics/fun1.jpg"
import fun2 from "./categorypics/fun2.jpg"
import fun3 from "./categorypics/fun3.jpg"
import fun4 from "./categorypics/fun4.jpg"
import fun5 from "./categorypics/fun5.jpg"
import fun6 from "./categorypics/fun6.jpg"
import fun7 from "./categorypics/fun7.jpg"
import fun8 from "./categorypics/fun8.jpg"
import fun9 from "./categorypics/fun9.jpg"
import fitness0 from "./categorypics/fitness0.jpg"
import fitness1 from "./categorypics/fitness1.jpg"
import fitness2 from "./categorypics/fitness2.jpg"
import fitness3 from "./categorypics/fitness3.jpg"
import fitness4 from "./categorypics/fitness4.jpg"
import fitness5 from "./categorypics/fitness5.jpg"
import fitness6 from "./categorypics/fitness6.jpg"
import fitness7 from "./categorypics/fitness7.jpg"
import fitness8 from "./categorypics/fitness8.jpg"
import fitness9 from "./categorypics/fitness9.jpg"
import kids0 from "./categorypics/kids0.jpg"
import kids1 from "./categorypics/kids1.jpg"
import kids2 from "./categorypics/kids2.jpg"
import kids3 from "./categorypics/kids3.jpg"
import kids4 from "./categorypics/kids4.jpg"
import kids5 from "./categorypics/kids5.jpg"
import kids6 from "./categorypics/kids6.jpg"
import kids7 from "./categorypics/kids7.jpg"
import kids8 from "./categorypics/kids8.jpg"
import kids9 from "./categorypics/kids9.jpg"
import lectures0 from "./categorypics/lectures0.jpg"
import lectures1 from "./categorypics/lectures1.jpg"
import lectures2 from "./categorypics/lectures2.jpg"
import lectures3 from "./categorypics/lectures3.jpg"
import lectures4 from "./categorypics/lectures4.jpg"
import lectures5 from "./categorypics/lectures5.jpg"
import lectures6 from "./categorypics/lectures6.jpg"
import lectures7 from "./categorypics/lectures7.jpg"*/
import lectures8 from "./categorypics/lectures8.jpg"
import lectures9 from "./categorypics/lectures9.jpg" 





class FeedPanel extends Component{
    constructor(props){
        super(props)
        this.state = {
            map: null,
            count: "0 Results",
            itemsFromLoad: 0,
            itemsToLoad: 100
        }
    }
    
    render(){

        const { t } = this.props
        
        /*
        const from = this.state.itemsFromLoad
        const to = this.state.itemsToLoad
        const feedItems = this.props.feeds.slice(from, to).map(item => {
            return <FeedItem key={item.itemID} feed={item} image={lectures9} handleCount={this.handleCount}/>})
        */
        
        //Feed item (Category / Date / Search) filtering
        const feedItems = this.props.feeds && this.props.feeds.map(item => {
            const itemDate = item.itemStartDateObj && item.itemStartDateObj.slice(0,10)
            const itemCategoryArr = eval(item.itemTags)
            const itemCategory = itemCategoryArr && itemCategoryArr[0]
            const itemSearch = item.itemTitle.toUpperCase().includes(this.props.searchFilter.toUpperCase())
            //const hostImage = item.itemImgURL
            //const stockImage = itemCategory ? categorypics.map(photo => {
            //    itemCategory === photo.
            //})
            const randomImg = item.itemImgURL ? item.itemImgURL : `https://i.picsum.photos/id/${Math.floor(Math.random() * 1000)}/200/300.jpg`
            const tempImage =  lectures8
            const feedItem = <FeedItem key={item.itemID} feed={item} image={randomImg} handleCount={this.handleCount}/>   
            
            if (this.props.dayFilter === itemDate && !this.props.catFilter) {
                if (!this.props.searchFilter) {
                    return feedItem
                } else if (itemSearch){
                    return feedItem
                }
            } else if(this.props.dayFilter === itemDate && this.props.catFilter === itemCategory ) {
                if (!this.props.searchFilter) {
                    return feedItem
                } else if (itemSearch){
                    return feedItem
                }
            }  else {return null}
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