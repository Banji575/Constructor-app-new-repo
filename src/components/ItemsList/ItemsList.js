import React, {useState, useContext,useEffect} from 'react'
import useFetch from '../../hooks/useFetch'
import MyItem from '../BlockEditor/BlockMenu/Items/MyItem/MyItem'
import './itemsList.css'
import MyItems from './MyItems/MyItems'
import Context from '../../Context'

const ItemsList = ({ id, previewItem }) => {
    const [myItemsList, setMyItemsList] = useState(false)
    const [state, changeState, setState, catalogId] = useContext(Context)
    const [resp, doFetch] = useFetch(`https://cloudsgoods.com/api/CatalogController.php?mode=add_model_to_catalog&catalog_id=${catalogId}&menu_id=${id}`)
    useEffect(()=>{
        doFetch()
    },[])

    useEffect(()=>{
        if(!resp) return
        console.log('das;ldasljdasfkljdasl;jdasf',resp)
    },[resp])
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