import React from 'react'
import './siteBody.css'
const Body = ({state, children}) =>{
    const color = state.backgroundColor[0] === '#' ? state.backgroundColor : '#'+state.backgroundColor
    return <div className = 'site-body' style = {{backgroundColor:color}}>{children}</div>
}

export default Body;