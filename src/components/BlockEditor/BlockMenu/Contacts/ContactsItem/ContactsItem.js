import React, { useEffect, useState } from 'react'
import './ContactsItem.css'
const renameTitle = (str) => {
    switch (str) {
        case 'Адрес': return 'address'
        case 'Email': return 'email'
        case 'Телефон': return 'phone'
        case 'Факс': return 'fax'
    }
}
const ContactsItem = ({ title, inputType, inputCheckLabel, textValue, checkValue, getContact, content }) => {
    const [text, setText] = useState(() => content ? content[renameTitle(title)].text : '')
    const [checked, setChecked] = useState(() => content ? content[renameTitle(title)].checked : false)

    console.log(checked)

    return (
        <div className='contacts-item'>
            <p className='question-item-header'>{title}</p>
            <input onBlur={() => getContact({ title: renameTitle(title), text, checked })} className='w-100 input-text' type={inputType} value={text} onChange={(evt) => { setText(evt.target.value) }} />
            <div className='mt-3'>
                <input onBlur={() => getContact({ title: renameTitle(title), text, checked })} className='mr-1' id={title} type='checkbox' checked={checked} onChange={() => setChecked(!checked)} />
                <label className='contacts-item-label' htmlFor={title}>{inputCheckLabel}</label>
            </div>
        </div>

    )
}

export default ContactsItem