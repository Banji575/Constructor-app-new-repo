import React, { useRef,useState,useContext } from 'react'
import Context from '../../Context'
import './itemEditMenu.css'

const ItemEditMenu = ({isShow, openEdit, delHandler,catalogObjId}) => {
    const root = useRef()
    const { state, infoModalState, setInfoModalState, changeState, setState, catalogId, setVidjetData, vidjArr, decktopMode, setDecktopMode } = useContext(Context)
    const classes = ['item-edit-wrapper']
   if(isShow){
       classes.push('item-edit-show')
   }
/*    const [infoModalState, setInfoModalState] = useState({
    isOpen: false, // Флаг отображения
    content: 'Пусто', // Видимый контент
    title: 'Пустой тайтл', // Тайтл окна
    saveButtonText: 'Сохранить', // Текст кнопки сохранить
    showFooter: true, // Флаг отображения Footera с кнопками
    onSave: (e) => console.log('Сохранено', e) // Функция, при нажатии на сохранить вид: (e) => false 
  }) */
  const openPopUpDelete = () => {
    setInfoModalState(s=>({
        ...s,
        isOpen:true,
        title:'Внимание!',
        content: 'Вы уверены, что хотите удалить товари из меню?',
        saveButtonText: 'Удалить',
        onSave: (e)=>{
            delHandler(catalogObjId)
            setTimeout(setInfoModalState(s=>({...s, isOpen:false})), 1000) 
        }
    }))
   
  }

    return (
        <div ref={root} className={classes.join(' ')}>
            <ul className='item-edit-list'>
                <li className='item-edit-item' onClick = {openEdit}>Редактировать</li>
                <li className='item-edit-item' onClick = {openPopUpDelete}>Удалить</li>
            </ul>
        </div>
    )
}

export default ItemEditMenu