import React, { useContext, useEffect, useState } from 'react'
import './menuSettingButton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import MenuSettingPopUp from './MenuSettingPopUp/MenuSettingPopUp'
import InputColor from 'react-input-color'
import PopUp from '../../../UI/PopUp/PopUp'
import EditButton from '../../../UI/EditButton/EditButton'
import Context from '../../../Context'
import useFetch from '../../../hooks/useFetch'
const MenuSettingButton = () => {
    const [isEdintText, setIsEditText] = useState(false)
    const [response, doFetch] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=update_menu_type')
    const [respMenuSettig, doFetchMenuSetting] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=menu_settings_update')
    const [respBreadCrumbs, doFetchBreadCrumbs] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=bread_crumbs_settings_update')
    const [state, changeState, setState, catalogId] = useContext(Context)
    const [siteSetting, setSiteSetting] = useState({
        direction: state.menuDirection,
        menuFontFamily: state.menu_settings.font_family,
        menuFontSize: state.menu_settings.font_size,
        menuWithAllFontColor: state.menu_settings.with_allocation_font_color,
        menuWithOutAllFontColor: state.menu_settings.without_allocation_font_color,
        menuWithAllBackColor: state.menu_settings.with_allocation_background_color,
        menuWithOutAllBackColor: state.menu_settings.without_allocation_background_color,
        breadCrumbsFontFamily: state.bread_crumbs_settings.font_family,
        breadCrumbsFontSize: state.bread_crumbs_settings.font_size,
        breadCrumbsWithAllFontColor: state.bread_crumbs_settings.with_allocation_font_color,
        breadCrumbsWithoutAllFontColor: state.bread_crumbs_settings.without_allocation_font_color
    })
    const closePopUp = () => {
        setIsEditText(s => !s)
    }

    console.log(siteSetting)

    const saveHandler = () => {
        console.log(siteSetting)
        console.log(';lasdljasdkljdsf', siteSetting.menuWithOutAllFontColor.replace(/[#]/, ''))
        const list = { ...state }
        const formData = new FormData()
        const formDataMenuSetting = new FormData()
        const formDataBreadCrumb = new FormData()

        list.menuDirection = siteSetting.direction
        list.menu_settings.font_family = siteSetting.menuFontFamily
        list.menu_settings.font_size = siteSetting.menuFontSize
        setState(list)

        formData.set('catalog_id', catalogId)
        formData.set('menu_type_id', siteSetting.direction)

        formDataMenuSetting.set('catalog_id', catalogId)
        formDataMenuSetting.set('font_family', siteSetting.menuFontFamily)
        formDataMenuSetting.set('font_size', siteSetting.menuFontSize)
        formDataMenuSetting.set('without_allocation_font_color', siteSetting.menuWithOutAllFontColor)
        formDataMenuSetting.set('with_allocation_font_color', siteSetting.menuWithAllFontColor)
        formDataMenuSetting.set("without_allocation_background_color", siteSetting.menuWithOutAllBackColor)
        formDataMenuSetting.set("with_allocation_background_color", siteSetting.menuWithAllBackColor)

        formDataBreadCrumb.set('catalog_id', catalogId)
        formDataBreadCrumb.set('font_family', siteSetting.breadCrumbsFontFamily)
        formDataBreadCrumb.set('font_size', siteSetting.breadCrumbsFontSize)
        formDataBreadCrumb.set('with_allocation_font_color', siteSetting.breadCrumbsWithAllFontColor)
        formDataBreadCrumb.set('breadCrumbsWithoutAllFontColor', siteSetting.breadCrumbsWithoutAllFontColor)

        doFetch(formData)
        doFetchMenuSetting(formDataMenuSetting)
        doFetchBreadCrumbs(formDataBreadCrumb)
    }


    useEffect(() => {
        if (!respMenuSettig) return
        console.log(respMenuSettig)
        closePopUp()
    }, [respMenuSettig])

    useEffect(() => {
        if (!response) return
        console.log(response)
    }, [response])




    return (
        <div className='create-menu-buttons container d-flex justify-content-end'>
             <div className = 'edit-background mr-3'><p className = 'edit-background-text'>Фон</p>
               <InputColor
                    className='input-color-widjet'
                    initialValue={"#5e72e4"}
                    /*  onChange={(evt)=>setBackground(evt.rgba)} */
                    placement="right"
                />
             </div>

            <div className='icon-arrow icon-arrow--shadow'>
                <EditButton isHeader={true} openEdit={() => setIsEditText(state => !state)} />
                {/*    <FontAwesomeIcon fontWeight = 'light' onClick={() => setIsEdit(state => !state)} icon={faEdit} size='2x' /> */}
            </div>
            {/*  <FontAwesomeIcon fontWeight='light' onClick={() => setIsEditText(state => !state)} icon={faEdit} size='2x' /> */}
            {isEdintText ?
                <PopUp title='Настройка меню' closePopup={closePopUp} saveHandler={saveHandler} >
                    <MenuSettingPopUp changeSetting={setSiteSetting} />
                </PopUp> : null}
        </div>
    )
}

export default MenuSettingButton