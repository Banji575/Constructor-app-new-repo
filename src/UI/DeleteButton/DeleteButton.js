import React from 'react'
import deleteIcon from '../../image/trash.png'
import './deleteButton.css'

const DeleteButton = ({onDelete}) => {
    return (
        <div  onClick = {onDelete}>
            <img className = 'delete-img' src={deleteIcon} />
        </div>
    )
}

export default DeleteButton