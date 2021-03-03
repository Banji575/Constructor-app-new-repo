import React, { useState, useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../../../hooks/useFetch'
import Text from '../../BlockEditor/BlockMenu/Text/Text'
import ContextEditor from '../../../ContextEditor'
import WidjetWrapper from '../../../UI/VidjetVrapper/WidjetWrapper'
import {ContextAddBlock} from '../../../ContextAddBlock'

import Context from '../../../Context'
import parse from 'html-react-parser'
import './textContent.css'
import ButtonAddComponent from '../../../UI/ButtonAddComponent/ButtonAddComponent'
const createHTML = str => parse(str) || ''


const TextContent = ({ body, id, replaceVidj,bgColor }) => {
    const [description, setDescription] = useState(body.discription || '')
    const [viewEdit, setViewEdit] = useState(false)
    const [state, changeState, setState, catalogId] = useContext(Context)
    const [setCurrentWidjet, setIsEditer, setVidjetData, vidjArr] = useContext(ContextEditor)
    const [respDelQuestion, doFetchDelQuestion] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=delete_catalog_landing_prop_data')
    const [respColor, doFetchColor] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=landing_prop_data_update_background_color')
    const [backgroundColor, setBackgroundColor] = useState(bgColor)
    const {isOpenEditBlock, setIsOpenEditBlock} = useContext(ContextAddBlock)
    

    const closeEdit = () => setViewEdit(false)

    useState(()=>{
    },[backgroundColor])

    body.id = id


  /*   useEffect(()=>{
        if(backgroundColor === '#'+bgColor) return
        const formData = new FormData()
        formData.set('landing_prop_data_id', id)
        formData.set('background_color', backgroundColor)
        doFetchColor(formData)
    },[backgroundColor]) */


    const deleteHandler = () => {
        const formData = new FormData()
        formData.set('landing_prop_id', 4)
        formData.set('catalog_id', catalogId)
        formData.set('landing_prop_data_id', id)
        doFetchDelQuestion(formData)
    }

    useEffect(()=>{
        if(!respColor) return
    },[respColor])

    useEffect(() => {
        if (!respDelQuestion || respDelQuestion.success != 'Успешно!') return

        const list = [...vidjArr]
        list.map((el, i) => {
            if (!el) return
            if (el.id === id) {
                list.splice(i, 1)
            }
        })
        setVidjetData(list)
    }, [respDelQuestion])


    return (
        <div className='text-container' style = {{backgroundColor:backgroundColor}}>
                <div className='text-header'>
                    <WidjetWrapper  setBackground = {setBackgroundColor} backgroundColor = {bgColor} id={id} replaceVidj = {replaceVidj} isView={viewEdit} setViewEdit={setViewEdit} delHandler = {deleteHandler} editWindow={ <Text setVidjetData={setVidjetData} vidjArr={vidjArr} content={body} closeEdit={() => setViewEdit(false)} />} >
                    <div className='text-title' >
                        <h3 className='text-h3'>{createHTML(body.title)}</h3>
                        <p className='text-p'>{createHTML(body.discription)}</p>
                    </div>
                    <ButtonAddComponent isVidjetButton = {true} onClick={() => setIsOpenEditBlock(false)}/>
                    </WidjetWrapper>
                </div>
                {/*  <div className='questions-body'>
                { elems()}
            </div> */}

                {/* {body.length>2 && !viewFullList ? <Button onClick = {()=>viewFillLisnHundler()} title = 'Еще'/> : null}  */}

            {viewEdit ? <Text setVidjetData={setVidjetData} vidjArr={vidjArr} content={body} closeEdit={() => setViewEdit(false)} /* setViewEdit = {setViewEdit} id = {id}  changeStateVidjet = {changeStateVidjet}  isNew = {false} listArr = {body} */ /> : null}
            
        </div>
    )
}

export default TextContent