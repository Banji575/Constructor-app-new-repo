import React from 'react'
import './noItemComponent.css'
const NoItemComponent = () =>{
    return (
        <div>
            <p className = 'no-item-header'>У вас нет товаров на сервисе</p>
            <p>Для того что-бы разместить товары в каталоге нужно добавить модель на сервис в пункте <span><a href = 'https://cloudsgoods.com/work/user/add-new-objects.php' className = 'no-items-link' >ЗАГРУЗИТЬ ТОВАРЫ</a></span></p>
        </div>
    )
}

export default NoItemComponent