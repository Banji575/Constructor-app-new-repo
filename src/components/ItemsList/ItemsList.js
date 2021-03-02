import React, {useState} from 'react'
import MyItem from '../BlockEditor/BlockMenu/Items/MyItem/MyItem'
import './itemsList.css'
import MyItems from './MyItems/MyItems'

const ItemsList = ({ id, previewItem }) => {
    const [myItemsList, setMyItemsList] = useState(false)
    console.log('item list')
    const openAddItemBlock = () => {
        console.log('Open add items block')
        setMyItemsList(true)
    }
    return (
        <div className='items-list'>
            <div>{id}</div>
            <div className = 'items-list-items-tepmlate'>
                <div className = 'items-list-items-template-wrapper'>
                  <div onClick = {openAddItemBlock} className = 'add-item-buttom'>Добавить товар</div>
                  {myItemsList ?  <MyItems previewItem = {previewItem}  showMyItem = {setMyItemsList}/> : null}
                </div>
            </div>
        </div>
    )
}

export default ItemsList