import React, { useEffect, useContext, useState } from 'react'
import PopUp from '../../../UI/PopUp/PopUp'
import useFetch from '../../../hooks/useFetch'
import Context from '../../../Context'
import MyItemElem from '../../BlockEditor/BlockMenu/Items/MyItem/MyItemElem/MyItemElem'
import Loader from '../../../UI/Loader/Loader'



const MyItems = ({ showMyItem, previewItem }) => {
    const [response, doFetch] = useFetch('https://cloudsgoods.com/api/actionsAdmin.php?')

    const [state, changeState, setState, catalogId, setVidjetData, vidjArr] = useContext(Context)
    const [itemList, setItemList] = useState()
    useEffect(() => {
        const formData = new FormData()
        formData.set('mode', 'get_my_objects')
        /*  formData.set('catalog_id', catalogId) */
        formData.set('menu_id', 0)
        formData.set('start', 0)
        formData.append('limit', 50)
        doFetch(formData)
    }, [])


    const getItemsParams = (id) => {
        previewItem(id)
    }


    useEffect(() => {
        if (!response) return
        const items = response.data
        const list = []
        items.forEach(el => list.push(el))
        setItemList(list)
        /*   response.data.foreEach(el=> list.push(el)) */

        /*        const list = []
               response.data.forEach(el => {
                   list.push(el)
               })
               setFileArr(list)
               setImageIsLoad(true)
               console.log(fileArr) */
    }, [response])

    return (
        <PopUp title="Товары" closePopup={() => showMyItem(false)} /* showSave = {false} */ /* saveHandler={() => saveList()} */>
            <div>
                <ul className='my-items-list'>
                    {itemList ? itemList.map((el, i) => {
                        return <div className="col-2">
                            <div
                                key={i}
                                onClick={() => getItemsParams(el.id)}
                                className='my-items-item'>
                                <img className='my-items-elem-img' src={el.default_look_preview_700} />
                            </div>
                        </div>
                    }) : <Loader />}
                </ul>
            </div>
            <div className='d-flex justify-content-end'>
                {/*  <Button title='Загрузить' onClick={() => loadItemhandler()}/> 
                      <Button title='Отмена' onClick={() => showMyItem(false)} /> */}
            </div>
        </PopUp>
    )
}

export default MyItems

{/* <MyItemElem id={el.id} addImgCheckArr={setCheckedImg} showMyItem={showMyItem} key={i} src={el.default_look_preview_200} /> */ }