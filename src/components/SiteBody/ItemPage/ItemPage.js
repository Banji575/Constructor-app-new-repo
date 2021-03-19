import React, { useEffect, useContext, useState } from 'react'
import useFetch from '../../../hooks/useFetch'
import { Tabs, Tab } from 'react-bootstrap'
import WidjetWrapper from '../../../UI/VidjetVrapper/WidjetWrapper'
import Context from '../../../Context'
import './itemPage.css'
import SiteLogo from '../../../UI/SiteLogo/SiteLogo'
import logo from '../../../../src/image/newLogoDecktop.png'
import EditBackground from '../../SiteHeader/TextEditorPanel/EditBackground/EditBackground'
import EditItemPages from './EditItemPages/EditItemPages'
import PopUp from '../../../UI/PopUp/PopUp'
import ItemCardSetting from './ItemCard/ItemCardSetting'
import PreviewFile from './PreviewFile/PrewiewFile'
import Utils from '../../../scripts/Utils'
import ViewSetting from '../../ViewSetting/ViewSetting'
import DocumentLink from '../../../UI/DocumentLink/DocumentLink'
/* import Tabs from '../../../UI/Tabs/Tabs' */
const createPropsList = (list = []) => {
    const newArr = []
    list.forEach((el, i) => {
        if (el.type === 'select') {
            const value = el.list.find((elem) => elem.id === el.value)
            const obj = { [el.title]: value.value }
            newArr.push(obj)
        }
        if (el.type === 'text') {
            const obj = { [el.title]: el.value }
            newArr.push(obj)
        }
    })
    console.log(newArr)
    return newArr
}

const ItemPage = ({ id, closePopup, menuId }) => {
    console.log('id', id, menuId)
    const { state, changeState, setState, catalogId } = useContext(Context)
    const [resp, doFetch] = useFetch(`https://cloudsgoods.com/api/ObjectController.php?mode=get_objects_props_data&object_id=${id}`)
    const [resWithoutCat, doFetchWithoutCat] = useFetch(`https://cloudsgoods.com/api/CatalogController.php?mode=get_catalog_objects_by_ids&catalog_id=${catalogId}&catalog_object_ids[]=${id}`)
    /* const [respPhotoArr, doFetchItemPhoto] = useFetch(`https://cloudsgoods.com/api/CatalogController.php?mode=get_catalog_objects_by_ids&catalog_id=${catalogId}&catalog_object_ids[]=${id}`) */
    const [respPhotoArr, doFetchItemPhoto] = useFetch(`https://cloudsgoods.com/api/ObjectController.php?mode=get_object_by_id&id=${id}`)
    /*   const [respWithoutCat, doFetchWithoutCat] = useFetch(`https://cloudsgoods.com/api/ObjectController.php?mode=get_objects_props_data&object_id=${id}`) */
    const [respAddItem, doFetchAddItem] = useFetch(`https://cloudsgoods.com/api/CatalogController.php?mode=add_model_to_catalog`)
    const [itemProps, setItemProps] = useState(null)
    const [editMode, setEditMode] = useState(false)
    const [itemDesc, setItemDesc] = useState(null)
    const [activeImg, setActiveImg] = useState(null)
    const [alterContent, setAlterContent] = useState(null)
    const addItemOnMenu = () => {
        console.log('add item in menu', id)
        const formData = new FormData()
        formData.set('catalog_id', catalogId)
        formData.set('menu_id', menuId)
        formData.set('object_id', id)
        formData.set('catalog_object_id', 0)
        doFetchAddItem(formData)
    }

    useEffect(() => {
        doFetch()
    }, [])

    useEffect(() => {
        if (!resp) return
        if (resp.error) {
            doFetchWithoutCat()
        }
        console.log(resp)
        setItemProps(createPropsList(resp.objects_props))
        doFetchItemPhoto()
    }, [resp])

    useEffect(() => {
        if (!respAddItem) return
        closePopup()
    }, [respAddItem])


    useEffect(() => {
        if (!resWithoutCat) return
        console.log(id, resWithoutCat)

    }, [resWithoutCat])

    useEffect(() => {
        if (!respPhotoArr) return
        console.log(id, respPhotoArr)
        setItemDesc(respPhotoArr.data)
        setAlterContent(respPhotoArr.data.photo_web_path)
        setActiveImg(respPhotoArr.data.image)
    }, [respPhotoArr])

    const delHandler = () => {
        console.log('delHandler')
    }

    const saveList = () => {
        console.log('save list')
    }

    

    return (
        itemDesc && activeImg ?
            <div className='item-page-conteiner'>
                <div className='d-flex item-page-header position-relative'>
                    <SiteLogo img={logo} link={'https://cloudsgoods.com/'} />
                    <div className='d-flex justify-content-sm-end justify-content-md-start item-page-add-button-block'>
                        <div className='add-item-button' onClick={() => addItemOnMenu()} ><p className='items-header-button add-button mb-0 mt-3'>Добавить товар</p></div>
                        <div className='cancel-add-button' onClick={() => { closePopup(null) }} ><p className='items-header-button cancel-button mb-0 mt-3'>Отмена</p></div>
                    </div>
                </div>
                <div className='container  position-relative'>
                    <EditItemPages editMode={setEditMode} isAbsolute={false} />
                    <div className=' d-flex item-page-container-img mt-3 justify-content-center position-padding  position-relative'>
                        <img className='m-x-auto image-position' src={activeImg} />
                    </div>
                    {alterContent ? <PreviewFile activeImg={activeImg} changeImg={setActiveImg} imgArr={alterContent} /> : null}
                    <div className='item-pages-title mb-3'> {itemDesc.title}</div>
                    <p className='item-pages-price mb-5'>Цена: {itemDesc.price}Р</p>
                    <p className='mb-5'><a className='no-items-link'>Текст ссылки производителя</a></p>
                    {state.viewItemsMode === 'linear' ?
                        <React.Fragment>
                            <div className='item-page-item-header mb-3'>Описание</div>
                            <p>
                            {itemDesc.description ?
                            Utils.createHTML(itemDesc.description)
                            : <p>Нет характеристик</p>
                                
                        }
                            </p>
                            <div className='item-page-item-header mb-3'>Характеристика</div>
                            <div className='item-page-propserties-container'>
                                {   itemProps.length != 0
                                    ? itemProps.map(el => {
                                        const props = Object.keys(el)[0]
                                        return (
                                            <div className='d-flex'>
                                                <p className='item-page-props-title'>{props}</p>
                                                <p className='item-page-props-desc'>{el[props]}</p>
                                            </div>
                                        )
                                    }) : <p>Нет характеристик</p>}
                            </div>
                            <div className='item-page-item-header mb-3'>Документы</div>
                            <div className='item-page-propserties-container d-flex'>
                                {itemDesc.documents ?
                                    itemDesc.documents.map((el, i) => {
                                        return <DocumentLink type={el} linkNum={i} />
                                    }) :
                                    <p>Нет документов</p>
                                }
                            </div>
                        </React.Fragment> :
                        <Tabs className='tabs-style' defaultActiveKey="profile" id="uncontrolled-tab-example">
                            <Tab eventKey="home" title="Описание">
                                <p className='mt-3'>
                                    {Utils.createHTML(itemDesc.description)}
                                </p>
                            </Tab>
                            <Tab eventKey="profile" title="Характеристики">
                                <div className='item-page-propserties-container'>
                                    {itemProps && itemProps.map(el => {
                                        const props = Object.keys(el)[0]
                                        return (
                                            <div className='d-flex mt-3'>
                                                <p className='item-page-props-title'>{props}</p>
                                                <p className='item-page-props-desc'>{el[props]}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </Tab>
                            <Tab eventKey="contact" title="Документы" >
                                <div className='d-flex mt-3'>

                                    {itemDesc.documents ?
                                        itemDesc.documents.map((el, i) => {
                                            return <DocumentLink type={el} linkNum={i} />
                                        }) :
                                        <p>Нет документов</p>
                                    }
                                    {/* {<a href = {`https://cloudsgoods.com/api/actionsAdmin.php?mode=object_download_document&object_id=4986&key_file=${i}`}> itemDesc.documents[0]</a>} */}
                                </div>
                            </Tab>
                        </Tabs>
                    }
                </div>
                {editMode ? <ItemCardSetting closePopup={setEditMode} itemSettings={{ price: itemDesc.price, id }} /> : null}
            </div>
            : null
    )
}
export default ItemPage

