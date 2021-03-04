import React, { useEffect, useRef, useState, useContext } from 'react'
import MenuItemList from '../../../UI/MenuItemList/MenuItemList'
import MenuItemNameInput from '../MenuItemNameInput/MenuItemNameInput'
import './MenuItem.css'
import MenuItemOption from './menuItemOption/MenuItemOptions'
import useFetch from '../../../hooks/useFetch'
import Context from '../../../Context'
import { NavLink } from 'react-router-dom'
import Utils from '../../../scripts/Utils'

const MenuItem = ({ children, isList, data, deletItem, editItem, id, menuSetting }) => {
    const root = useRef()
    const [shoeOpion, setShowOption] = useState(false)
    const [showInput, setShowInput] = useState(false)
    const [inputItemText, setItemText] = useState('')
    const [showPointList, setShowPointList] = useState(false)
    const [state, changeState, setState, calalogId, setVidjetData, vidjetData, decktopMode, setDecktopMode,setUrlCatalogId] = useContext(Context)
    const [resp, doFetchCreate] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=create_menu_item')
    const [respNewMenuList, doFetchRestNewMenuList] = useFetch(`https://cloudsgoods.com/api/CatalogController.php?mode=get_catalog&catalog_id=${calalogId}`)
    const [enterName, setEnterName] = useState(false)



    const addItem = () => {
        console.log('Add lkjsflasdfj;lasfjlafjladjfladjfladjsfla;sdjflkdjafsladjsfladfjs')
        const formData = new FormData()
        formData.set('parent_id', data.id)
        formData.set('catalog_id', calalogId)
        formData.set('text', 'text')
       /*  const menuObject = {catalog_id: calalogId,  } */
        doFetchCreate(formData)
    }

    useEffect(() => {
        if (!resp) return
        console.log(resp)
        doFetchRestNewMenuList()
    }, [resp])

    useEffect(()=>{
        if(!respNewMenuList) return
        console.log('resp',respNewMenuList.data.catalog_menu)
        const siteMenu = Utils.threeGenerate(respNewMenuList.data.catalog_menu)
        setState(state=>({
            ...state,
            siteMenu
        }))
        console.log('state',state)
    },[respNewMenuList])

    const editItemInput = () => {
        console.log(root.current)
        setShowInput(true)
    }

    const inputClasses = ['item-edit-text']
    if (showInput) {
        inputClasses.push('item-edit-text-show')
    }
    const editText = () => {
        setShowInput(false)
        editItem(inputItemText, data.id)
        setItemText('')
    }
    const inputChangeHandler = (evt) => {
        setItemText(evt.target.value)
    }

    const changeCatalogId = (evt) => {
        console.log('click evt',evt.target)
        if(evt.target.getAttribute ('data-type') === 'menuLink'){
            setUrlCatalogId(data.id)
        }    
    }
    /* 
        const addMenuItemHandler = (text = 'Новый раздел',parent_id = 0) => {
    
            const formData = new FormData()
            formData.set('parent_id', parent_id)
            formData.set('catalog_id', calalogId)
            formData.set('text', text)
    
            doFetchCreate(formData)
        } */

    if (isList) {
        return (
            <ul className='menu-list'>
                <NavLink onClick = {(evt)=>changeCatalogId(evt)} to={`/items?id=${calalogId}=${data.id}`}>
                    <li className='menu-item' data-type='menuLink' style={menuSetting}>{data.text}<MenuItemOption editItem={editItemInput} id={data.id} show={shoeOpion} setShow={setShowOption} deletItem={deletItem} />
                        <MenuItemList isOpen={showPointList} clickHandler={setShowPointList} />
                        <div className='menu-list-opions'  onClick={() => setShowOption(!shoeOpion)} >...</div>
                        {/* Сделать добавлятор меню использую id */}
                        <input autoFocus={true} ref={root} onBlur={editText} onChange={inputChangeHandler} placeholder={data.text} className={inputClasses.join(' ')} text />
                    </li>
                </NavLink>

                {
                    showPointList
                        ? <li><button onClick={() => addItem()} className='add-menu-item'>Добавить подраздел</button></li>
                        : null
                }

                {showPointList ? children : null}
            </ul>

        )
    } else {
        return (
            <ul className='menu-list'>
                <NavLink  onClick = {(evt)=>changeCatalogId(evt)} to={`/items?id=${calalogId}=${data.id}`}>
                    <li data-type='menuLink'  className='menu-item' style={menuSetting}>
                        <MenuItemList isOpen={showPointList} clickHandler={setShowPointList} />
                        {data.text}
                        <MenuItemOption show={shoeOpion} id={data.id} setShow={setShowOption} editItem={editItemInput} deletItem={deletItem} />
                        <div className='menu-list-opions' onClick={() => setShowOption(!shoeOpion)}>{!shoeOpion ? '...' : 'x'}</div>
                        <input autoFocus={true} ref={root} onBlur={editText} onChange={inputChangeHandler} placeholder={data.text} className={inputClasses.join(' ')} text />
                    </li>
                </NavLink>
                {
                    showPointList
                        ? <li><button onClick={() => addItem()} className='add-menu-item '>Добавить подраздел</button></li>
                        : null
                }
            </ul>
        )
    }
}
export default MenuItem