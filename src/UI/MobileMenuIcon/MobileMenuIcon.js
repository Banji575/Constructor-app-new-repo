import React, { useState } from 'react'
import './mobileMenuIcon.css'
const MobileMenuIcon = ({ changeViewMenu }) => {
    const [clicked, setClicked] = useState(false)
    const classes = ['mobileMenuIcon']
    if (clicked) {
        classes.push('mobileMenuIcon--clicked')
    }

    const openMenuHandler = () => {
        setClicked(c => !c)
        changeViewMenu(c => !c)
    }
    return (
        <div className = 'mobile-menu-wrapper'>
            <div onClick={openMenuHandler} className={classes.join(' ')}>
                
            </div>
        </div>
    )
}

export default MobileMenuIcon