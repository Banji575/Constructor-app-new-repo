import React, { useContext, useEffect, useState } from 'react'
import useFetch from '../../../hooks/useFetch'
import './itemVidjet.css'
import Context from '../../../Context'
import WidjetWrapper from '../../../UI/VidjetVrapper/WidjetWrapper'
import Utils from '../../../scripts/Utils'
import ContextEditor from '../../../ContextEditor'
import Items from '../../BlockEditor/BlockMenu/Items/Items'
import ButtonAddComponent from '../../../UI/ButtonAddComponent/ButtonAddComponent'
import { ContextAddBlock } from '../../../ContextAddBlock'

const ItemsVidjet = ({ key, body, bgColor, id, replaceVidj }) => {

const [viewEdit, setViewEdit] = useState(false)
    /*  const [response, doFetch] = useFetch('https://cloudsgoods.com/api/ObjectController.php?mode=get_objects_by_ids') */
    const {state, changeState, setState, catalogId} = useContext(Context)
    const [respDelItem, doFetchDelItem] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=delete_catalog_landing_prop_data')
    /* Массив catalog_object_id */
    const [imageArr, setImageArr] = useState(body ? body.body.itemsId : [])

    /* Массив объектов товаров */
    const [itemsArr, setItemdArr] = useState([])
    const [respGetItems, doFetchGetItem] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=get_catalog_objects_by_ids')
    const [setCurrentWidjet, setIsEditer, setVidjetData, vidjArr] = useContext(ContextEditor)
    const [background, setBackground] = useState('')
    const [blockVidjet, setlockVidjet] = useState(body.body.blockTitle)
    const {isOpenEditBlock, setIsOpenEditBlock} = useContext(ContextAddBlock)

    const delHandler = () => {
        const formData = new FormData()
        formData.set('landing_prop_id', 5)
        formData.set('catalogId', catalogId)
        formData.set('landing_prop_data_id', id)
        doFetchDelItem(formData)
    }

    useEffect(() => {
        if (!respDelItem) return
        const list = [...vidjArr]
        list.map((el, i) => {
            if (!el) return
            if (el.id === id) {
                list.splice(i, 1)
            }
        })
        setVidjetData(list)
    }, [respDelItem])

    useEffect(() => {
        const formData = new FormData()
        imageArr.forEach(el => formData.append('catalog_object_ids[]', el))
        formData.set('catalog_id', catalogId)
        doFetchGetItem(formData)
    }, [])



    /*     useEffect(() => {
            if (!response) return
            setImageArr(response.data)
            console.log(response)
        }, [response]) */

    useEffect(() => {
        if (!respGetItems) return
        setItemdArr(respGetItems.data)
    }, [respGetItems])

    return (

        <div className='questions-container' >
            <WidjetWrapper /* setBackground={setBackground} */ id={id} delHandler={delHandler} replaceVidj={replaceVidj} setBackground={setBackground} isView={viewEdit} setViewEdit={setViewEdit} editWindow={<Items setViewEdit={setViewEdit} content={{ title: 'items', id, bgColor: 'ffffff', body: body.body }} />}>
                <div className='items-vidjet'>
                    <h3 className='text-center'>{Utils.createHTML(blockVidjet)}</h3>
                    <div className='items-conteiner d-flex '>
                        {itemsArr.map((el, i) => {
                            return (
                                <div key={i} className='d-flex flex-column m-3 justify-content-between'>
                                    <div>
                                        <img src={el.default_look_preview_200} />
                                    </div>
                                    <div>
                                        <p className='items-p' >{el.price} ₽</p>
                                        <p className='items-p'> {el.title}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <ButtonAddComponent isVidjetButton = {true} onClick={() => setIsOpenEditBlock(false)}/>
            </WidjetWrapper>
            {/*   <ButtonAddComponent isVidjetButton = {true} onClick={() => setIsOpenEditBlock(false)}/> */}
        </div>
    )
}

export default ItemsVidjet;