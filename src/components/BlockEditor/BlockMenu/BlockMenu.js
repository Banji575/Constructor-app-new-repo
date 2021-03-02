import MenuItem from './MenuItem/MenuItem'
import React, { useState } from 'react'
import './BlockMenu.css'


const itemsObj = [
    { text: 'Карусель картинок', src: 'carusel' },
    { text: 'Вопросы', src: 'questions' },
    { text: 'Видео', src: 'video' },
    { text: 'Текст', src: 'text' },
    { text: 'Товары', src: 'items' },
    { text: 'Баннер', src: 'banner' },
    { text: 'Таймер', src: 'timer' },
   // { text: 'Карта', src: 'map' },
    { text: 'Обратная связь', src: 'callback' },
    { text: 'Соц. сети и месседжеры', src: 'social' },
    { text: 'Контакты', src: 'contacts' },
]

const BlockMenu = ({ hideBlock ,setCurrentWidjet}) => {
    return (
        <React.Fragment>
                <div className='block-menu-listss p-3 row no-gutters mr-n3'>
                    {itemsObj.map((el, i) => {
                        return <MenuItem 
                        key={i} 
                        item={{ text: el.text, src: el.src }}  
                        setCurrentWidjet = {setCurrentWidjet} 
                        hideBlock = {hideBlock}
                        />
                    })}
                </div>
                <div>
                  {/*   <p className='block-menu-close text-right pr-3'><a onClick={() => hideBlock(true)}>Отмена</a></p> */}
                </div>
            {/* <BlockQueston/> */}
        
        </React.Fragment>
    )
}

export default BlockMenu;