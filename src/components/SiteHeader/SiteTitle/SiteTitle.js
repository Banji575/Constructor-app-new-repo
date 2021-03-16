import React, { useContext } from 'react'
import Context from '../../../Context'
import useFetch from '../../../hooks/useFetch'
import parse from 'html-react-parser'
import './siteTitle.css'
const createHTML = str => parse(str) || ''
const SiteTitle = () => {
    const {state = {}, changeState, _, calalogId} = useContext(Context)
    const [response, doFetch] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=update_menu_title')
    const changeText = evt => {
        const value = evt.target.value
        const formData = new FormData()
        formData.set('title', value)
        formData.set('catalog_id', calalogId)
        doFetch(formData)
    }
    const siteTitle = state.siteTitle ? state.siteTitle : 'Введите текст'
    return (
        <div className='site-title'>
            <p className = 'site-title-body'>{parse(siteTitle)}</p>
        </div>
    )
}
export default SiteTitle