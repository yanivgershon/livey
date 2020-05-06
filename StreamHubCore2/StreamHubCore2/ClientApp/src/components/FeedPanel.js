import React, {Component} from "react"
import { withTranslation } from 'react-i18next';
import FeedItem from "./FeedItem";
import './feed-panel.css';
import { th } from "date-fns/locale";
import moment from 'moment';
import 'moment-timezone';

const fitness0 = "https://i.ibb.co/GPLBKBP/fitness0.jpg" 
const fitness1 = "https://i.ibb.co/QYNpdxZ/fitness1.jpg" 
const fitness2 = "https://i.ibb.co/Nyb1tNF/fitness2.jpg" 
const fitness3 = "https://i.ibb.co/vHmPGg6/fitness3.jpg" 
const fitness4 = "https://i.ibb.co/896W3FC/fitness4.jpg" 
const fitness5 = "https://i.ibb.co/yB1w9f0/fitness5.jpg" 
const fitness6 = "https://i.ibb.co/9cRPggR/fitness6.jpg" 
const fitness7 = "https://i.ibb.co/VC0DFsL/fitness7.jpg" 
const fitness8 = "https://i.ibb.co/Lz4ryKF/fitness8.jpg" 
const fitness9 = "https://i.ibb.co/Gs6G6jp/fitness9.jpg" 
const fun0 = "https://i.ibb.co/2MrrK0n/fun0.jpg" 
const fun1 = "https://i.ibb.co/g49jHdz/fun1.jpg" 
const fun2 = "https://i.ibb.co/8B0PK8p/fun2.jpg" 
const fun3 = "https://i.ibb.co/PtTpdmV/fun3.jpg" 
const fun4 = "https://i.ibb.co/BB9GTbr/fun4.jpg" 
const fun5 = "https://i.ibb.co/x2m1QnR/fun5.jpg" 
const fun6 = "https://i.ibb.co/z7Ft1y8/fun6.jpg" 
const fun7 = "https://i.ibb.co/x2QNzM1/fun7.jpg" 
const fun8 = "https://i.ibb.co/yYL4X63/fun8.jpg" 
const fun9 = "https://i.ibb.co/S3BmQkq/fun9.jpg" 
const kids0 = "https://i.ibb.co/4dYc16d/kids0.jpg" 
const kids1 = "https://i.ibb.co/KbpzrtW/kids1.jpg" 
const kids2 = "https://i.ibb.co/kXmbpmt/kids2.jpg" 
const kids3 = "https://i.ibb.co/MSmdRKQ/kids3.jpg" 
const kids4 = "https://i.ibb.co/xJqxhRC/kids4.jpg" 
const kids5 = "https://i.ibb.co/cDRvzhH/kids5.jpg" 
const kids6 = "https://i.ibb.co/CPxdm9H/kids6.jpg" 
const kids7 = "https://i.ibb.co/25nzPfy/kids7.jpg" 
const kids8 = "https://i.ibb.co/sKH3SLT/kids8.jpg" 
const kids9 = "https://i.ibb.co/SXmRmP9/kids9.jpg" 
const lectures0 = "https://i.ibb.co/7kSm3yv/lectures0.jpg" 
const lectures1 = "https://i.ibb.co/tz44h9F/lectures1.jpg" 
const lectures2 = "https://i.ibb.co/N3bqjb7/lectures2.jpg" 
const lectures3 = "https://i.ibb.co/qN0yjvM/lectures3.jpg" 
const lectures4 = "https://i.ibb.co/nRtPWNg/lectures4.jpg" 
const lectures5 = "https://i.ibb.co/SKS7Wy6/lectures5.jpg" 
const lectures6 = "https://i.ibb.co/kqHCBJr/lectures6.jpg" 
const lectures7 = "https://i.ibb.co/jJ913L6/lectures7.jpg" 
const lectures8 = "https://i.ibb.co/mBcMjGb/lectures8.jpg" 
const lectures9 = "https://i.ibb.co/8bhVQr7/lectures9.jpg" 
const other0 = "https://i.ibb.co/wyFyDbB/random0.jpg" 
const other1 = "https://i.ibb.co/M7H8xGM/random1.jpg" 
const other2 = "https://i.ibb.co/sjMxzJ4/random2.jpg" 
const other3 = "https://i.ibb.co/Jyd2syT/random3.jpg" 
const other4 = "https://i.ibb.co/pJ46JKC/random4.jpg" 
const other5 = "https://i.ibb.co/Mh1kC9r/random5.jpg" 
const other6 = "https://i.ibb.co/NyzgHjB/random6.jpg" 
const other7 = "https://i.ibb.co/2hdkWQR/random7.jpg" 
const other8 = "https://i.ibb.co/KN1YqcJ/random8.jpg" 
const other9 = "https://i.ibb.co/cYXtgmX/random9.jpg" 

class FeedPanel extends Component{
    constructor(props){
        super(props)
        this.state = {
            map: null,
            count: "0 Results",
            itemsFromLoad: 0,
            itemsToLoad: 100
        }
        this.singleDigit = this.singleDigit.bind(this)
    }
    
    singleDigit(value){
        while (value > 9) {
          value
            .toString()
            .split('')
            .map(Number)
            .reduce(function (a, b) {return value = a + b})
        } return value
      }

    render(){

        const { t } = this.props
        
        const availableCats = ["kids","lectures","fitness","fun"]


        // const feedItems2 = this.props.feed && this.props.feed.map(item => {
        //     const hostImage = item.itemImgURL
        //     return( <FeedItem 
        //             key={item.itemID} 
        //             feed={item} 
        //             image={hostImage} 
        //             handleCount={this.handleCount} 
        //             isLoggedIn={true}
        //             setUserData={"none"}
        //             userData={"none"}
        //             />
        //     )
        // })
        //2020-09-14T01:00:00 
        //Feed item (Category / Date / Search) filtering
        const feedItems = this.props.feed && this.props.feed.map(item => {


            const itemStartDate = moment.utc(item.itemStartDateObj).local().format('YYYY-MM-DDTHH:mm:ss')
            const itemDate = itemStartDate && itemStartDate.slice(0,10)

            // console.log("time from DB (UTC):",item.itemStartDateObj)
            // console.log("time converted from UTC:",itemStartDate)
            // console.log("item Date:", itemDate)

            const itemCategoryArr = eval(item.itemTags)
            const itemCategory = itemCategoryArr ? (availableCats.indexOf(itemCategoryArr[0]) !== -1 ? itemCategoryArr[0] : null) : "other"

            const itemSearch = item.itemTitle.toUpperCase().includes(this.props.searchFilter.toUpperCase())
            //const randomImage = `https://i.picsum.photos/id/${Math.floor(Math.random() * 1000)}/200/300.jpg`
            const hostImage = item.itemImgURL
            const stockImage = itemCategory ? eval(itemCategory+this.singleDigit(item.itemTitle.length)) : eval("other"+this.singleDigit(item.itemTitle.length))
            const itemImg = hostImage ? hostImage : stockImage
            const feedItem = <FeedItem 
                                key={item.itemID} 
                                feed={item} 
                                image={itemImg} 
                                handleCount={this.handleCount} 
                                isLoggedIn={this.props.isLoggedIn}
                                setUserData={this.props.setUserData}
                                userData={this.props.userData}
                             />
            if (this.props.dayFilter === itemDate && !this.props.catFilter) {
                if (!this.props.searchFilter) {
                    return feedItem
                } else if (itemSearch){
                    return feedItem
                }
            } else if(this.props.dayFilter === itemDate && this.props.catFilter === itemCategory) {
                if (!this.props.searchFilter) {
                    return feedItem
                } else if (itemSearch){
                    return feedItem
                }
            }  else if(!this.props.dayFilter || this.props.dayFilter === "all" && !this.props.catFilter){
                if (!this.props.searchFilter) {
                    return feedItem
                } else if (itemSearch){
                    return feedItem
                }
            }  else if(!this.props.dayFilter || this.props.dayFilter === "all" && this.props.catFilter === itemCategory){
                if (!this.props.searchFilter) {
                    return feedItem
                } else if (itemSearch){
                    return feedItem
                }
            } return null

        })
        

        const filtered = feedItems.filter(function (el) {
        return el != null;
        });

        const results = filtered.length

        return(
            <div className="feed-panel">
                {this.props.searchFilter ? <h2 className="feed-panel-title">{t("Search Results")}</h2> : null}
                {this.props.searchFilter ? <h3 className="feed-panel-title-items">{results} {t("Results")}</h3> : null}
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