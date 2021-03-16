import React, { useContext } from 'react'
import Context from '../../Context'
import './colorChange.css'
const ColorChange = ({ color, propsName }) => {
    const {state, changeState} = useContext(Context)
    const obj = { [propsName]: color }
    const classes = ['color-change']
    if (state[propsName] === color) {
        classes.push('active')
    }
   /*  classes.push(color) */


    return (
        <button onClick={() => changeState(obj)} className={classes.join(' ')} style = {{ backgroundColor: color}}></button>
    )
}
export default ColorChange;