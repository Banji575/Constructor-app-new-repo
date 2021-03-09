import React, { useEffect, useRef, useState, useContext } from 'react'
import MenuItemList from '../../../UI/MenuItemList/MenuItemList'
import MenuItemNameInput from '../MenuItemNameInput/MenuItemNameInput'
import './NewMenuItem.css'
import useFetch from '../../../hooks/useFetch'
import Context from '../../../Context'
import { NavLink } from 'react-router-dom'
import Utils from '../../../scripts/Utils'
import MenuItemOption from './../MenuItem/menuItemOption/MenuItemOptions';
const NewMenuItem = ({ children, isList, data, deletItem, editItem, id, menuSetting, content }) => {
    const root = useRef()
    const [shoeOpion, setShowOption] = useState(false)
    const [showInput, setShowInput] = useState(false)
    const [inputItemText, setItemText] = useState('')
    const [showPointList, setShowPointList] = useState(false)
    const [state, changeState, setState, calalogId, setVidjetData, vidjetData, decktopMode, setDecktopMode,setUrlCatalogId] = useContext(Context)
    const [resp, doFetchCreate] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=create_menu_item')
    const [respNewMenuList, doFetchRestNewMenuList] = useFetch(`https://cloudsgoods.com/api/CatalogController.php?mode=get_catalog&catalog_id=${calalogId}`)
    const [enterName, setEnterName] = useState(false)


    const changeCatalogId = (evt) => {
        console.log('click evt',evt.target)
        if(evt.target.getAttribute ('data-type') === 'menuLink'){
            setUrlCatalogId(data.id)
        }    
    }

    return (
        <li className="id">
            <NavLink onClick = {(evt)=>changeCatalogId(evt)} to={`/items?id=${calalogId}&menu_id=${data.id}`}>
                 {content}
            </NavLink>
        </li>
    )
}

export default NewMenuItem;