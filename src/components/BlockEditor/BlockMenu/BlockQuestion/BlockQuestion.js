import React, { useContext, useState,useEffect } from 'react'
import ContextEditor from '../../../../ContextEditor'
import './blockQuestion.css'
import QuestionItem from './QuestionItem/QuestionItem'
import PopUp from '../../../../UI/PopUp/PopUp'
import CKEditor from 'ckeditor4-react-advanced'
import Utils from '../../../../scripts/Utils'
import useFetch from '../../../../hooks/useFetch'
import Context from '../../../../Context'

const randomId = () => Math.random()
const BlockQueston = ({ listArr, id, setViewEdit, title, setVidjetData,vidjArr , body}) => {
    const mockQuest = [{ id: 1, question: 'test queston', answer: 'test answer' }]
    const [objNewQuestion, setObjNewQuestion] = useState(null)
    const [temporaryId, setTemporaryId] = useState('1')
    const [questonsList, setQuestionList] = useState(listArr ? listArr : [{ id: randomId(), answer: '', question: '' }])
    const [response, doFetch] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=set_landing_prop_data')
    const [blockTitle, setBlockTitle] = useState(title ? title : '')
    const [setCurrentWidjet, setIsEditer] = useContext(ContextEditor)
    const [state, changeState, setState, catalogId] = useContext(Context)
    const [tempoparyList, setTemoraryList] = useState(questonsList)
    const [isMoreOne, setIsMoreOne] = useState(() => questonsList.length > 1 ? true : false)

    console.log(listArr, 'VIDJET ARR')


    
const changeDataObjForBackend = (formdata, arr) => {
    console.log('dataforbackend',arr)
    arr.forEach((el, i) => {
        formdata.set(`issue[${i}]`, `${el.answer}`)
        formdata.set(`answer[${i}]`, `${el.answer}`)
    })
    return formdata
}


    const changeStateVidjet = (obj, questionTitle) => {
        console.log('Отправляем на серввер инфу', obj, questionTitle)
        const vidjetName = Object.keys(obj)[0]
        const newState = { ...state }
     /*    newState.siteVidjets[vidjetName] = obj[vidjetName]
        console.log(newState, 'newState')
        setState(newState) */
        setObjNewQuestion(obj)
        const formData = new FormData()
        formData.set('landing_prop_id', 2)
        formData.set('catalog_id', catalogId)
        formData.set('title', questionTitle)
        if(id){
            formData.set('landing_prop_data_id', id)
        }
      /*   changeDataObjForBackend(formData, obj.questions) */
        doFetch(changeDataObjForBackend(formData, obj.questions))
        window.location.reload()
    }



    useEffect(() => {
        console.log('useEffect responce')
        if (!response) {
            return
        }
        const list = [...vidjArr]
        list.push({ title: 'question', id: String(response.landing_prop_data_id),blockTitle:response.$update_game.title, body: objNewQuestion.questions })
        console.log('response',response)
        console.log(list)
        setVidjetData(list)
    }, [response])

    const onBlackAnswer = () => {
        const list = [...questonsList]
        list.push({ id: randomId(), answer: '', question: '' })
        setQuestionList(list)
    }

    const closeWindow = () => {
        if (id && setViewEdit) {
            setViewEdit(false)
        } else {
            setCurrentWidjet(null)
        }
    }

    const saveList = () => {
        setTimeout(()=>{
            if (id) {
                console.log('НАжали кнопку сохранить', id)
            }
            const list = [...questonsList]
            console.log({ questions: list },blockTitle)
            setQuestionList(list)
            changeStateVidjet({ questions: list },blockTitle)
            setCurrentWidjet(null)
        },200)
    }

    //Пилу костыль для редактирования заголовка

    const saveTemporaryTitle = text => setBlockTitle(text)

    const saveInTemporary = ({ id, answer, question }) => {
        const newList = [...questonsList]
        console.log('saveTemporary',newList)
        console.log(blockTitle)
        newList.map(el => {
            console.log(el.id === id)
            if (el.id === id) {
                el.question = question
                el.answer = answer
            }
        })
        setQuestionList(newList)

    }

    const deleteItem = (id) => {
        const list = [...questonsList]
        list.forEach((el, i) => {
            if (el.id === id) {
                list.splice(i, 1)
                console.log(el)
            }
        })
        setQuestionList(list)
        console.log(questonsList, id)
    }

    return (
        <PopUp title="Вопросы" closePopup={closeWindow} saveHandler={() => saveList()}>
            <div className='block-question-title'>
            <h3 className = 'question-item-header'>Заголовок</h3>
                <CKEditor
                    data={blockTitle}
                    onChange={(e,text)=>saveTemporaryTitle(e.editor.getData())}
                    
                    config={{
                        toolbar: [Utils.CKEditorTools],

                        height:'60px'
                    }}
                />
            </div>
            {questonsList.map((el, i) => {
                return <QuestionItem
                    index={i}
                    questCount={questonsList.length}
                    key={i}
                    propsAnswer={el.answer ? el.answer : ''}
                    propsQuestion={el.question ? el.question : ''}
                    id={el.id || 1}
                    saveInTemporary={saveInTemporary}
                    deleteItem={deleteItem}
                />
            })}

            <button onClick={onBlackAnswer} className='block-question-button-add'>+Добавить новый вопрос</button>
            {/* <div className='block-question-save'><p onClick={saveList} className='block-question-button-save'>Сохранить</p></div> */}
        </PopUp>
    )
}
export default BlockQueston