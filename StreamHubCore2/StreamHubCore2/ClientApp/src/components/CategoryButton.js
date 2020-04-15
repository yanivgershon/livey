import React from 'react';
import { useTranslation } from 'react-i18next';
import './category-button.css';

function CategoryButton(props) {

  const { t } = useTranslation()

  //console.log('props',props);
  return (
    <div className="category-button" 
      style={{background: props.color}} 
      onClick={() => props.handleClick(props.name)}>
        <h1 className={
          props.selected === props.name ? "category-button-selected" : "category-button-regular"
        }>{t(props.category)}</h1>
    </div>
  );
}

export default CategoryButton;

//{props.data.category}