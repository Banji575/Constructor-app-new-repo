import React from 'react'
import cartTemplate1 from '../../../../image/itemCard.jpg'
import cartTemplate2 from '../../../../image/itemCard2.jpg'
import './itemCard.css'

const ItemCardSetting = () => {
    return (
        <React.Fragment>
            <div className='menu-setting-direction border-bottom-dashed'>
                <h3 class="question-item-header my-3">Отображение карточки товара</h3>
                <div className='no-items-block-conteiner-title w-100'>Настройки отображения будут применены ко всем товарам на сайте</div>
                <div className='d-flex pb-3 justify-content-center'>
                    <div>
                        <img src={cartTemplate1} alt="" />
                    </div>
                    <div>
                        <img src={cartTemplate2} alt="" />
                    </div>
                </div>
            </div>
            <div className='menu-setting-direction'>
                <h3 class="question-item-header my-3">Ссылка WhatsApp</h3>
                <div className='no-items-block-conteiner-title w-100'>Ссылка на WhatsApp будет применена ко всем товарам на сайте</div>
                <div className='d-flex pb-3 mt-3 flex-column'>
                    <div className = 'd-flex'>
                        <select className='phone-code-input'>
                            <option value="+7">+7</option>
                        </select>
                        <input className='input-text w-50' type='number' />
                    </div>
                    <div className='w-100 mt-3'>
                        <textarea className='input-text w-100' placeholder ='текст для автоматической подстановки в первое сообщение в WhatsApp' />
                        <p className = 'optionField'>*Не обязательное поле</p>
                    </div>

                </div>
            </div>
            <div className='menu-setting-direction border-bottom-dashed'>
                <h3 class="pop-up-header my-3">Дополнительная настройка товара</h3>
            </div>
        </React.Fragment>
    )
}
export default ItemCardSetting