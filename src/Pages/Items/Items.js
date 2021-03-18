import React, { useEffect, useState, useContext } from 'react'
import ItemsList from '../../components/ItemsList/ItemsList'
import ItemPage from '../../components/SiteBody/ItemPage/ItemPage'
import ItemsVidjet from '../../components/SiteBody/ItemsVidjet/ItemVIdjet'
import useFetch from '../../hooks/useFetch'
import Context from '../../Context'
import BreadCrumbs from './../../components/BreadCrumbs/BreadCrumbs';

const Items = ({ menuId }) => {
    const [resp, doFetch] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=get_catalog_objects')
    const { state, changeState, setState, catalogId } = useContext(Context)
    const [itemList, setItemList] = useState([])
    const [id, setId] = useState(menuId)
    const [previewItem, setPreviewItem] = useState(null)
    const [addItemFlag, setAddItemFlag] = useState(true)

    const addItemInMenu = () => {
        setAddItemFlag(s => !s)
        setPreviewItem(null)
    }
    const closePreview = () =>{
        console.log('as;ljdaskljasflkjadskljadlkjdas')
        setPreviewItem(null)
    }

    // console.log('menu id', state.menu)
    useEffect(() => {
        const formData = new FormData()
        formData.set('mode', 'get_catalog_objects')
        formData.set('catalog_id', catalogId)
        formData.set('menu_id', menuId)
        formData.set('start', 0)
        formData.set('limit', 12)
        doFetch(formData)
    }, [menuId, addItemFlag])

    useEffect(() => {
        if (!resp) return
        console.log('asjdslkjdsfkl;jdasf', itemList)
        setItemList(resp.data)

    }, [resp])

    console.log('BreadCrumbs', state)

    return (
        <React.Fragment>
            {previewItem
                ? <ItemPage menuId={menuId} closePopup={addItemInMenu} id={previewItem} />
                : <div className='container'>
                    <ItemsList setItemList = {setItemList} closePreview = {closePreview} itemList={itemList} previewItem={setPreviewItem} id={menuId} />
                </div>
            }
        </React.Fragment>
    )
}

export default Items