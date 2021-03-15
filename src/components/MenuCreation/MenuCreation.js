import React, { useContext, useEffect, useState, useRef } from 'react'
import Context from '../../Context'
import useFetch from '../../hooks/useFetch'
import MenuItem from './MenuItem/MenuItem'
import MenuSettingButton from './MenuSettingButton/MenuSettingButton'
import LoadingLogo from '../SiteHeader/loadingLogo/LoadingLogo'
import { NavLink } from 'react-router-dom'
import NewMenuItem from './NewMenuItem/NewMenuItem';
import { getUrlParams } from '../../scripts/Common'
import styled from 'styled-components';
import './menuCreation.css'
import './newMenuCreation.css';
import MobileMenuIcon from './../../UI/MobileMenuIcon/MobileMenuIcon';


const MenuCreation = ({ menuIsClose, changeViewMenu }) => {
    const rootMenuContainer = useRef();
    const {state, changeState, setState, catalogId, setVidjetData, vidjetData, decktopMode, setDecktopMode, setUrlCatalogId, mobileMode} = useContext(Context)
    const [response, doFetch] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=delete_menu_item')
    const [resp, doFetchCreate] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=create_menu_item')
    const [respEditText, doFetchEditText] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=update_menu_item')
    const [enterName, setEnterName] = useState(false)
    const [direction, setDirection] = useState(state.menuDirection)
    const apiKey = 'api_key=mwshe2txo5nlz5dw6mvflji7y0srqyrn2l04l99v--tb3ys30i7m9bis2t0aoczw2a280e2e2ddedf8fe9acfe5625949396';

    const [menuBackgroundBlock, setMenuBackgroundBlock] = useState(state.menu_settings.background_menu_block || '#fff')
    const newCatalogId = getUrlParams()['id'] || 0;

    const changeMenuBackgroundBlock = (colorState = null) => {
        console.log('arbaiten', colorState)
        if(!colorState) return;
        let fd = new FormData();
        fd.set('background_menu_block', colorState.hex.replace('#', ''))
        fd.set('catalog_id', newCatalogId);

        fetch('https://cloudsgoods.com/api/CatalogController.php?mode=menu_settings_background_menu_block&' + apiKey, {
            method: 'POST',
            body: fd
        })
        .then(resp => resp.json())
        .then(json => {
            if(json.success && json.success != 'false') {
                setMenuBackgroundBlock('#'+json.data.background_menu_block)
            }
        })
    }

    const menuSetting = {
        fontFamily: state.menu_settings.font_family,
        fontSize: state.menu_settings.font_size + 'px'
    }
    console.log('state', state)

    const menuFontFamily = state.menu_settings.font_family
    const wrapperClasses = ['wrapper', 'd-flex', 'container-menu']

    if (state.menuDirection == 2) {
        wrapperClasses.push('menu-vertical')
    }

    const classes = ['menu-creation-container container  ']
    if (!menuIsClose) {
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

    const addNewMenu = (text = '', parentId = 0) => {
        console.log('addNewMenu', text, parentId)
        const NFD = new FormData()
        NFD.set('parent_id', parentId || '0')
        NFD.set('catalog_id', newCatalogId)
        NFD.set('text', text)

        fetch(`https://cloudsgoods.com/api/CatalogController.php?mode=create_menu_item&${apiKey}`, { method: 'post', body: NFD })
            .then(resp => resp.json())
            .then(json => {
                if (json.success && json.success != 'false') {
                    // let newMenu = [...state.catalog_menu];
                    let newMenu = state.siteMenu;
                    let newData = {
                        catalog_id: newCatalogId,
                        deleted: "0",
                        href: null,
                        id: json.id,
                        isRead: true,
                        parent_id: parentId,
                        text: json.text,
                        childrenList: []
                    }
                    function searchMenu(arr = []) {
                        arr.map((el, i) => {
                            if (el.id == parentId) {
                                el.childrenList.push(newData)
                            } else if (el.childrenList.length) {
                                searchMenu(el.childrenList)
                            }
                        })
                    }
                    if (parentId == 0) {
                        newMenu.push(newData)
                    } else {
                        searchMenu(newMenu);
                    }

                    console.log('newMenu', newMenu)
                    changeState({ 'siteMenu': newMenu })

                }
            })
    }

    /**
     * NEW MENU 
     * @returns 
    */

    const StyledMenu = styled.div`
           font-size: ${state.menu_settings.font_size + 'px' || '12px'};
           font-family: ${state.menu_settings.font_family || 'Montserrat'};
           @media(max-width: 562px) {
               width: 100%;
               & .new-menu-items {
                    border-radius: 0px;
                    ${'' /* border-left: 0;
                    border-right: 0; */}
                     a, button {
                        padding-top: 5px;
                        padding-bottom: 5px;
                    }
                    .new-menu-items-toggler {
                        font-size: 20px;
                    }
               } 
           }
           button{
                    color: inherit;
                    background-color: inherit;
                    width: 100%;
                    &:hover {
                        text-decoration: none;
                    }
                }
           & .new-menu-items  {
               &:hover{
                   svg {
                    color: #${state.menu_settings.with_allocation_font_color || '254768'};
                   }
                   background: #${state.menu_settings.with_allocation_background_color || 'fff'};
                   color: #${state.menu_settings.with_allocation_font_color || '254768'};
               }
                background: #${state.menu_settings.without_allocation_background_color || 'fff'};
                color: #${state.menu_settings.without_allocation_font_color || '254768'};

                & a, button{
                    color: inherit;
                    background-color: inherit;
                    width: 100%;
                    &:hover {
                        text-decoration: none;
                    }
                }
           }
           .new-menu-items-toggler {
                font-size: 16px;
            }
           svg {
            color: #${state.menu_settings.without_allocation_font_color || '254768'};
            &:hover{
                color: #${state.menu_settings.with_allocation_font_color || '254768'};
            }
           }
        `;

    const StyledMenuBlock = styled.div`
        background-color: #${menuBackgroundBlock} 
    `;
    const NewDrawMenu = ({ childrenList, lvl = 1, parentArray = [{id: 0, text: 'Главная'}] }) => {
        
        let parId = 0
        
        return (
            <React.Fragment>
                {childrenList.map((el, i) => {
                    parId = el.parent_id
                    return (
                        <StyledMenu>
                            <ul className="new-menu-list" key={el.id} >
                                <NewMenuItem
                                    isMobileMenuView={menuIsClose}
                                    text={el.text}
                                    id={el.id}
                                    menuDeletter={deletItem}
                                    parentId={el.parent_id}
                                    changeState={changeState}
                                    apiKey={apiKey}
                                    lvl={lvl}
                                    parentArray={parentArray}
                                    isAddNew={lvl <= 3}
                                    childrenList={el.childrenList}
                                    togglerMobileMenu={changeViewMenu}
                                    content={el.childrenList.length ? <NewDrawMenu lvl={lvl + 1} childrenList={el.childrenList}  parentArray={parentArray.concat([{id: el.id, text: el.text}])}/> : (decktopMode && <button className="new-menu-btn-add new-menu-items" type="button" onClick={() => addNewMenu('Новый подкатегория', (el.id))}>Добавить подкатегорию</button>)}
                                />
                            </ul>
                        </StyledMenu>
                        
                    )
                    
                })}
                {
                    decktopMode && <button className="new-menu-btn-add new-menu-items" type="button" onClick={() => addNewMenu('Новая категория', parId)}>Добавить категорию</button>
                }

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
        formData.set('catalog_id', newCatalogId)
        formData.set('text', value)
        doFetchEditText(formData)
        console.log(value, id)
    }

    const deletItem = (id) => {
        const newList = [...state.siteMenu]
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
        formData.set('catalog_id', newCatalogId)
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
            // const siteMenu = [...state.catalog_menu, { id:[resp.id], catalog_id:[resp.catalog_id],  parentId:[resp.parent_id],text: 'Новый раздел',  childrenList: [] }]
        }
    }, [respEditText])

    const addMenuItemHandler = (text = 'Новый раздел', parent_id = 0) => {

        const formData = new FormData()
        formData.set('parent_id', parent_id)
        formData.set('catalog_id', newCatalogId)
        formData.set('text', text)

        doFetchCreate(formData)
    }


    
    return (

        <div className={classes.join(' ')} ref={rootMenuContainer} style ={{'background': menuBackgroundBlock}}>
                {decktopMode &&
                    <MenuSettingButton 
                    state={state}
                    callBack={changeMenuBackgroundBlock}
                    // callBack={() => console.log('vasy')}
                     />
                }

                {state.menuDirection == 2 ? <LoadingLogo /> : null}

                <div className={decktopMode ? 'new-menu-container pb-3 pt-5' : 'new-menu-container pb-3'}>
                    <div className="menu-hamburger">
                        <MobileMenuIcon 
                        menuIsClose={menuIsClose} 
                        changeViewMenu={changeViewMenu} />
                    </div>
                    <div className="new-menu">
                        <StyledMenu>
                            <ul className='new-menu-list'>
                                <li>
                                    <div className="new-menu-items">
                                        <NavLink
                                            className='menu-link'
                                            to={`/work/user/site-creator/index.php/?id=${newCatalogId}`}
                                            onClick={() => changeViewMenu(true)}
                                        >
                                            Главная
                                        </NavLink>
                                    </div>
                                </li>
                            </ul>
                        </StyledMenu>
                        <NewDrawMenu childrenList={state.siteMenu}  />
                    </div>
                </div>
        </div>

    )
}
export default MenuCreation