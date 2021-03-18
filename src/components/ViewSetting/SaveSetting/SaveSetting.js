import React from 'react'
import './saveSetting.css'
const SaveSetting = ({onClickHandler}) => {
    return ( 
        <div onClick = {()=>onClickHandler()} className='preview-block  preview-block-save '>
            <p className='preview-item preview-item-save'>Сохранить</p>
        </div>
    )
}

export default SaveSetting;