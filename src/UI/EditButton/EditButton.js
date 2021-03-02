import React from 'react'
import editIcon from '../../image/editIcon.png'
import './editButton.css'

const EditButton = ({openEdit}) => {
    return (
        <div className = 'editButton' onClick = {()=>openEdit(s=>!s)}>
            <img className = 'edite-button-img' src={editIcon} />
        </div>
    )
}

export default EditButton