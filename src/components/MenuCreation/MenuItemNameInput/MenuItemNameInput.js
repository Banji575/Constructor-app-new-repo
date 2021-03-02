import React, { useState } from 'react'
import './menuItemNameInput.css'

const MenuItemNameInput = ({addNewItem,closeEdit}) => {
    const [title, setTitle] = useState('')
    const saveList = (title) => {
        addNewItem(title)
        closeEdit(false)
    }
    return (
        <div className = 'menu-item-input-container '>
            <input value = {title} onChange = {(evt)=>setTitle(evt.target.value)} placeholder = 'New catalog' className = 'menu-item-input' type = 'text' />
            <button onClick={()=>saveList(title)}  className = 'menu-item-button'>Ok</button>
        </div>
        
    )
}

export default MenuItemNameInput