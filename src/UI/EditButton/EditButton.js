import React from 'react'
import editIcon from '../../image/editIcon.png'
import './editButton.css'

const EditButton = ({openEdit, isHeader = false}) => {
    const classes = ['edite-button-img']
    if(isHeader){
        classes.push('edite-button-img--header-menu')
    }
    return (
        <div className = 'editButton' onClick = {()=>openEdit(s=>!s)}>
            <img className = {classes.join(' ')} src={editIcon} />
        </div>
    )
}

export default EditButton