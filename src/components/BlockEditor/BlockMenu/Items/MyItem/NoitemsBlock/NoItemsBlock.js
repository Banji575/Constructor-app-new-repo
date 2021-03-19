import React from 'react'
import './noItemsBody.css'
import Utils from '../../../../../../scripts/Utils'

const NoItemsBlock = ({type = 'itemsBlock'}) => {
    const text = () =>{
        switch (type) {
            case 'itemsBlock': return 'Для размещения своих товаров  в раздел «Лучшие товары» вам нужно их добавить в «Главном меню» в соответствующий раздел.'
            case 'menuItems' : return Utils.createHTML(`Для добавление товаров перейдите по <a href = 'https://cloudsgoods.com/work/user/add-new-objects.php'>ссылке</a>`)
        }
    }
    return (
        <div className = 'no-items-block-conteiner'>
            <p className = 'no-items-block-conteiner-title'>У вас нет товаров в каталоге</p>
            <p className = 'no-items-block-counteiner-body' >{text()}</p>
        </div>
    )
}

export default NoItemsBlock