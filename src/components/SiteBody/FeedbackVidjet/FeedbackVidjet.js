import React, { useState, useContext, useEffect } from 'react'
import Utils from '../../../scripts/Utils'
import './feedbackVidjet.css'
import FeedbackVidjetItem from './FeedbackVidjetItem/FeedbackVidjetItem'
import WidjetWrapper from '../../../UI/VidjetVrapper/WidjetWrapper'
import Button from '../../../UI/Button/Button'
import Context from '../../../Context'
import ContextEditor from '../../../ContextEditor'
import Feedback from '../../BlockEditor/BlockMenu/FeedBack/Feedback'
import useFetch from '../../../hooks/useFetch'
import {ContextAddBlock} from '../../../ContextAddBlock'
import ButtonAddComponent from '../../../UI/ButtonAddComponent/ButtonAddComponent'


const FeedbackVidject = ({ body , id, replaceVidj}) => {
    const [viewEdit, setViewEdit] = useState(false)
    const {state, changeState, setState, catalogId} = useContext(Context)
    const [respDelFeedback, doFetchDelFeedback] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=delete_catalog_landing_prop_data')
    const [setCurrentWidjet, setIsEditer, setVidjetData, vidjArr] = useContext(ContextEditor)
    const [backgroundColor, setBackgroundColor] = useState('')
    const {isOpenEditBlock, setIsOpenEditBlock} = useContext(ContextAddBlock)
    const editHandler = () => setViewEdit(true)

    const delHandler = () => {
        console.log('del', id)
        const formData = new FormData()
        formData.set('landing_prop_id', 9)
        formData.set('catalog_id', catalogId)
        formData.set('landing_prop_data_id', id)
        doFetchDelFeedback(formData)
    }

    useEffect(()=>{
        if (!respDelFeedback) return
        if (respDelFeedback.success === 'Успешно!') {
            const list = [...vidjArr]
            list.map((el, i) => {
                if (!el) return
                if (el.id === id) {
                    list.splice(i, 1)
                }
            })
            setVidjetData(list)
        }
    },[respDelFeedback])

    return (
        <div className='questions-container' style = {{backgroundColor:[backgroundColor]}}>
                <WidjetWrapper id={id} replaceVidj = {replaceVidj} delHandler = {delHandler} setBackground = {setBackgroundColor} isView={viewEdit} setViewEdit={setViewEdit} editWindow={<Feedback setViewEdit = {setViewEdit} content = {{id:id, title:'feedback',body:body}}/>} >
                <div className='questions-body feedback-body' /* style = {{backgroundColor:[backgroundColor]}} */>
                    <h3 className='feedback-vidjet-h3 text-center'>{Utils.createHTML(body.title.text)}</h3>
                    {Object.keys(body).map((el, i) => {
                        return <FeedbackVidjetItem  key = {i} title = {el} data = {body[el]}/>
                    })} 
                    <Button classes = {['d-flex', 'my-0', 'mx-auto']}   title = 'Отправить'/>
                </div>
                </WidjetWrapper>  
                <ButtonAddComponent isVidjetButton = {true} onClick={() => setIsOpenEditBlock(false)}/>
            </div>  
             /* {viewEdit ?<Feedback setViewEdit = {setViewEdit} content = {{id:id, title:'feedback',body:body}}/> :  null} */
    )
}

export default FeedbackVidject