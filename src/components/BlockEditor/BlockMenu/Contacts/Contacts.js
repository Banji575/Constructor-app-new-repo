import React, { useContext, useEffect, useState } from 'react'
import useFetch from '../../../../hooks/useFetch'
import ContextEditor from '../../../../ContextEditor'
import Context from '../../../../Context'
import ContactsItem from './ContactsItem/ContactsItem'
import PopUp from '../../../../UI/PopUp/PopUp'
import './contacts.css'
const genetrateObj = (contacts, id) => {
    console.log(contacts)
    return { title: "contacts", id, body: { address: { text: contacts.address.text || '', checked: contacts.address.checked }, email: { text: contacts.email.text || '', checked: contacts.email.checked }, fax: { text: contacts.fax.text || '', checked: contacts.fax.checked }, phone: { text: contacts.phone.text || '', checked: contacts.phone.checked } } }
}
const contactsItemsFields = [
    {
        title: 'Адрес',
        inputType: 'text',
        inputCheckLabel: 'Отображение на сайте'
    },
    {
        title: 'Email',
        inputType: 'email',
        inputCheckLabel: 'Отображение на сайте'
    },
    {
        title: 'Телефон',
        inputType: 'phone',
        inputCheckLabel: 'Отображение на сайте'
    },
    {
        title: 'Факс',
        inputType: 'text',
        inputCheckLabel: 'Отображение на сайте'
    }
]
const Contacts = ({ content, setViewEdit, id, vidjArray, setVidjetDataArray }) => {
    console.log(id)
    const [setCurrentWidjet, setIsEditer, setVidjetData, vidjArr] = useContext(ContextEditor)
    const {state, changeState, setState, catalogId} = useContext(Context)
    const [respEditContacts, doFetchEditContacts] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=set_landing_prop_data')
    const [contacts, setContacts] = useState(() => content ? content : { address: { text: "", checked: false }, email: { text: "", checked: false }, phone: { text: "", checked: false }, fax: { text: "", checked: false } })
    const closeWindow = () => {
        if (setViewEdit) {
            setViewEdit(false)
            return
        }
        setCurrentWidjet(null)
    }


    console.log(contacts)
    const getContact = (obj) => {
        console.log(obj, contacts)
        const list = { ...contacts }
        list[obj.title] = { text: obj.text, checked: obj.checked }
        setContacts(list)
    }
    useEffect(() => {
        if (!respEditContacts) return
        if (respEditContacts.success === 'Успешно!') {

            if (!content) {
                console.log(contacts, vidjArray, id)
                const list = [...vidjArray]
                const newObj = genetrateObj(contacts, respEditContacts.landing_prop_data_id)
                list.unshift(newObj)
                setVidjetDataArray(list)
            } else {
                console.log('edit')
                console.log(contacts, vidjArr, id)
                const list = [...vidjArr]
                const newObj = genetrateObj(contacts, id)
                console.log(newObj)
                const newList = list.map((el, i) => {

                    if (!el) return null
                    if (el.id == id) {
                        console.log('test')
                        return newObj
                    }
                    return el
                })
                console.log(newList)
                setVidjetData(newList)
            }

        }
        closeWindow()
        console.log(vidjArr)
        console.log(respEditContacts)
    }, [respEditContacts])

    const saveList = () => {

        const formData = new FormData()
        formData.set('landing_prop_id', 11)
        formData.set('catalog_id', catalogId)
        console.log(contacts)
        if (contacts.address) {
            formData.set('address', contacts.address.text)
            formData.set('show_address', contacts.address.checked == true  ? 1 : 0)
        }
        if (contacts.email) {
            formData.set('email', contacts.email.text)
            formData.set('show_email', contacts.email.checked == true  ? 1 : 0)
        }
        if (contacts.phone) {
            formData.set('phone', contacts.phone.text)
            formData.set('show_phone', contacts.phone.checked == true  ? 1 : 0)
        }
        if (contacts.fax) {
            formData.set('fax', contacts.fax.text)
            formData.set('show_fax', contacts.fax.checked == true  ? 1 : 0)
        }


        if (content) {
            formData.set('landing_prop_data_id', id)
        } else {

        }
        doFetchEditContacts(formData)

    }

    return (
        <PopUp title="Контакты" closePopup={closeWindow} saveHandler={() => saveList()}>

            <div className='contacts-items-container'>
                {contactsItemsFields.map((el, i) => {
                    return <ContactsItem  key={i} content={content} getContact={getContact} title={el.title} inputType={el.inputType} inputCheckLabel={el.inputCheckLabel} />
                })}
            </div>
        </PopUp>
    )
}

export default Contacts