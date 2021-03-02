import React from 'react'
import ColorChange from '../../../UI/ColorChange/ColorChange'
import ColorPicker from '../../../UI/ColorChange/ColorPicker/ColorPicker'
import './colorSetting.css'
const ColorSetting = ({ title, leftBorder }) => {
    const name = title === 'backgroundColor' ? 'Фон сайта' : 'Фон верхнего заголовка'
    const classes = ['color-setting', 'd-flex']
    if (leftBorder) {
        classes.push('leftBorder')
    }

        
    return (
        <div className={classes.join(' ')}>
            <p onClick = {()=>console.log('as;ldfj')} className='color-setting-p'>{name}</p>
            <div className='color-setting-button'>
                {/*   <ColorChange propsName = {title} color = '#ffffff'/>
                <ColorChange propsName = {title} color = '#0000FF'/>
                <ColorChange propsName = {title} color = '#FF0000'/>
                <ColorChange propsName = {title} color = '#000000'/> */}
                <ColorPicker  propsName={title} show ={true}/>
            </div>
        </div>
    )
}
export default ColorSetting