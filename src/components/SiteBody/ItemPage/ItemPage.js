import React, { useEffect, useContext, useState } from 'react'
import useFetch from '../../../hooks/useFetch'
import WidjetWrapper from '../../../UI/VidjetVrapper/WidjetWrapper'
import Context from '../../../Context'
import './itemPage.css'
import SiteLogo from '../../../UI/SiteLogo/SiteLogo'
import logo from '../../../../src/image/siteLogo.png'
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

const ItemPage = ({ id, closePopup }) => {
    console.log(id)
    const [state, changeState, setState, catalogId] = useContext(Context)
    const [resp, doFetch] = useFetch(`https://cloudsgoods.com/api/ObjectController.php?mode=get_objects_props_data&object_id=${id}`)
    const [resWithoutCat, doFetchWithoutCat] = useFetch(`https://cloudsgoods.com/api/CatalogController.php?mode=get_catalog_objects_by_ids&catalog_id=${catalogId}&catalog_object_ids[]=${id}`)
    /* const [respPhotoArr, doFetchItemPhoto] = useFetch(`https://cloudsgoods.com/api/CatalogController.php?mode=get_catalog_objects_by_ids&catalog_id=${catalogId}&catalog_object_ids[]=${id}`) */
    const [respPhotoArr, doFetchItemPhoto] = useFetch(`https://cloudsgoods.com/api/ObjectController.php?mode=get_object_by_id&id=${id}`)
    /*   const [respWithoutCat, doFetchWithoutCat] = useFetch(`https://cloudsgoods.com/api/ObjectController.php?mode=get_objects_props_data&object_id=${id}`) */
    const [itemProps, setItemProps] = useState(null)

    const [itemDesc, setItemDesc] = useState(null)


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
        if (!resWithoutCat) return
        console.log(id, resWithoutCat)
    }, [resWithoutCat])

    useEffect(() => {
        if (!respPhotoArr) return
        console.log(id, respPhotoArr)
        setItemDesc(respPhotoArr.data)
    }, [respPhotoArr])

    const delHandler = () => {
        console.log('delHandler')
    }

    console.log(itemDesc)
    return (
        itemDesc ?
            <div className='item-page-conteiner'>
                <div className='d-flex item-page-header justify-content-around'>
                    <SiteLogo img={logo} link={'https://cloudsgoods.com/'} />
                    <div className='d-flex justify-content-end'>
                        <div ><p className='items-header-button add-button'>Добавить товар</p></div>
                        <div onClick={() => { closePopup(null) }} ><p className='items-header-button cancel-button'>Отмена</p></div>
                    </div>
                </div>
                <div className='container '>
                    <div className=' d-flex item-page-container-img'>
                        <img className='m-0-auto' src={itemDesc.image} />
                    </div>
                    <div className='item-pages-title'> {itemDesc.title}</div>
                    <p className='item-pages-price'>Цена: {itemDesc.price}Р</p>
                    <p><a>Текст ссылки производителя</a></p>
                    <div className='item-page-propserties-container '>
                        {itemProps && itemProps.map(el => {
                            const props = Object.keys(el)[0]
                            return (
                                <div className='d-flex'>
                                    <p className='item-page-props-title'>{props}</p>
                                    <p className='item-page-props-desc'>{el[props]}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            : null
    )
}

export default ItemPage