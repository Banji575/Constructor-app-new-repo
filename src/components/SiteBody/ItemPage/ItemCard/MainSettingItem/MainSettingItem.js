import React from 'react'
import cartTemplate1 from '../../../../../image/itemCard.jpg'
import cartTemplate2 from '../../../../../image/itemCard2.jpg'
import './mainSettingItem.css'
const MainSettingItem = ({viewItemsMode, setViewItemsMode, isShowWhatsApp, setIsShowWhatsApp}) => {
    
    const itemViewActiveClass = 'item-view-mode-active'

    const changeViewMenu = (typeMode) =>{
        setViewItemsMode(typeMode)
    }

    return (
        <React.Fragment>
            <div className='menu-setting-direction border-bottom-dashed'>
                <h3 class="question-item-header my-3">Отображение карточки товара</h3>
                <div className='no-items-block-conteiner-title w-100'>Настройки отображения будут применены ко всем товарам на сайте</div>
                <div className='d-flex pb-3 justify-content-center mt-1 item-view-mode'>
                    <div className = {viewItemsMode === 'tabs' ? itemViewActiveClass : null}  onClick = {()=>changeViewMenu('tabs')}>
                        <img src={cartTemplate1} alt="" />
                    </div>
                    <div className = {viewItemsMode === 'linear' ? itemViewActiveClass : null} onClick = {()=>changeViewMenu('linear')}>
                        <img src={cartTemplate2} alt="" />
                    </div>
                </div>
            </div>
            <div className='menu-setting-direction'>
                <h3 class="question-item-header my-3">Ссылка WhatsApp</h3>
                <div className='no-items-block-conteiner-title w-100'>Ссылка на WhatsApp будет применена ко всем товарам на сайте</div>
                <div className='d-flex pb-3 mt-3 flex-column'>
                    <div className='d-flex'>
                        <select className='phone-code-input'>
                            <option value="+7">+7</option>
                        </select>
                        <input className='input-text w-50' type='number' />
                    </div>
                    <div className='w-100 mt-3'>
                        <textarea className='input-text w-100' placeholder='текст для автоматической подстановки в первое сообщение в WhatsApp' />
                        <p className='optionField'>*Не обязательное поле</p>
                    </div>
                    <div>
                        <input id='whatsapp-link' type='checkbox' className='mr-1' checked = {isShowWhatsApp} onChange = {()=>setIsShowWhatsApp(s=>!s)} />
                        <label htmlFor='whatsapp-link'>Отображать ссылку на WhatsApp</label>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default MainSettingItem