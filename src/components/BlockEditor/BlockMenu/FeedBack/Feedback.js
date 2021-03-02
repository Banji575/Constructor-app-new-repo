import React, { useState, useContext, useEffect } from 'react'
import FeedbackItem from './FeedbackItem/FeedbackItem'
import ContextEditor from '../../../../ContextEditor'
import Context from '../../../../Context'
import useFetch from '../../../../hooks/useFetch'
import PopUp from '../../../../UI/PopUp/PopUp'

import './feedback.css'
const feedbackList = [
    { title: 'Заголовок', isInput: true, fieldName: 'title' },
    { title: 'Имя', isInput: false, fieldName: 'name' },
    { title: 'Email', isInput: false, fieldName: 'email' },
    { title: 'Телефон', isInput: false, fieldName: 'phone' },
    { title: 'Поле для текста', isInput: false, fieldName: 'message' }
]

const isvalidEmail = (str) => str.search(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/)
const generateId = () => Math.random()

const Feedback = ({ content, setViewEdit, id, setVidjetDataArray, vidjArray }) => {
    const [data, setData] = useState(content || { title: 'feedback', id: generateId(), body: { ourEmail: { text: '', show: true }, title: { text: '', show: false }, name: { text: '', show: false }, email: { text: '', show: false }, phone: { text: '', show: false }, message: { text: '', show: false } } })
    const [setCurrentWidjet, setIsEditer, setVidjetData, vidjArr] = useContext(ContextEditor)
    const [respEditFeedback, doFetchEditFeedback] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=set_landing_prop_data')
    const [state, changeState, setState, catalogId] = useContext(Context)
    const [isValid, setIsValid] = useState(true)
    console.log(content)
    const closeWindow = () => {
        if (setViewEdit) {
            setViewEdit(false)
            return
        } else
            setCurrentWidjet(null)
    }

    const checkHandler = (title) => {
        const fieldName = feedbackList.find(el => el.title === title).fieldName
        const list = { ...data }
        list.body[fieldName].show = !list.body[fieldName].show
        setData(list)
    }

    const saveEmailHandler = (text) => {
        console.log(isvalidEmail(text) + 1)
        if (isvalidEmail(text) + 1) {
            const list = { ...data }
            console.log(list.body.ourEmail)
            list.body.ourEmail.text = text
            setIsValid(true)
            setData(list)
        } else {
            setIsValid(false)
        }

    }

    const saveTitleHandler = (text) => {


        const list = { ...data }
        list.body.title.text = text
        setData(list)
    }

    const saveList = () => {
        if (!isValid) {
            return
        }
        const formData = new FormData()
        formData.set('landing_prop_id', 9)
        formData.set('catalog_id', catalogId)
        if (content) {
            formData.set('landing_prop_data_id', content.id)
        }

        formData.set('our_email', data.body.ourEmail.text)
        //formData.set('show_title', data.body.ourEmail.show === true ? 1 : 0)
        formData.set('name', data.body.name.text)
        formData.set('show_name', data.body.name.show === true ? 1 : 0)
        formData.set('email', data.body.email.text)
        formData.set('show_email', data.body.email.show === true ? 1 : 0)
        formData.set('phone', data.body.phone.text)
        formData.set('show_phone', data.body.phone.show === true ? 1 : 0)
        formData.set('message', data.body.message.text)
        formData.set('show_message', data.body.message.show === true ? 1 : 0)
        formData.set('title', data.body.title.text)
        formData.set('show_title', data.body.title.show === true ? 1 : 0)


        doFetchEditFeedback(formData)
    }

    useEffect(() => {
        if (!respEditFeedback) return
        if (respEditFeedback.success = 'Успешно!') {
            if (content) {
                const list = [...vidjArr]
                list.map((el, i) => {
                    if (el.id === content.id) {
                        return data
                    }
                })

            } else {
                const list = [...vidjArray]
                console.log('feedback data', data)
                list.unshift({...data, id:respEditFeedback.landing_prop_data_id})
                setVidjetDataArray(list)

            }
            closeWindow()
        }
    }, [respEditFeedback])

    return (
        <PopUp title="Обратная связь" closePopup={closeWindow} saveHandler={() => saveList()}>
            <div className='feedback-option-conteiner p-3'>
                <div className='feedback-option-list'>
                    <h3 className='question-item-header'> Заголовок</h3>
                    {feedbackList.map((el, i) => {
                        return (
                            <FeedbackItem isInput={el.isInput} title={el.title} body={data.body[el.fieldName]} saveTitleHandler={saveTitleHandler} checkHandler={checkHandler} />
                        )
                    })}
                </div>
            </div>
            <div className='feedback-email-conteiner p-3'>
                <p className='question-item-header mb-1'>Введите ваш e-mail адрес куда будут приходить сообщения</p>
                <input type='email' placeholder={data.body.ourEmail.text} onBlur={(evt) => saveEmailHandler(evt.target.value)} />
                {!isValid && <p className='text-danger'>Не правильный формат записи</p>}
            </div>
            {/* <div className='block-question-save'><p onClick={saveList} className='block-question-button-save'>Сохранить</p></div> */}
        </PopUp>
    )
}

export default Feedback