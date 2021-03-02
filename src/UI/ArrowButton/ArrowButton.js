import React from 'react'
import './arrowButton.css'
import arrowIcon from '../../image/arrowDown.png'

const ArrowButton = ({direction = '',replaceVidj,id}) => {
    const dir = direction==='up' ? 'rotate(-180deg)' : null

    return (
        <div className = 'icon-arrow' onClick = {()=>replaceVidj(direction, id)}>
            <img style = {{transform:[dir]}} src={arrowIcon} />
        </div>
    )
}

export default ArrowButton