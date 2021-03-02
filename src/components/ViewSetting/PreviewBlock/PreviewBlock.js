import React from 'react'
import './previewBlock.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faSave } from '@fortawesome/free-solid-svg-icons'


const PreviewBlock = ({changeViewMode}) => {
    return(
        <div className = 'preview-block'>
            <p onClick = {()=>changeViewMode()} className = '  preview-item-next  mr-sm-0 mr-md-3 pr-sm-0 pr-md-3'>Предпросмотр</p>
            {/* <p className = 'preview-item preview-item-save'>Сохранить</p>   */}       
        </div>
    )
}
export default PreviewBlock