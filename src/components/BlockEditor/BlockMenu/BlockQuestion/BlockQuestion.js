import React, { useContext, useState } from 'react'
import ContextEditor from '../../../../ContextEditor'
import './blockQuestion.css'
import QuestionItem from './QuestionItem/QuestionItem'
import PopUp from '../../../../UI/PopUp/PopUp'
import CKEditor from 'ckeditor4-react-advanced'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import Utils from '../../../../scripts/Utils'


const randomId = () => Math.random()
const BlockQueston = ({ changeStateVidjet, listArr, id, setViewEdit, title, setVidjetData,vidjArr }) => {
    const mockQuest = [{ id: 1, question: 'test queston', answer: 'test answer' }]

    const [temporaryId, setTemporaryId] = useState('1')
    const [questonsList, setQuestionList] = useState(listArr ? listArr : [{ id: randomId(), answer: '', question: '' }])
    const [blockTitle, setBlockTitle] = useState(title ? title : '')
    const [setCurrentWidjet, setIsEditer] = useContext(ContextEditor)
    const [tempoparyList, setTemoraryList] = useState(questonsList)
    const [isMoreOne, setIsMoreOne] = useState(() => questonsList.length > 1 ? true : false)

    console.log(vidjArr, 'VIDJET ARR')

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
        if (id) {
            console.log(changeStateVidjet)
            console.log('asl;fjdaslfkjdafjs')
        }
        const list = [...questonsList]
        console.log({ questions: list },blockTitle)
        setQuestionList(list)
        changeStateVidjet({ questions: list },blockTitle)
        setCurrentWidjet(null)
        


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