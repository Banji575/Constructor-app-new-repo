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
import { getUrlParams } from '../../../scripts/Common'


const NewMenuItem = ({parentArray, isMobileMenuView, togglerMobileMenu, childrenList, lvl, text, id, content, isRead = false, apiKey = '', menuDeletter, parentId }) => {

    const [showReadPopap, setShowReadPopap] = useState(false)
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const [menuText, setMenuText] = useState(text)
    const [isReadMenu, setIsReadMenu] = useState(isRead)
    const [isActiveMenu, setActiveMenu] = useState(false)
    const [childrenMenu, setChildrenMenu] = useState(childrenList)

    const root = useRef()
    const rootMenu = useRef()
    const rootReadMenu = useRef()
    const {state, changeState, catalogId, decktopMode, setUrlCatalogId} = useContext(Context)

    const newCatalogId = getUrlParams()['id'] || 0;
    // read text menu
    const submitFormRead = e => {
        e.preventDefault();
        let fd = new FormData(e.target)
        fetch(`https://cloudsgoods.com/api/CatalogController.php?mode=update_menu_item&${apiKey}`, { method: 'POST', body: fd })
            .then(resp => resp.json())
            .then(json => {
                console.log(json)
                let value = json.text;
                if (json.success && json.success != 'false') {
                    setMenuText(json.text)
                    setIsReadMenu(false)
                    const newList = [...state.siteMenu]
                    const findEl = (arr, currentId) => {
                        arr.forEach((elem, i, array) => {
                            if (elem.id == currentId) {
                                elem.text = value
                                changeState({ siteMenu: newList })
                            } else {
                                findEl(elem.childrenList, currentId)
                            }
                        })
                    }
                    findEl(newList, id)
                }
            })
    }

    //delete Menu
    const deleteMenu = () => {
        let a = window.confirm("Вы уверены, что хотите удалить категорию? Будут удалены все связанные товары и подкатегории!");
        if (a) {
            menuDeletter(id)
        }
    }

    // toggle form read menu 
    useEffect(() => {
        const onClick = e => {
            if (!isReadMenu) return;
            return rootReadMenu.current.contains(e.target) || setIsReadMenu(false);
        }
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, [isReadMenu]);

    // toggle level menu
    useEffect(() => {
        const onClick = e => {
            if (!rootMenu.current) return;
            return rootMenu.current.contains(e.target) || setIsOpenMenu(false);
        }
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, [isOpenMenu])

    // toggle popap read
    useEffect(() => {
        const onClick = e => {
            if (!root.current) return;
            return root.current.contains(e.target) || setShowReadPopap(false);
        }

        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, [showReadPopap])

    const changeCatalogId = (evt) => {
        setUrlCatalogId(id)
        togglerMobileMenu(true)
        console.log('parentArray', parentArray)
    }

    return (
        <li data-id={id} className={isActiveMenu ? 'active-new-menu-items' : ''} ref={rootMenu}>
            <div className={'new-menu-items ' + (lvl >= 3 ? ' pl-1 ' : '') + (isReadMenu ? 'd-none' : '') + (isOpenMenu ? ' open' : '')}>
                {(lvl < 3 && content) &&
                    <div className="new-menu-items-toggler" onClick={() => setIsOpenMenu(!isOpenMenu)}>
                        <FontAwesomeIcon icon={isOpenMenu ? faMinusCircle : faPlusCircle} />
                    </div>
                }

                <NavLink onClick={(evt) => changeCatalogId(evt)} to={`/items?id=${catalogId}&menu_id=${id}`} className={"overflow-hidden"}>
                    {menuText}
                </NavLink>
                {decktopMode &&
                    <div className="new-menu-items-read-btn" role="button" ref={root} onClick={() => setShowReadPopap(!showReadPopap)}>
                        <FontAwesomeIcon icon={faEllipsisH} />
                    </div>
                }

                {(content && lvl < 3) &&
                    <div className="new-menu-items-children">
                        {content}
                    </div>}

                {showReadPopap && <div className="new-menu-items-read-popap">
                    <div className="new-menu-items-read-popap__items text-danger" role="button" onClick={() => deleteMenu()}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </div>
                    <div className="new-menu-items-read-popap__items " role="button" onClick={() => setIsReadMenu(true)}>
                        <FontAwesomeIcon icon={faEdit} />
                    </div>
                </div>}
            </div>
            {isReadMenu &&
                <form className="input-group input-group-sm " onSubmit={submitFormRead} ref={rootReadMenu}>
                    <input type="text"  name="menu_id" defaultValue={id} hidden />
                    <input type="text" autoFocus={true} name="text" class="form-control" placeholder="Название" aria-label="Название" aria-describedby="basic-addon2" defaultValue={menuText} />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="submit" >Ок</button>
                    </div>
                </form>
            }
        </li>


    )
}

export default NewMenuItem;