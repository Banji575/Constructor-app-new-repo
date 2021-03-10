import React from 'react'
import './noItemsBody.css'

const NoItemsBlock = () => {
    return (
        <div className = 'no-items-block-conteiner'>
            <p className = 'no-items-block-conteiner-title'>У вас нет товаров в каталоге</p>
            <p className = 'no-items-block-counteiner-body' >Для того что бы разместить товары в каталоге создайте раздел и добавьте туда людой ваш товар, после этого он будет доступен для добавдения на главную страницу</p>
        </div>
    )
}

export default NoItemsBlock