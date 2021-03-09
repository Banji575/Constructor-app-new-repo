import React, { useEffect, useRef, useState, useContext } from 'react'
import MenuItemList from '../../../UI/MenuItemList/MenuItemList'
import MenuItemNameInput from '../MenuItemNameInput/MenuItemNameInput'
import './NewMenuItem.css'
import useFetch from '../../../hooks/useFetch'
import Context from '../../../Context'
import { NavLink } from 'react-router-dom'
import Utils from '../../../scripts/Utils'
import MenuItemOption from './../MenuItem/menuItemOption/MenuItemOptions';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faEllipsisH, faMinusCircle, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'


const NewMenuItem = ({ text, id, content, isRead = false }) => {
    const [showReadPopap, setShowReadPopap] = useState(false)
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const [menuText, setMenuText] = useState(text)
    const [isReadMenu, setIsReadMenu] = useState(isRead)

    const root = useRef()
    const rootMenu = useRef()
    const rootReadMenu = useRef()
    const [state, changeState, setState, calalogId, setVidjetData, vidjetData, decktopMode, setDecktopMode, setUrlCatalogId] = useContext(Context)

    const updateMenuItems = (newText) => {
        fetch(`/api/CatalogController.php?mode=update_menu_item&menu_id=${id}&text=${newText}`)
            .then(resp => resp.json())
            .then(json => {
                console.log(json)
                if (json.success && json.success != 'false') {
                    setMenuText(json.text)
                }
            })
    }

    //toggle isReadMenu 
    useEffect(() => {
        const onClick = e => rootReadMenu.current.contains(e.target) || setIsReadMenu(false);
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, [isReadMenu])

    // toggle level menu
    useEffect(() => {
        const onClick = e => rootMenu.current.contains(e.target) || setIsOpenMenu(false);
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);

    }, [])

    // toggle popap read
    useEffect(() => {
        const onClick = e => root.current.contains(e.target) || setShowReadPopap(false);
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, [])


    return (
        <li className='' ref={rootMenu}>
            <div className={'new-menu-items ' + (isReadMenu ? 'd-none' : '') + (isOpenMenu ? ' open' : '')}>
                <div className="new-menu-items-toggler" onClick={() => setIsOpenMenu(!isOpenMenu)}>
                    <FontAwesomeIcon icon={isOpenMenu ? faMinusCircle : faPlusCircle} />
                </div>
                <NavLink to={`/items?id=${calalogId}&menu_id=${id}`}>
                    {menuText}
                </NavLink>
                <div className="new-menu-items-read-btn" ref={root} onClick={() => setShowReadPopap(!showReadPopap)}>
                    <FontAwesomeIcon icon={faEllipsisH} />
                </div>
                {content}
                {showReadPopap && <div className="new-menu-items-read-popap">
                    <div className="new-menu-items-read-popap__items text-danger" >
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </div>
                    <div className="new-menu-items-read-popap__items ">
                        <FontAwesomeIcon icon={faEdit} onClick={() => setIsReadMenu(true)} />
                    </div>
                </div>}
            </div>

            <div className={isReadMenu ? "" : "d-none"}>
                <div className="input-group mb-3 " ref={rootReadMenu}>
                    <input type="text" class="form-control" placeholder="Имя получателя" aria-label="Имя получателя" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button">Кнопка</button>
                    </div>
                </div>
            </div>

            {/* <div className="new-menu-items-toggler" onClick={() => setIsOpenMenu(!isOpenMenu)}>
                <FontAwesomeIcon icon={isOpenMenu ? faMinusCircle : faPlusCircle} />
            </div>
            <NavLink to={`/items?id=${calalogId}&menu_id=${id}`}>
                {menuText}
            </NavLink>
            <div className="new-menu-items-read-btn" ref={root} onClick={() => setShowReadPopap(!showReadPopap)}>
                <FontAwesomeIcon icon={faEllipsisH} />
            </div>
            {content}
            {showReadPopap && <div className="new-menu-items-read-popap">
                <div className="new-menu-items-read-popap__items text-danger" >
                    <FontAwesomeIcon icon={faTrashAlt} />
                </div>
                <div className="new-menu-items-read-popap__items ">
                    <FontAwesomeIcon icon={faEdit} />
                </div>
            </div>} */}
        </li>
    )
}

export default NewMenuItem;