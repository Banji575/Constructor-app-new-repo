import React from 'react'
import './noItemsBody.css'

const NoItemsBlock = () => {
    return (
        <div className = 'no-items-block-conteiner'>
            <p className = 'no-items-block-conteiner-title'>У вас нет товаров в каталоге</p>
            <p className = 'no-items-block-counteiner-body' >Для размещения своих товаров  в раздел «Лучшие товары» вам нужно их добавить в «Главном меню» в соответствующий раздел.</p>
        </div>
    )
}

export default NoItemsBlock