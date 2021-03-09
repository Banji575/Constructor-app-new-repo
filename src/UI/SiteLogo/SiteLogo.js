import React from 'react'
import './siteLogo.css'

const SiteLogo = ({ img, link }) => {
    return (
        <div className = 'site-logo'>
            <a href={link}><img src={img} alt={link} /></a>
        </div>
    )
}
export default SiteLogo