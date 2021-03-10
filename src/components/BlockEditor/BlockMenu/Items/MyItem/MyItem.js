import React, { useEffect, useState, useContext } from 'react'
import './myItem.css'
import Context from '../../../../../Context'
import useFetch from '../../../../../hooks/useFetch'
import MyItemElem from './MyItemElem/MyItemElem'
import Button from '../../../../../UI/Button/Button'
import PopUp from '../../../../../UI/PopUp/PopUp'
import NoItemsBlock from './NoitemsBlock/NoItemsBlock'

const MyItem = ({ showMyItem, renderCheckImg , loadArr, setLoadArr, setAllItemArr}) => {
    const [imageLoad, setImageIsLoad] = useState(false)
    const [checkedImg, setCheckedImg] = useState([])
    const [fileArr, setFileArr] = useState(null)
    const [state, changeState, setState, catalogId, setVidjetData, vidjArr] = useContext(Context)
    const [response, doFetch] = useFetch(`https://cloudsgoods.com/api/CatalogController.php?mode=get_catalog_objects&catalog_id=${catalogId}&objects_all=all`)
  /*   const [response, doFetch] = useFetch('https://cloudsgoods.com/api/actionsAdmin.php?') */






    const loadItemhandler = () => {
        console.log(checkedImg)
        renderCheckImg(s => (
            [...s, ...checkedImg]
        ))
        showMyItem(false)
    }
    useEffect(() => {
        doFetch()
    }, [])

    useEffect(() => {
        if (!response) return
        console.log(response.data)
        setAllItemArr(response.data)
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
            <React.Fragment>
                <div>
                    <ul className='my-items-list'>
                        {fileArr.length === 0 
                        ? 
                        <NoItemsBlock/>
                        :
                        fileArr.map((el, i) => {
                            return <MyItemElem  loadArr={loadArr} setLoadArr = {setLoadArr}  id={el.catalog_object_id} addImgCheckArr={setCheckedImg} showMyItem={showMyItem} key={i} src={el.default_look_preview_200} />
                        })}

                    </ul>
                </div>
        {/*         <div className='d-flex justify-content-end ml-1'>
                    <Button title='Применить' onClick={() => loadItemhandler()} />
                    <Button title='Отмена' onClick={() => showMyItem(false)} />
                </div> */}
            </React.Fragment>
        )

}

export default MyItem;