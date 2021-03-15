import React, { useContext } from 'react'
import InputColor from 'react-input-color'
import Context from '../../../../../Context'
import Utils from '../../../../../scripts/Utils'
import {fontsList} from '../../../../../scripts/SettingList'
import {fontSizeList} from '../../../../../scripts/SettingList'

import './menuSetting.css'
const MenuSetting = ({ changeSetting }) => {
    const {state, changeState, setState, catalogId} = useContext(Context)



    const saveMenuHandler = (propsName, value) => {
        console.log(value)
        changeSetting(state => ({
            ...state,
            [propsName]: value
        }))
    }


    console.log(state.menuDirection == 2 ? true : false)
    console.log(state)

    return (
        <React.Fragment>
            <div className='menu-setting-direction border-bottom-dashed'>
                <h3 class="question-item-header my-3">Расположение</h3>
                <div className='d-flex pb-3'>
                    <div className='w-50'>
                        <input defaultChecked = {state.menuDirection == 1 ? true : false}  className='mr-3' onChange={(evt) => saveMenuHandler('direction',evt.target.value)} id='direction-label-horizontal' name='directionRadio' value='1' type='radio' />
                        <label htmlFor='direction-label-horizontal' className='direction-label'>Горизонтальное</label>
                    </div>
                    <div>
                        <input defaultChecked = {state.menuDirection == 1 ? false : true}  className='mr-3' onChange={(evt) => saveMenuHandler('direction',evt.target.value)} id='direction-label-vertical' name='directionRadio' value='2' type='radio' />
                        <label htmlFor='direction-label-vertical' className='direction-label'>Вертикальное</label>
                    </div>
                </div>
            </div>
            <div className='menu-setting-font border-bottom-dashed d-flex pb-3'>
                <div className='w-50'>
                    <h3 class="question-item-header my-3">Шрифт</h3>
                    <select onChange ={(evt)=>saveMenuHandler('menuFontFamily',evt.target.value)}>
                        {fontsList.map((el,i)=>{
                            return <option selected = {el == state.menu_settings.font_family}  key = {i} value = {el}>{el}</option>
                        })}
                    </select>
                </div>
                <div className='w-50'>
                    <h3 class="question-item-header my-3">Размер шрифта</h3>
                    <select onChange = {evt=>saveMenuHandler('menuFontSize', evt.target.value)}>
                        {fontSizeList.map((el,i)=>{
                            return <option selected = {el == state.menu_settings.font_size} key = {i} value = {el}>{el}</option>
                        })}
                    </select>
                </div>
            </div>
            <div className='menu-setting-font-color'>
                <h3 class="question-item-header my-3">Цвет шрифта</h3>
                <div className='d-flex'>
                    <div className='d-flex w-50'>
                        <InputColor
                            className='input-color-widjet mr-3'
                            initialValue={'#' + state.menu_settings.without_allocation_font_color}
                            onChange={(evt)=>saveMenuHandler('menuWithOutAllFontColor',evt.hex.replace(/['#']/,''))}
                            placement="right"
                        />
                        <p className='direction-label'>Без выделения</p>
                    </div>
                    <div class='d-flex'>
                        <InputColor
                            className='input-color-widjet mr-3'
                            initialValue={'#'+state.menu_settings.with_allocation_font_color}
                             onChange={(evt)=>saveMenuHandler('menuWithAllFontColor',evt.hex.replace(/['#']/,''))}
                            placement="right"
                        />
                        <p className='direction-label'>При выделении</p>
                    </div>
                </div>
                <h3 class="question-item-header my-3">Цвет заливки</h3>
                <div className='d-flex'>
                    <div className='d-flex w-50'>
                        <InputColor
                            className='input-color-widjet mr-3'
                            initialValue={'#' + state.menu_settings.without_allocation_background_color}
                             onChange={(evt)=>saveMenuHandler('menuWithOutAllBackColor',evt.hex.replace(/['#']/,''))}
                            placement="right"
                        />
                        <p className='direction-label'>Без выделения</p>
                    </div>
                    <div class='d-flex'>
                        <InputColor
                            className='input-color-widjet mr-3'
                            initialValue={'#' +state.menu_settings.with_allocation_background_color}
                            onChange={(evt)=>saveMenuHandler('menuWithAllBackColor',evt.hex.replace(/['#']/,''))}
                            placement="right"
                        />
                        <p className='direction-label'>При выделении</p>
                    </div>
                </div>
            </div>
        </React.Fragment>

    )
}
export default MenuSetting