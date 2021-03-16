import React, { useContext, useState } from 'react'
import MainSettingItem from './MainSettingItem/MainSettingItem'
import OptionSettingItem from './OptionSettingItem/OptionSettingItem'
import './itemCard.css'
import Context from '../../../../Context'
import PopUp from '../../../../UI/PopUp/PopUp'



const ItemCardSetting = ({ itemSettings ,closePopup}) => {
    console.log(itemSettings)
    const [state, changeState, setState, catalogId, setVidjetData, vidjetData, decktopMode, setDecktopMode, setUrlCatalogId, mobileMode] = useContext(Context)
    const [viewItemsMode, setViewItemsMode] = useState(state.viewItemsMode)
    const [whatsAppLink, setWhatsAppLink] = useState('')
    const [whatsAppText, setWhatsAppText] = useState('')
    const [isShowWhatsApp, setIsShowWhatsApp] = useState(true)
    const [itemPrice, setItemPrice] = useState(itemSettings.price)
    const [currency, setCurrency] = useState('')
    const [isShowPrice, setIsShowPrice] = useState('')
    const [webLink, setWebLink] = useState('')
    const [nameLink, setNameLink] = useState('')
    const [isShowWebLink, setShowWebLink] = useState('')
    
    const saveList = () =>{
        console.log('saveList')
    }

    return (
        <PopUp title="Настройки отображения товара" closePopup={() => closePopup(false)} /* saveHandler={() => saveList()} */>
            <MainSettingItem
                viewItemsMode={viewItemsMode}
                setViewItemsMode={setViewItemsMode}
                isShowWhatsApp={isShowWhatsApp}
                setIsShowWhatsApp={setIsShowWhatsApp}
            />
            <OptionSettingItem
                itemPrice={itemPrice}
                setItemPrice={setItemPrice}
            />
        </PopUp>
    )
}
export default ItemCardSetting