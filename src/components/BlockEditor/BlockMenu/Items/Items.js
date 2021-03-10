import React, { useEffect, useState, useContext } from 'react'
import Button from '../../../../UI/Button/Button'
import useImageLoad from '../../../../hooks/useImageLoad'
import CKEditor from 'ckeditor4-react-advanced'
import Utils from '../../../../scripts/Utils'
import NewItem from './NewItems/NewItems'
import { faAngleUp, faAngleDown, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useFetch from '../../../../hooks/useFetch'
import Context from '../../../../Context'
import './items.css'
import MyItem from './MyItem/MyItem'
import ContextEditor from '../../../../ContextEditor'
import PopUp from '../../../../UI/PopUp/PopUp'

const generateId = () => Math.random()

const Items = ({ setViewEdit, content, vidjArray, setVidjetDataArray, id }) => {
    const [url, doLoad] = useImageLoad(null)
    const [itemsContent, setItemsContent] = useState(content ? content : { title: 'items', id: generateId(), bgColor: 'ffffff', body: { itemsId: [], blockTitle: '' } })
    const [viewPopUp, setViewPopUp] = useState(false)
    const [file, setFile] = useState(null)
    const [loadArr, setLoadArr] = useState([])
    const [state, changeState, setState, catalogId] = useContext(Context)
    const [myItemsPopup, setMyItemsPopup] = useState(false)
    const [vidjetTitle, setVidjetTitle] = useState(itemsContent.body.blockTitle)
    const [allItemsArr, setAllItemArr] = useState([])
    const [resAddData, doFetchAddItem] = useFetch(`https://cloudsgoods.com/api/actionsAdmin.php?mode=object_add_product`)
    const [resGetCatalogItem, doFetchGetCatalogItem] = useFetch(`https://cloudsgoods.com/api/CatalogController.php?mode=get_catalog_objects&catalog_id=${catalogId}&objects_all=all`)

    const [resAddVidjetItem, doFetchAddVidjetItem] = useFetch(`https://cloudsgoods.com/api/CatalogController.php?mode=set_landing_prop_data&catalog_id=${catalogId}`)
    const [resGetObjectCatalogId, doFethGetObjectCatalogId] = useFetch(`https://cloudsgoods.com/api/CatalogController.php?mode=set_landing_prop_data&catalog_id=${5033}`)

    const [setCurrentWidjet, setIsEditer, setVidjetData, vidjArr] = useContext(ContextEditor)
    const [respDelItem, doFetchDelItem] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=delete_catalog_landing_prop_data')

    console.log('loadArr', loadArr)

/* временно удаляем текущий редактироруемый и создаем новый */
const delHandler = () => {
    const formData = new FormData()
    formData.set('landing_prop_id', 5)
    formData.set('catalogId', catalogId)
    formData.set('landing_prop_data_id', content.id)
    doFetchDelItem(formData)
}

    /* При редактировании проверяем, загружены ли товары */

    useEffect(() => {
        if (!allItemsArr.length === 0) return
        if (!content) return
        const list = [...loadArr]
        console.log(content, list, allItemsArr)
        content.body.itemsId.forEach(el => {
            allItemsArr.forEach(elem => {
                if (elem.catalog_object_id == el) {
                    console.log('Нашли элемент', elem)
                    list.push({ id: el, src: elem.default_look_preview_200 })
                }
            })
        })
        setLoadArr(list)
    }, [allItemsArr])

    useEffect(() => {
        doFetchGetCatalogItem()
    }, [])

    useEffect(() => {
        if (!resGetCatalogItem) return
        console.log('GET ITEM CATALOG')
        console.log(resGetCatalogItem)

    }, [resGetCatalogItem])



    const closeWindow = () => {
        if (setViewEdit) {
            setViewEdit(false)
            return
        }
        setCurrentWidjet(null)
    }
    console.log('loadArr', loadArr)

    const delChangeItem = (el, i) => {
        const list = [...loadArr]
        list.splice(i, 1)
        setLoadArr(list)
    }

    useEffect(() => {
        if (!resGetObjectCatalogId) {
            return
        }
        console.log(resGetObjectCatalogId)
    }, [resGetObjectCatalogId])

    const saveList = () => {
        /*         console.log('savelist', loadArr)
                const formData = new FormData()
                 */
        /*    doFethGetObjectCatalogId() */

        const itemsIdArr = new Array(loadArr.length)
            .fill('')
            .map((el, i) => {
                return loadArr[i].id
            })

        const formData = new FormData()
        formData.set('catalog_id', catalogId)
        formData.set('landing_prop_id', 5)
        formData.set('title', vidjetTitle)
        if (content) {
            formData.set('landing_prop_data_id', id)

        }
        itemsIdArr.forEach(el => formData.append('catalog_object_id[]', el))
        doFetchAddVidjetItem(formData)
    }

    useEffect(() => {
        if (!resAddVidjetItem) return
        console.log(loadArr, 'loadArr')
        loadArr.forEach((el => {
            itemsContent.body.itemsId.push(el.id)
        }))
        itemsContent.id = resAddVidjetItem.landing_prop_data_id


        if (!content) {
            const list = [...vidjArray]
            itemsContent.body.blockTitle = vidjetTitle
            list.unshift(itemsContent)
            setVidjetDataArray(list)
        }else{
            delHandler()
           /*  window.location.reload() */
            console.log(vidjArr)
            const list = [...vidjArr]
            console.log(vidjArr ,content,'klhasfkdasfkjh')
        /*     list.forEach(el=>{
                if(el)
            }) */
        }
        
        closeWindow()
    }, [resAddVidjetItem])

    const onLoadHandler = (evt) => {
        const file = evt.target.files[0]
        console.log(file)
        setFile(file)
        doLoad(file)
    }

    const createNewItem = (text, price) => {
        const formData = new FormData()
        formData.set('mode', 'object_add_product')
        formData.set('catalog_id', catalogId)
        formData.set('title', text)
        formData.set('price', price)

        formData.append('photo_file[]', file)
        doFetchAddItem(formData)
    }

    useEffect(() => {
        if (!resAddData) return
        const img = resAddData.object.default_preview_200
        const newObj = { src: resAddData.object.default_look_preview_200, id: resAddData.object_id }
        const arr = [...loadArr]
        arr.push(newObj)
        setLoadArr(arr)
    }, [resAddData])

    useEffect(() => {
        if (!url) return
        setViewPopUp(true)
    }, [url])
    return (
        <React.Fragment>
            <PopUp showSave={loadArr.length !== 0} title="Товарыs" closePopup={closeWindow} saveHandler={() => saveList()}>
                <div className='timer-conteiner d-flex flex-column'>
                    <h3 className='question-item-header my-3'>Заголовок</h3>
                    <CKEditor
                        config={{
                            toolbar: [Utils.CKEditorTools],
                            height: '60px'
                        }}
                        data={vidjetTitle}
                        onChange={(e) => setVidjetTitle(e.editor.getData())}
                    />
                    <div className='mt-3'>
                    </div>
                </div>
                <div className='d-flex items-card-conteiner'>
                    {loadArr.map((el, i) => {
                        return (
                            <div key={i} className='mr-3 item-card d-flex'><img src={el.src} /><div className='icon-conteiner'/*  onClick={delHandler} */ color='green'>
                                <FontAwesomeIcon onClick={() => delChangeItem(el, i)} color={'red'} icon={faTrashAlt} />
                            </div></div>)
                    })}
                </div>
                <div className='d-flex items-card-conteiner m-0'>
                    <h3 className='question-item-header my-3'>Выбрать</h3>

                </div>
                <MyItem /* loadArr={loadArr}  */ setAllItemArr={setAllItemArr} loadArr={loadArr} setLoadArr={setLoadArr} />
            </PopUp>
            {/*  {viewPopUp ? <PopUp showSave={false} title="Загрузить товар" closePopup={closeWindow} saveHandler={() => saveList()}> <NewItem createNewItem={createNewItem} img={url} setView={setViewPopUp} /></PopUp> : null}
            {myItemsPopup ? <MyItem renderCheckImg={setLoadArr} showMyItem={setMyItemsPopup} /> : null} */}
            <div className='d-flex flex-wrap' >
            </div>
        </React.Fragment>
    )
}

export default Items