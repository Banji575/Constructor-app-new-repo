import React, { useState } from 'react'
import './mobileMenuIcon.css'
const MobileMenuIcon = ({menuIsClose, changeViewMenu }) => {
    const classes = ['mobileMenuIcon']
    if (!menuIsClose) {
        classes.push('mobileMenuIcon--clicked')
    }

    const openMenuHandler = () => {
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