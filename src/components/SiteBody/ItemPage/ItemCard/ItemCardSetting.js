import React, { useContext, useEffect, useState } from 'react'
import MainSettingItem from './MainSettingItem/MainSettingItem'
import OptionSettingItem from './OptionSettingItem/OptionSettingItem'
import './itemCard.css'
import Context from '../../../../Context'
import PopUp from '../../../../UI/PopUp/PopUp'
import useFetch from '../../../../hooks/useFetch'
const apiKey = '&api_key=mwshe2txo5nlz5dw6mvflji7y0srqyrn2l04l99v--tb3ys30i7m9bis2t0aoczw2a280e2e2ddedf8fe9acfe5625949396'


const ItemCardSetting = ({ itemSettings, closePopup/* ,whatsAppLink, setWhatsAppLink */ }) => {
    console.log(itemSettings)
    const { state, changeState, setState, catalogId } = useContext(Context)
    const [viewItemsMode, setViewItemsMode] = useState(state.viewItemsMode)
    const [whatsAppLink, setWhatsAppLink] = useState(state.settings.phone_whats_app)
    const [whatsAppText, setWhatsAppText] = useState(state.settings.text_whats_app)
    const [isShowWhatsApp, setIsShowWhatsApp] = useState(true)
    const [itemPrice, setItemPrice] = useState(itemSettings.price)
    const [currency, setCurrency] = useState('')
    const [isShowPrice, setIsShowPrice] = useState('')
    const [webLink, setWebLink] = useState('')
    const [nameLink, setNameLink] = useState('')
    const [isShowWebLink, setShowWebLink] = useState('')
    const [respWhatsApp, doFetchWhatsApp] = useFetch(`https://cloudsgoods.com/api/CatalogController.php?mode=catalog_settings_update_phone_whats_app&catalog_id=${catalogId}`)
    const [respViewMode, doFetchViewMode] = useFetch(`https://cloudsgoods.com/api/CatalogController.php?mode=catalog_settings_update_view_items_mode&catalog_id=${catalogId}`)



    const saveList = () => {
        console.log('save list')

        // меняем whatsApp
        const formDataWhatsApp = new FormData()
        formDataWhatsApp.set('phone_whats_app', `+7${whatsAppLink}`)
        formDataWhatsApp.set('text_whats_app', whatsAppText)

        //меняем viewMode
        const formDataViewMode = new FormData()
        formDataViewMode.set('view_items_mode', viewItemsMode)


        const bodyWhatsApp = {
            method: 'POST',
            body: formDataWhatsApp
        }
        const bodyViewMode = {
            method: 'POST',
            body:formDataViewMode
        }

        fetch(`https://cloudsgoods.com/api/CatalogController.php?mode=catalog_settings_update_phone_whats_app&catalog_id=${catalogId}${apiKey}`, bodyWhatsApp)
            .then(resp => {
                if (resp.status === 200) {
                    console.log(resp)
                  return fetch(`https://cloudsgoods.com/api/CatalogController.php?mode=catalog_settings_update_view_items_mode&catalog_id=${catalogId}${apiKey}`,bodyViewMode)
                }
            })
            .then(resp=>resp.json())
            .then(json=>{
                const viewItemsMode = json.data.view_items_mode
 
                setState(s=>({
                    ...s,
                    viewItemsMode
                }))
                closePopup(false)
            })
        //меняем режим отображения
    }

    useEffect(() => {
        if (!respWhatsApp) return
        console.log(respWhatsApp)
    }, [respWhatsApp])

    console.log(state)
    return (
        <PopUp title="Настройки отображения товара" closePopup={() => closePopup(false)} saveHandler={() => saveList()}>
            <MainSettingItem
                viewItemsMode={viewItemsMode}
                setViewItemsMode={setViewItemsMode}
                isShowWhatsApp={isShowWhatsApp}
                setIsShowWhatsApp={setIsShowWhatsApp}
                whatsAppLink={whatsAppLink}
                setWhatsAppLink={setWhatsAppLink}
                whatsAppText={whatsAppText}
                setWhatsAppText={setWhatsAppText}
            />
            <OptionSettingItem
                itemPrice={itemPrice}
                setItemPrice={setItemPrice}
            />
        </PopUp>
    )
}
export default ItemCardSetting