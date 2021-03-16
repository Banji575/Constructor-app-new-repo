import React, { useContext } from 'react'
import InputColor from 'react-input-color'
import Context from '../../../../../Context'
import {fontsList} from '../../../../../scripts/SettingList'
import {fontSizeList} from '../../../../../scripts/SettingList'


const MenuNavChain = ({changeSetting}) => {
    const {state} = useContext(Context)

    const saveMenuHandler = (propsName, value) => {
        
        changeSetting(state => ({
            ...state,
            [propsName]:value
        }))
    }

    return (
        <div className='menu-setting-nav-chain'>
            <div className="block-menu-header">
                <h3>Навигационная цепочка</h3>
            </div>
            <div className='menu-setting-font d-flex'>
                <div className='w-50'>
                    <h3 class="question-item-header my-3">Шрифт</h3>
                    <select onChange ={(evt)=>saveMenuHandler('breadCrumbsFontFamily',evt.target.value)}>
                    {fontsList.map((el,i)=>{
                            return <option selected = {el == state.bread_crumbs_settings.font_family} key = {i} value = {el}>{el}</option>
                        })}
                    </select>
                </div>
                <div className='w-50'>
                    <h3 class="question-item-header my-3">Размер шрифта</h3>
                    <select onChange ={(evt)=>saveMenuHandler('breadCrumbsFontSize',evt.target.value)}>
                        {fontSizeList.map((el,i)=>{
                            return <option selected = {el == state.bread_crumbs_settings.font_size} key = {i} value = {el}>{el}</option>
                        })}
                    </select>
                </div>
            </div>
            <h3 class="question-item-header my-3">Цвет шрифта</h3>
            <div className='d-flex'>
                <div className='d-flex w-50'>
                    <InputColor
                        className='input-color-widjet mr-3'
                        initialValue={'#' + state.bread_crumbs_settings.without_allocation_font_color}
                            onChange={(evt)=>saveMenuHandler('breadCrumbsWithoutAllFontColor',evt.hex.replace(/['#']/,''))}
                        placement="right"
                    />
                    <p className='direction-label'>Без выделения</p>
                </div>
                <div class='d-flex'>
                    <InputColor
                        className='input-color-widjet mr-3'
                        initialValue={'#' + state.bread_crumbs_settings.with_allocation_font_color}
                        onChange={(evt)=>saveMenuHandler('breadCrumbsWithAllFontColor',evt.hex.replace(/['#']/,''))}
                        placement="right"
                    />
                    <p className='direction-label'>При выделении</p>
                </div>
            </div>
        </div>
    )
}

export default MenuNavChain;