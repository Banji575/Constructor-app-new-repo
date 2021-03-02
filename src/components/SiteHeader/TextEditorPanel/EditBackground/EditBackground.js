import React from 'react'
import './editBackground.css'
import ColorPicker from '../../../../UI/ColorChange/ColorPicker/ColorPicker'
import ColorSetting from '../../../ViewSetting/ColorSetting/ColorSetting'


const EditBackground = () => {
    return (
        <div className = 'edit-background mr-3'><p className = 'edit-background-text'>Фон</p> <ColorPicker className = 'input-color-widjet'  propsName='titleBackground'/></div>
    )
}

export default EditBackground