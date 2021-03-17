import React from 'react'

const OptionSettingItem = ({itemPrice, setItemPrice}) => {

    return(
        <React.Fragment>
             <div className='menu-setting-direction border-bottom-dashed'>
                <h3 class="pop-up-header my-3">Дополнительная настройка товара</h3>
            </div>
            <div className='menu-setting-direction'>
                <h3 class="question-item-header my-3">Стоимость товара</h3>
                <div className='d-flex pb-3 mt-3 flex-column'>
                    <div className='d-flex mb-1'>
                        <input className='input-text w-50' type='number' onChange = {(evt)=>setItemPrice(evt.target.value)} value = {itemPrice} />
                        <select className='phone-code-input'>
                            <option value="RUB">RUB</option>
                        </select>
                    </div>
                    <div>
                        <input id='item-price' type='checkbox' className='mr-1' />
                        <label htmlFor='item-price'>Отображать стоимость</label>
                    </div>
                </div>
                <h3 class="question-item-header my-3">Ссылка на сторонний ресурс</h3>
                <div className='d-flex pb-3 mt-3 flex-column '>
                    <input className='input-text w-100 mt-3' type='text' placeholder='Текст ссылки (до 30 символов)' />
                    <input className='input-text w-100 mt-3' type='text' placeholder='Адрес ссылки для перехода' />
                </div>
                <div>
                    <input id='showLink' type='checkbox' className='mr-1' />
                    <label htmlFor='showLink'>Отображать ссылку на сторонний ресурс</label>
                </div>
            </div>
        </React.Fragment>
    )
}

export default OptionSettingItem