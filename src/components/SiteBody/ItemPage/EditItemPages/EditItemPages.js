import React, { useContext, useEffect, useState } from 'react'
import './editItemPages.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import InputColor from 'react-input-color'
import EditButton from '../../../../UI/EditButton/EditButton'
import PopUp from '../../../../UI/PopUp/PopUp'
import MenuSettingPopUp from '../../../MenuCreation/MenuSettingButton/MenuSettingPopUp/MenuSettingPopUp'
import ColorPicker from '../../../../UI/ColorChange/ColorPicker/ColorPicker'
const EditItemPages = ({editMode, isAbsolute = true}) => {
    const classes = ['item-editor-panel']
    if(!isAbsolute) { 
        classes.push('item-editor-panel--rel mt-1')
    }
    return(
        <div className = {classes.join(' ')}>
            <div className = 'edit-background mr-3'><p className = 'edit-background-text'>Фон</p> <ColorPicker className = 'input-color-widjet'  propsName='titleBackground'/></div>
            <div className = 'edit-background edit-background--itempgaes'>
            <EditButton openEdit = {editMode}/>
            </div>
        </div>
    )
}

export default EditItemPages