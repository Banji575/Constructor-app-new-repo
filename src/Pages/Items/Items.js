import React, { useEffect, useState, useContext } from 'react'
import ItemsList from '../../components/ItemsList/ItemsList'
import ItemPage from '../../components/SiteBody/ItemPage/ItemPage'
import ItemsVidjet from '../../components/SiteBody/ItemsVidjet/ItemVIdjet'
import useFetch from '../../hooks/useFetch'
import Context from '../../Context'

const Items = ({ menuId }) => {
    const [resp, doFetch] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=get_catalog_objects')
    const [state, changeState, setState, catalogId] = useContext(Context)

    useEffect(()=>{
        const formData = new FormData()
        formData.set('mode', 'get_catalog_objects')
        formData.set('catalog_id', catalogId )
        formData.set('menu_id', menuId)
        formData.set('start', 0)
        formData.set('limit', 12)
        doFetch(formData)
    },[])

    useEffect(()=>{
        if(!resp) return
        console.log(resp)
    },[resp])

    console.log(menuId)
    console.log('ItemsPages')
    const [id, setId] = useState(catalogId)
    const [previewItem, setPreviewItem] = useState(null)
    console.log('previewItem', previewItem)
    return (
        <React.Fragment>
            {previewItem
                ? <ItemPage menuId = {menuId} closePopup = {setPreviewItem} id={previewItem} />
                : <div className='container'>
                    <ItemsList previewItem={setPreviewItem} id={menuId} />
                </div>
            }
        </React.Fragment>
    )
}

export default Items