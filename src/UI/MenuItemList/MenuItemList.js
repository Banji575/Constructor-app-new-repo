import React from 'react'
import './menuItemList.css'

const MenuItemList = ({clickHandler, isOpen}) => {
    const classes = ['menu-item-option']
    if(isOpen){
        classes.push('menu-item-option-close')
    }else{
        classes.push('menu-item-option-open')
    }
    return ( 
        <div onClick = {()=>clickHandler(s=>!s)} className = {classes.join(' ')}></div>
    )
}

export default MenuItemList