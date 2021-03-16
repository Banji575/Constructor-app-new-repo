import React, { useRef } from 'react'
import './itemEditMenu.css'

const ItemEditMenu = ({isShow, openEdit, delHandler}) => {
    const root = useRef()
    const classes = ['item-edit-wrapper']
   if(isShow){
       classes.push('item-edit-show')
   }

    return (
        <div ref={root} className={classes.join(' ')}>
            <ul className='item-edit-list'>
                <li className='item-edit-item' onClick = {openEdit}>Редактировать</li>
                <li className='item-edit-item' onClick = {delHandler}>Удалить</li>
            </ul>
        </div>
    )
}

export default ItemEditMenu