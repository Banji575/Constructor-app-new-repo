import React from 'react'
import carusel from '../../../../image/carusel.png'
import banner from '../../../../image/banner.png'
import callback from '../../../../image/callback.png'
import contacts from '../../../../image/contacts.png'
import map from '../../../../image/map.png'
import items from '../../../../image/items.png'
import questions from '../../../../image/questions.png'
import social from '../../../../image/social.png'
import video from '../../../../image/video.png'
import timer from '../../../../image/timer.png'
import text from '../../../../image/text.png'
import {  FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCoffee} from '@fortawesome/free-solid-svg-icons'
import './menuItem.css'

const MenuItem = ({ item,setCurrentWidjet }) => {
    const src = () => {
        let src;
        switch (item.src) {
            case 'carusel': return src = carusel
            case 'banner': return src = banner
            case 'callback': return src = callback
            case 'contacts': return src = contacts
            case 'map': return src = map
            case 'questions': return src = questions
            case 'items': return src = items
            case 'social': return src = social
            case 'items': return src = items
            case 'timer': return src = timer
            case 'video': return src = video
            case 'text': return src = text

        }
        return src
    }
    return (
        <div onClick = {()=>setCurrentWidjet(item.src)} className='col-6 col-md-4 pr-3 pb-3'>
            <div className="block-menu-item ">
                <div className='block-menu-icon d-flex'><img className = 'w-25 mx-auto my-0' src={src()} /></div>
                <p className='block-menu-text'>{item.text}</p>
            </div>
        </div>
    )
}

export default MenuItem