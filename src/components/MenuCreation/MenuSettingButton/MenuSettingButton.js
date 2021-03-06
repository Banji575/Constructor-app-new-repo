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
const MenuSettingButton = ({callBack = ()=>{} }) => {
    const [isEdintText, setIsEditText] = useState(false)
    const [response, doFetch] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=update_menu_type')
    const [respMenuSettig, doFetchMenuSetting] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=menu_settings_update')
    const [respBreadCrumbs, doFetchBreadCrumbs] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=bread_crumbs_settings_update')
    const {state, changeState, setState, catalogId} = useContext(Context)
    const [siteSetting, setSiteSetting] = useState({
        direction: state.menuDirection,
        menuBackgroundBlock: state.menu_settings.background_menu_block || 'fff',
        menuFontFamily: state.menu_settings.font_family || 'Montserrat',
        menuFontSize: state.menu_settings.font_size || '12',
        menuWithAllFontColor: state.menu_settings.with_allocation_font_color || '803dff',
        menuWithOutAllFontColor: state.menu_settings.without_allocation_font_color || '254768',
        menuWithAllBackColor: state.menu_settings.with_allocation_background_color || 'fff',
        menuWithOutAllBackColor: state.menu_settings.without_allocation_background_color || 'fff',
        breadCrumbsFontFamily: state.bread_crumbs_settings.font_family || 'Montserrat',
        breadCrumbsFontSize: state.bread_crumbs_settings.font_size || '14',
        breadCrumbsWithAllFontColor: state.bread_crumbs_settings.with_allocation_font_color || '000',
        breadCrumbsWithoutAllFontColor: state.bread_crumbs_settings.without_allocation_font_color || 'fff'
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

        list.menu_settings.with_allocation_font_color = siteSetting.menuWithAllFontColor
        list.menu_settings.without_allocation_font_color = siteSetting.menuWithOutAllFontColor
        list.menu_settings.with_allocation_background_color = siteSetting.menuWithAllBackColor
        list.menu_settings.without_allocation_background_color = siteSetting.menuWithOutAllBackColor
        

        list.bread_crumbs_settings.font_family = siteSetting.breadCrumbsFontFamily
        list.bread_crumbs_settings.font_size = siteSetting.breadCrumbsFontSize
        list.bread_crumbs_settings.with_allocation_font_color = siteSetting.breadCrumbsWithAllFontColor
        list.bread_crumbs_settings.without_allocation_font_color = siteSetting.breadCrumbsWithoutAllFontColor


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
        formDataBreadCrumb.set('with_allocation_font_color', siteSetting.breadCrumbsWithAllFontColor || '000')
        formDataBreadCrumb.set('without_allocation_font_color', siteSetting.breadCrumbsWithoutAllFontColor || '000')

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
                    initialValue={'#'+state.menu_settings.background_menu_block || '#fff'}
                    onChange={colorState => callBack(colorState)}
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