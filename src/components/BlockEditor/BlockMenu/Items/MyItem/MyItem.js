import React, { useEffect, useState, useContext } from 'react'
import './myItem.css'
import Context from '../../../../../Context'
import useFetch from '../../../../../hooks/useFetch'
import MyItemElem from './MyItemElem/MyItemElem'
import Button from '../../../../../UI/Button/Button'
import PopUp from '../../../../../UI/PopUp/PopUp'

const MyItem = ({ showMyItem, renderCheckImg }) => {
    const [imageLoad, setImageIsLoad] = useState(false)
    const [checkedImg, setCheckedImg] = useState([])
    const [fileArr, setFileArr] = useState(null)
    const [response, doFetch] = useFetch('https://cloudsgoods.com/api/actionsAdmin.php?')
    const [state, changeState, setState, catalogId, setVidjetData, vidjArr] = useContext(Context)


    const loadItemhandler = () => {
        console.log(checkedImg)
        renderCheckImg(s=>(
            [...s,...checkedImg]
            ))
        showMyItem(false)
    }
    useEffect(() => {
        const formData = new FormData()
        formData.set('mode', 'get_my_objects')
        /* formData.set('catalog_id', catalogId)
        formData.set('menu_id', 0) */
        formData.set('start', 0)
        formData.append('limit', 50)
        doFetch(formData)
    }, [])

    useEffect(() => {
        if (!response) return
        console.log(response)
        const list = []
        response.data.forEach(el => {
            list.push(el)
        })
        setFileArr(list)
        setImageIsLoad(true)
        console.log(fileArr)
    }, [response])

    return !imageLoad ?
        <div className='d-flex h-100' ><div class="spinner-border mx-auto my-auto" role="status">
            <span class="sr-only ">Loading...</span>
        </div></div> :
        (
            <PopUp title="Товары" closePopup={()=>showMyItem(false)} showSave = {false} /* saveHandler={() => saveList()} */>
                <div>
                    <ul className='my-items-list'>
                        {fileArr.map((el, i) => {
                            console.log(el)
                            return <MyItemElem id={el.id} addImgCheckArr={setCheckedImg} showMyItem={showMyItem} key={i} src={el.default_look_preview_200} />
                        })}

                    </ul>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <Button title='Загрузить' onClick={() => loadItemhandler()} />
                        <Button title='Отмена' onClick={() => showMyItem(false)} />
                    </div>
            </PopUp>
        )

}

export default MyItem;