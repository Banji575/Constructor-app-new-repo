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


const NewMenuItem = ({ arrayOpenMenu, isOpen, setArrayOpenMenu, parentArray, togglerMobileMenu, childrenList, lvl, text, id, content, isRead = false, apiKey = '', menuDeletter, parentId }) => {

    const [showReadPopap, setShowReadPopap] = useState(false)
    const [isOpenMenu, setIsOpenMenu] = useState(isOpen)
    const [menuText, setMenuText] = useState(text)
    const [isReadMenu, setIsReadMenu] = useState(isRead)
    const [isActiveMenu, setActiveMenu] = useState(false)
    const [childrenMenu, setChildrenMenu] = useState(childrenList)

    const root = useRef()
    const rootMenu = useRef()
    const rootReadMenu = useRef()
    const { state, setState, changeState, catalogId, decktopMode, setUrlCatalogId, infoModalState, setInfoModalState } = useContext(Context)

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
                                elem.isOpen = true;
                                // changeState({ siteMenu: newList })
                                setState({ ...state, siteMenu: newList });
                            } else {
                                findEl(elem.childrenList, currentId)
                            }
                        })
                    }
                    findEl(newList, id)
                    console.log('state', state)
                }
            })
    }

    //delete Menu
    const deleteMenu = () => {

        let content = 'Вы уверены, что хотите удалить пункт меню? Будут удалены все связанные товары и подпункты меню!';
        let title = 'Внимание!'
        let isOpen = true;
        let saveButtonText = 'Удалить'
        let showFooter = true;
        let onSave = () => {
            menuDeletter(id)
        };
        setInfoModalState({ ...infoModalState, showFooter, content, title, isOpen, saveButtonText, onSave })
    }

    // toggle form read menu 
    useEffect(() => {
        const onClick = e => {
            if (!isReadMenu || !rootReadMenu.current) return;
            return rootReadMenu.current.contains(e.target) || setIsReadMenu(false);
        }
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, [isReadMenu]);

    // toggle level menu
    useEffect(() => {

        const onClick = e => {
            // console.log('Сработало', arrayOpenMenu)
            if (!rootMenu.current ) return;
            console.log('rootMenu', { rootMenu: rootMenu.current.contains(e.target) })
            return rootMenu.current.contains(e.target) || toggleOpenMenu(false)
        }
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, [isOpen])

    const toggleOpenMenu = (flag) => {
        let f = typeof flag != 'undefined' ? flag : !isOpen;
        console.log('flag', f)
        let newArrayOpenMenu = [...arrayOpenMenu];
        let curIndex = newArrayOpenMenu.indexOf(id)
        if (f) {
            newArrayOpenMenu.push(id)
        } else {
            newArrayOpenMenu.splice(curIndex, 1)
        }
        console.log('arrayOpenMenu', newArrayOpenMenu)
        setArrayOpenMenu(newArrayOpenMenu)
        return
    }

    useEffect(() => {

    }, [])

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
        setArrayOpenMenu([])
        console.log('parentArray', parentArray)
    }

    return (
        <li data-id={id} className={isActiveMenu ? 'active-new-menu-items' : ''} ref={rootMenu}>
            <div className={'new-menu-items ' + (lvl >= 3 ? ' pl-1 ' : '') + (isReadMenu ? 'd-none' : '') + (isOpen ? ' open' : '')}>
                {(lvl < 3 && content) &&
                    <div className="new-menu-items-toggler" onClick={() => toggleOpenMenu()}>
                        <FontAwesomeIcon icon={isOpen ? faMinusCircle : faPlusCircle} />
                    </div>
                }

                <NavLink onClick={(evt) => changeCatalogId(evt)} to={`/work/user/site-creator/items?id=${catalogId}&menu_id=${id}`} className={"overflow-hidden"}>
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
                    <input type="text" name="menu_id" defaultValue={id} hidden />
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