import React, { useContext, useEffect, useState } from 'react'
import Context from '../../Context'
import MenuItemWrapper from './MenuItemWrapper/MenuItemWrapper'
import useFetch from '../../hooks/useFetch'
import MenuItem from './MenuItem/MenuItem'
import MenuSettingButton from './MenuSettingButton/MenuSettingButton'
import './menuCreation.css'
import LoadingLogo from '../SiteHeader/loadingLogo/LoadingLogo'
import MenuItemNameInput from './MenuItemNameInput/MenuItemNameInput'
import { NavLink } from 'react-router-dom'

import NewMenuItem from './NewMenuItem/NewMenuItem';
import NewMenuToggler from './NewMenuToggler/NewMenuToggler';
import NewMenuList from './NewMenuList/NewMenuList';
import './newMenuCreation.css';


const MenuCreation = ({ menuIsView }) => {
    const [state, changeState, setState, calalogId] = useContext(Context)
    const [response, doFetch] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=delete_menu_item')
    const [resp, doFetchCreate] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=create_menu_item')
    const [respEditText, doFetchEditText] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=update_menu_item')
    const [enterName, setEnterName] = useState(false)
    const [direction, setDirection] = useState(state.menuDirection)
    console.log('state', state)

    const menuSetting = {
        fontFamily: state.menu_settings.font_family,
        fontSize: state.menu_settings.font_size + 'px'
    }

    const menuFontFamily = state.menu_settings.font_family
    const wrapperClasses = ['wrapper', 'd-flex', 'container-menu']

    if (state.menuDirection == 2) {
        wrapperClasses.push('menu-vertical')
    }

    const classes = ['menu-creation-container container d-flex ']
    if (!menuIsView) {
        classes.push('menu-creation-container---view')
    }
    const drawMenu = (data, isSub, lev) => {
        let level = lev || 0
        let children = []
        data.map((el, i) => {
            if (el.childrenList.length !== 0) {
                level += 1
                children.push(
                    <MenuItem key={i} menuSetting={menuSetting} isList={true} data={el} editItem={editItem} deletItem={deletItem}>  {drawMenu(data[i].childrenList)}</MenuItem>
                )
            } else {
                children.push(
                    <MenuItem key={i} menuSetting={menuSetting} isList={false} data={el} editItem={editItem} deletItem={deletItem}>  {drawMenu(data[i].childrenList)}</MenuItem>
                )
            }
        })
        return <div className={wrapperClasses.join(' ')}>{children}</div>;
    }

    const NewDrawMenu = ({ childrenList }) => {
        return (
            <React.Fragment>
                {childrenList.map((el, i) => {
                    return (
                        <ul className="new-menu-list" key={el.id}>

                            {/* <li className="new-menu-items" onClick={() => console.log(el.id)}>
                                <div className="new-menu-items-toggler">
                                    <FontAwesomeIcon icon={faPlusCircle} />
                                </div>
                                <div className="new-menu-items-body">
                                    {el.text}
                                </div>
                                <div className="new-menu-items-read-btn">
                                    <FontAwesomeIcon icon={faEllipsisH} />
                                </div>
                                <div className="new-menu-items-read-popap">
                                        редактировать меню
                                </div>
                                {el.childrenList.length && <NewDrawMenu childrenList={el.childrenList} />}
                            </li> */}
                            <NewMenuItem
                                text= {el.text}
                                id = {el.id}
                                
                                content = {el.childrenList.length && <NewDrawMenu childrenList={el.childrenList} />}
                            />
                        </ul>
                    )
                })}
            </React.Fragment>
        )
    }

    const editItem = (value, id) => {
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
        const formData = new FormData()
        formData.set('menu_id', id)
        formData.set('catalog_id', calalogId)
        formData.set('text', value)
        doFetchEditText(formData)
        console.log(value, id)
    }

    const deletItem = (id) => {
        console.log(id)
        const newList = [...state.siteMenu]
        console.log(newList)
        const findEl = (arr, currentId) => {
            arr.forEach((elem, i, array) => {
                if (elem.id == currentId) {
                    console.log(elem.id, currentId, array, i)
                    array.splice(i, 1)
                    changeState({ siteMenu: newList })
                } else {
                    findEl(elem.childrenList, currentId)
                }
            })
        }
        findEl(newList, id)
        const formData = new FormData()
        formData.set('menu_id', id)
        formData.set('catalog_id', calalogId)
        doFetch(formData)
    }

    useEffect(() => {
        if (!resp) return
        console.log(resp)
        if (resp) {

            const siteMenu = [...state.siteMenu, { id: [resp.id], catalog_id: [resp.catalog_id], parentId: [resp.parent_id], text: resp.text, childrenList: [] }]
            changeState({ 'siteMenu': siteMenu })
        }
    }, [resp])
    useEffect(() => {
        if (respEditText) {
            // const siteMenu = [...state.siteMenu, { id:[resp.id], catalog_id:[resp.catalog_id],  parentId:[resp.parent_id],text: 'Новый раздел',  childrenList: [] }]

        }
    }, [respEditText])

    const addMenuItemHandler = (text = 'Новый раздел', parent_id = 0) => {

        const formData = new FormData()
        formData.set('parent_id', parent_id)
        formData.set('catalog_id', calalogId)
        formData.set('text', text)

        doFetchCreate(formData)
    }
    console.log('state.siteMenu', state.siteMenu)
    return (
        <React.Fragment>
            <div className={classes.join(' ')} >
                <MenuSettingButton state={state} />
                {state.menuDirection == 2 ? <LoadingLogo /> : null}
                <p className='block-question-button-save'>
                    <NavLink
                        className='menu-link'
                        activeStyle={{ color: '#fff' }}
                        to={`/?id=${calalogId}`}
                    >Главная</NavLink>
                </p>
                {/* {drawMenu(state.siteMenu)} */}
                {/* {newDrawMenu({ childrenList: state.siteMenu })} */}
                <NewDrawMenu childrenList={state.siteMenu} />
                <div className='menu-buttons-add-new'>
                    {!enterName ?
                        <button onClick={() => setEnterName(true)} className='add-menu-item'>Добавить раздел</button>
                        : <MenuItemNameInput closeEdit={setEnterName} addNewItem={addMenuItemHandler} />}
                </div>
            </div>
        </React.Fragment>
    )
}
export default MenuCreation