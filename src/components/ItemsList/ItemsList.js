import React, {useState, useContext,useEffect} from 'react'
import useFetch from '../../hooks/useFetch'
import MyItem from '../BlockEditor/BlockMenu/Items/MyItem/MyItem'
import './itemsList.css'
import MyItems from './MyItems/MyItems'
import Context from '../../Context'

const ItemsList = ({ id, previewItem, itemList }) => {
    const [myItemsList, setMyItemsList] = useState(false)
    const [prevItem, setPrevItem] = useState(itemList)
    const [state, changeState, setState, catalogId] = useContext(Context)
    const [resp, doFetch] = useFetch(`https://cloudsgoods.com/api/CatalogController.php?mode=add_model_to_catalog&catalog_id=${catalogId}&menu_id=${id}`)
    useEffect(()=>{
        doFetch()
    },[])


    console.log('itemList5555555', itemList)

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
        <React.Fragment>
        <div>{id}</div>
        <div className='items-list-items'>
        {itemList ? itemList.map((el,i)=>{
                    return  (<div className = 'items-list-items-tepmlate'>      
                                <img src = {el.default_look_preview_200}/>
                            </div>)
                }): null}  
            <div className = 'items-list-items-tepmlate'>    
                <div className = 'items-list-items-template-wrapper'>
                  <div onClick = {openAddItemBlock} className = 'add-item-buttom'>Добавить товар</div>
                  {myItemsList ?  <MyItems previewItem = {previewItem}  showMyItem = {setMyItemsList}/> : null}
                </div>
            </div>
        </div>
        </React.Fragment>
    )
}

export default ItemsList