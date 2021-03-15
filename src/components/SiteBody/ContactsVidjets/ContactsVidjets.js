import React, { useEffect, useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../../../hooks/useFetch'
import WidjetWrapper from '../../../UI/VidjetVrapper/WidjetWrapper'
import Context from '../../../Context'
import ContextEditor from '../../../ContextEditor'
import './contactsVidjets.css'
import Contacts from '../../BlockEditor/BlockMenu/Contacts/Contacts'
import {ContextAddBlock} from '../../../ContextAddBlock'
import ButtonAddComponent from '../../../UI/ButtonAddComponent/ButtonAddComponent'

const ContactsVidjets = ({ body, id, replaceVidj }) => {
    const [viewEdit, setViewEdit] = useState(false)
    const [respDelContacts, doFetchDelContacts] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=delete_catalog_landing_prop_data')
    const {state, changeState, setState, catalogId} = useContext(Context)
    const [setCurrentWidjet, setIsEditer, setVidjetData, vidjArr] = useContext(ContextEditor)
    const [backgroundColor, setBackgroundColor] = useState('')
    const {isOpenEditBlock, setIsOpenEditBlock} = useContext(ContextAddBlock)
    const { address, email, phone, fax } = body
    const editHandler = () => {
        setViewEdit(true)
    }

    const delHandler = () => {
        console.log('del', id)
        const formData = new FormData()
        formData.set('landing_prop_id', 6)
        formData.set('catalog_id', catalogId)
        formData.set('landing_prop_data_id', id)
        doFetchDelContacts(formData)
    }

    useEffect(() => {
        if (!respDelContacts) return
        if (respDelContacts.success === 'Успешно!') {
            const list = [...vidjArr]
            list.map((el, i) => {
                if (!el) return
                if (el.id === id) {
                    list.splice(i, 1)
                }
            })
            setVidjetData(list)
        }
    }, [respDelContacts])
    return (
        <div className='questions-container' style={{ backgroundColor: [backgroundColor] }}>
                <WidjetWrapper id={id} replaceVidj = {replaceVidj} delHandler={delHandler} setBackground={setBackgroundColor} isView={viewEdit} setViewEdit={setViewEdit} editWindow={<Contacts content={body} setViewEdit={setViewEdit} id={id}  /* changeStateVidjet={changeStateVidjet} isNew={false} listArr={body} */ />} >
                    <div className='d-flex flex-column justify-content-center'>
                        <div className='questions-title mb-3 '>
                            <h3 className='question-h3 text-center'>Контакты</h3>
                        </div>
                        {address.checked ? <p className='m-1 contacts-p text-center'>{address.text}</p> : null}
                        {email.checked ? <p className='m-1 contacts-p text-center'>{email.text}</p> : null}
                        {phone.checked ? <p className='m-1 contacts-p text-center'>{phone.text}</p> : null}
                        {fax.checked ? <p className='m-1 contacts-p text-center'>{fax.text}</p> : null}
                    </div>
                </WidjetWrapper>
                        <ButtonAddComponent isVidjetButton = {true} onClick={() => setIsOpenEditBlock(false)}/>

            {/*    {body.length > 2 && !viewFullList ? <Button onClick={() => viewFillLisnHundler()} title='Еще' /> : null} */}
            {viewEdit ? <Contacts content={body} setViewEdit={setViewEdit} id={id}  /* changeStateVidjet={changeStateVidjet} isNew={false} listArr={body} */ /> : null}
        </div>
    )
}

export default ContactsVidjets