import React, {Component} from "react"
import { withTranslation } from 'react-i18next';

import "./category-panel.css"
import CategoryButton from "./CategoryButton"

class CategoryPanel extends Component{
    constructor(props){
        super(props)
        this.state={
            selectedCategory: null,
            kidsLine: null,
            lecturesLine: null,
            fitnessLine: null,
            funLine: null,
            otherLine: null,
        }   
        this.handleClick = this.handleClick.bind(this)
        this.handleClear = this.handleClear.bind(this)
    }
    handleClick(name){
        console.log("cat Name:",name)
        if (name === this.state.selectedCategory){
            this.setState({kidsLine: null, lecturesLine: null, fitnessLine: null, funLine: null, otherLine: null})
            this.setState({selectedCategory: null})
            this.props.cat(null)
        } else {
                this.setState({selectedCategory: name})
            if (name === 1) {this.setState({kidsLine: 1, lecturesLine: null, fitnessLine: null, funLine: null, otherLine: null})
                this.props.cat("kids")} else
            if (name === 2) {this.setState({kidsLine: null, lecturesLine: 1, fitnessLine: null, funLine: null, otherLine: null})
                this.props.cat("lectures")} else
            if (name === 3) {this.setState({kidsLine: null, lecturesLine: null, fitnessLine: 1, funLine: null, otherLine: null})
                this.props.cat("fitness")} else
            if (name === 4) {this.setState({kidsLine: null, lecturesLine: null, fitnessLine: null, funLine: 1, otherLine: null})
                this.props.cat("fun")} else
            if (name === 0) {this.setState({kidsLine: null, lecturesLine: null, fitnessLine: null, funLine: null, otherLine: 1})
                this.props.cat("other")}
        }
    }
        
    

    handleClear(){
        this.setState({
            selectedCategory: null,
            kidsLine: null,
            lecturesLine: null,
            fitnessLine: null,
            funLine: null,
            otherLine: null
        })
        this.props.cat(null)
    }

    render(){

        const { t } = this.props
        
        const categoryTypes = [
            {id: 0, type: "Other", color:"#7474fd"},
            {id: 1, type: "Kids", color:"#f477fd"}, 
            {id: 2, type: "Lectures", color:"#bea5eb"}, 
            {id: 3, type: "Fitness", color:"#92cbdd"}, 
            {id: 4, type: "Fun", color:"#6ce1bf"},
        ]

        const categoryButtons = categoryTypes.map(type => 
            <CategoryButton 
            key={type.id} 
            name={type.id} 
            category={type.type} 
            color={type.color}
            selected={this.state.selectedCategory}
            handleClick={this.handleClick}/>
        )

        const underLine = this.state.selectedCategory !== null ? 
            <div className="category-underline">
                <div 
                style={this.state.otherLine ? {background: categoryTypes[0].color} : null}
                className="category-underline-lines">
                </div>
                <div 
                style={this.state.kidsLine ? {background: categoryTypes[1].color} : null}
                className="category-underline-lines">
                </div>
                <div 
                style={this.state.lecturesLine ? {background: categoryTypes[2].color} : null}
                className="category-underline-lines">
                </div>
                <div 
                style={this.state.fitnessLine ? {background: categoryTypes[3].color} : null}
                className="category-underline-lines">
                </div>
                <div 
                style={this.state.funLine ? {background: categoryTypes[4].color} : null}
                className="category-underline-lines">
                </div>
            </div> : 
            <div className="category-underline">
                <div className="category-underline-lines">
                </div>
            </div>




                                    
        return(
            <div className="category-panel-flex">
                <h2 className="category-panel-title">{t("Select Topic")}</h2>
                <div className="category-panel-grid">
                    <div className="category-panel">
                        {categoryButtons}                
                    </div>
                    {underLine}
                </div>
                <button className="category-panel-clear" type="button" onClick={this.handleClear}>{t("Clear")}</button>
            </div>
        )
    }
}

export default withTranslation()(CategoryPanel)