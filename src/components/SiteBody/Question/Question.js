import React, { useContext, useEffect, useState } from 'react'
import './question.css'
import BlockQueston from '../../BlockEditor/BlockMenu/BlockQuestion/BlockQuestion'
import ContextEditor from '../../../ContextEditor'
import Context from '../../../Context'
import useFetch from '../../../hooks/useFetch'
import Button from '../../../UI/Button/Button'
import WidjetWrapper from '../../../UI/VidjetVrapper/WidjetWrapper'
import { ContextAddBlock } from '../../../ContextAddBlock'
import ButtonAddComponent from '../../../UI/ButtonAddComponent/ButtonAddComponent'
import Utils from '../../../scripts/Utils'

const changeDataObjForBackend = (formdata, arr) => {
   /*  arr.forEach((el, i) => {
        formdata.set(`issue[${i}]`, `${el.answer}`)
        formdata.set(`answer[${i}]`, `${el.answer}`)
    })
    return formdata */
}


const Question = ({ body, id, replaceVidj, title, bgColor }) => {
    const [questons, setQuestions] = useState(body)
    const [viewEdit, setViewEdit] = useState(null)
    const [viewFullList, setViewFullList] = useState(false)
    const [setCurrentWidjet, setIsEditer, setVidjetData, vidjArr] = useContext(ContextEditor)
    const [respEditQuestion, doFetchEditQuestion] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=set_landing_prop_data')
    const [respDelQuestion, doFetchDelQuestion] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=delete_catalog_landing_prop_data')
    const [state, changeState, setState, catalogId] = useContext(Context)
    const [backgroundColor, setBackgroundColor] = useState(bgColor || '')
    const { isOpenEditBlock, setIsOpenEditBlock } = useContext(ContextAddBlock)
    const editHandler = () => {
        setViewEdit(true)
    }
    console.log('question', body, title)
    const delHandler = () => {
        const formData = new FormData()
        formData.set('landing_prop_id', 2)
        formData.set('catalog_id', catalogId)
        formData.set('landing_prop_data_id', id)
        doFetchDelQuestion(formData)
    }
    useEffect(() => {
        if (!respDelQuestion || respDelQuestion.success !== 'Успешно!') {
            return
        }
        const list = [...vidjArr]
        list.forEach((el, i) => {
            if (!el) return
            if (el.id === id) {
                list.splice(i, 1)
            }
        })
        setVidjetData(list)
    }, [respDelQuestion])



    const changeStateVidjet = (obj,) => {
        setViewEdit(false)
        const list = [...vidjArr]
        list.map(el => {
            if (!el) {
                return
            }
            if (el.id === id) {
                el.body = obj.questions
            }
        })
        setVidjetData(list)
        const formData = new FormData()
        formData.set('landing_prop_id', 2)
        formData.set('catalog_id', catalogId)
        formData.set('landing_prop_data_id', id)
        changeDataObjForBackend(formData, obj.question)
        doFetchEditQuestion(changeDataObjForBackend(formData, obj.questions))
    }

    const elems = () => {
        if (!viewFullList) {
            return body.map((el, i) => {
                if (i == 0 || i == 1) {
                    return (
                        <React.Fragment key={i}>
                            <h4>{Utils.createHTML(el.question)}</h4>
                            <p>{Utils.createHTML(el.answer)}</p>
                        </React.Fragment>
                    )
                }
            })
        } else {
            return (
                body.map(el => {
                    return (
                        <React.Fragment>
                            <h4>{Utils.createHTML(el.question)}</h4>
                            <p>{Utils.createHTML(el.answer)}</p>
                        </React.Fragment>
                    )
                })
            )
        }
    }

    const viewFillLisnHundler = () => {
        setViewFullList(true)
    }
    console.log('title', title)
    
    return (body === null ? null :
        <div className='questions-container' style={{ backgroundColor: [backgroundColor] }}>
            <WidjetWrapper id={id} replaceVidj={replaceVidj} backgroundColor={bgColor} setBackground={setBackgroundColor} delHandler={delHandler} isView={viewEdit} setViewEdit={setViewEdit} editWindow={<BlockQueston setViewEdit={setViewEdit} id={id} changeStateVidjet={changeStateVidjet} isNew={false} listArr={body} title={title} />}>
                <div className='questions-body'>
                    <h1 className = 'question-vidjet-title'>{/* {title} */} {Utils.createHTML(String(title))}</h1>
                    {elems()}
                </div>
                {body.length > 2 && !viewFullList ? <Button /* disabled = {false} */ onClick={() => viewFillLisnHundler()} title='Еще' /> : null}
                {viewEdit ? <BlockQueston setViewEdit={setViewEdit} id={id} changeStateVidjet={changeStateVidjet} isNew={false} listArr={body} title={title} /> : null}
            </WidjetWrapper>
                <ButtonAddComponent isVidjetButton={true} onClick={() => setIsOpenEditBlock(false)} />
        </div>
    )
}

export default Question