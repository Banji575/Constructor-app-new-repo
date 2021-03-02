import React from 'react'
import './button.css'

const Button = ({ onClick, title, disabled, classes }) => {
    const nativeCkasses = ['button']
    if(classes){
        classes.forEach(el=>nativeCkasses.push(el))
    }


    return <button className = {nativeCkasses.join(' ')} disabled = {disabled}   onClick={onClick}>{title}</button>
}

export default Button