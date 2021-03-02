import React, { useEffect, useRef } from 'react'
import DeleteButton from '../../../../UI/DeleteButton/DeleteButton'
import EditButton from '../../../../UI/EditButton/EditButton'
import './MenuItemOptions.css'
const MenuItemOption = ({ show, setShow, deletItem, id , editItem}) => {
    const clases = ['menu-item-option-conteiner icon-menu-option']

    const root = useRef()
    const hideElem = () => {
        show = !show
    }

    const onClickHandler = () =>{
        setShow(!show)
        editItem()
    }

    useEffect(() => {
        if (!show) {
            return
        }
        const onClick = e =>  root.current.contains(e.target) || setShow(!show)
        document.addEventListener('click', onClick)
        return () => document.removeEventListener('click', onClick)
    }, [show])

    if (show) {
        clases.push('menu-option-show')
    }
    return (
        <div ref={root} className={clases.join(' ')}>
            <div className='icon-conteiner icon-conteiner--double-icon ' color='green'>
                <DeleteButton onDelete={() => deletItem(id)} />
                <EditButton openEdit={onClickHandler} />
            </div>
           {/*  <ul className='menu-item-option-list'>
                <li onClick = {onClickHandler} className='menu-item-button'>Редактировать</li>
                <li onClick={() => deletItem(id)} className='menu-item-button'>Удалить</li>
            </ul> */}
        </div>
    )
}
export default MenuItemOption;