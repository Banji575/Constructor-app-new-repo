import React, { useState } from 'react'
import './menuAddButton.css'
const MenuAddButton = () => {
    const [isEdit, setIsEdit] = useState(false)
    return (
        <button className = 'add-menu-item'>Добавить раздел</button>
    )
}