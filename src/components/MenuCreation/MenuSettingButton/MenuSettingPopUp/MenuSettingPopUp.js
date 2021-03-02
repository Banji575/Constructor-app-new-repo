import React, { useState } from 'react'
import './menuSettingPopUp.css'
import InputColor from 'react-input-color'
import MenuSetting from './MenuSetting/MenuSetting'
import MenuNavChain from './MenuNavChain/MenuNavChain'

const initialMenuSettingState = {

}

const MenuSettingPopUp = ({changeSetting}) => {
    const [menuSetting, setMenuSetting] = useState({})
    return (
        <div className='menu-setting-conteiner'>
            <MenuSetting changeSetting = {changeSetting}/>
            <MenuNavChain changeSetting = {changeSetting}/>
        </div>
    )
}

export default MenuSettingPopUp