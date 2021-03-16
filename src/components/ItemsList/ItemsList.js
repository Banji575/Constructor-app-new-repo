import React, { useState, useContext, useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import MyItem from '../BlockEditor/BlockMenu/Items/MyItem/MyItem'
import './itemsList.css'
import MyItems from './MyItems/MyItems'
import Context from '../../Context'
import ItemEditMenu from '../../UI/ItemEditMenu/ItemEditMenu'
import Item from './Item/Item'
import ItemPage from '../SiteBody/ItemPage/ItemPage'

const ItemsList = ({ id, previewItem, itemList }) => {
    const [myItemsList, setMyItemsList] = useState(false)
    const [prevItem, setPrevItem] = useState(itemList)
    const { state, changeState, setState, catalogId } = useContext(Context)
    const [viewItemPage, setViewItemPage] = useState(false)
    const [activeCatalogId, setActiveCatalogId] = useState(null)
    const [resp, doFetch] = useFetch(`https://cloudsgoods.com/api/CatalogController.php?mode=add_model_to_catalog&catalog_id=${catalogId}&menu_id=${id}`)
    useEffect(() => {
        doFetch()
    }, [])

    console.log('itemList5555555', itemList, id)

    const openItemPage = (catalogId) => {
        console.log(catalogId)
        setActiveCatalogId(catalogId)
    }

    useEffect(() => {
        if (!activeCatalogId) return
        setViewItemPage(s => !s)
    }, [activeCatalogId])


    useEffect(() => {
        if (!resp) return
        console.log('das;ldasljdasfkljdasl;jdasf', resp)
    }, [resp])
    console.log('item list')
    const openAddItemBlock = () => {
        console.log('Open add items block')
        setMyItemsList(true)
    }
    console.log('viewItemPage', viewItemPage)

    return (
        <React.Fragment>
            {!viewItemPage ?
            <React.Fragment>
                    <div className=" col-sm-1 col-md-2 mobile-view add-item-mobile ">
                        <div className='items-list-items-template-wrapper '>
                            <div onClick={openAddItemBlock} className='add-item-buttom'>Добавить товар</div>
                            {myItemsList ? <MyItems previewItem={previewItem} showMyItem={setMyItemsList} /> : null}
                        </div>
                    </div>
                    <div className='d-felx items-list-items justify-content-around mt-3'>
                        {itemList ? itemList.map((el, i) => {
                            return (
                                <Item el={el} openItemPage={openItemPage} />
                            )
                        }) : null}
                        <div className=" col-sm-1 col-md-2 decktop-view">
                            <div className='items-list-items-tepmlate'>
                                <div onClick={openAddItemBlock} className='items-list-items-template-wrapper'>
                                    <div className='add-item-buttom'>Добавить товар</div>
                                    {myItemsList ? <MyItems previewItem={previewItem} showMyItem={setMyItemsList} /> : null}
                                </div>
                            </div>
                        </div>
                        </div>
                    </React.Fragment>
                : <ItemPage closePopup={setViewItemPage} id={activeCatalogId} />
            }
       </React.Fragment>
    )
}

export default ItemsList