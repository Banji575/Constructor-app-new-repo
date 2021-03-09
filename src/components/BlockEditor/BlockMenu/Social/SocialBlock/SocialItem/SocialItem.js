import React, { useEffect, useState } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import './socialItem.css'
import Button from '../../../../../../UI/Button/Button'
import Utils from '../../../../../../scripts/Utils'


const placeholderChange = (str) => {
    switch (str) {
        case 'WhatsApp': return 'Введите номер'
        default: return'Ссылка на страницу'
    }
}

const socialConfig = {
    WhatsApp:{
        placeholder:'Введите номер',
        createLink: num=>`https://wa.me/${num}`
    },
    skype:{
        placeholder:'Введите имя пользователя',
        /* createLink: str => `https://${Utils.checkEntry(str, 'msng.link/o/?')}` */
        createLink: str => `skype:${Utils.checkEntry(str, '?call')}`
    },
    Telegram:{
        placeholder:'Ссылка на страницу',
        createLink: str => `${Utils.checkEntry(str, 'https://t.me/')}`
    },
    viber:{
        placeholder:'Введите номер',
        /* createLink: str => `https://${Utils.checkEntry(str, 'msng.link/o/?')}` */
        createLink: str => `https://viber.click/${Utils.checkEntry(str, '789684922812')}`
    },
    TikTok:{
        placeholder:'Ссылка на страницу',
        createLink: str=>`https://${str}`
    },
    Twitter:{
        placeholder:'Введите имя пользователя ',
        createLink: str=>`https://twitter.com/${str}`
    },
    Facebook:{
        placeholder:'Введите имя пользователя',
        createLink: str=>`https://www.facebook.com/${str}`
    },
    Вконтакте:{
        placeholder:'Введите id пользователя ',
        createLink: str=>`https://vk.com/${Utils.checkEntry(str, 'id')}`
    },
}


const SocialItem = ({ title, isChecked, link, name, data, saveItem, blockName,isValid }) => {
    const [checked, setChecked] = useState(() => data ? data.checked : false)
    const [isEdit, setIsEdit] = useState(false)
    const [socialLink, setSocialLink] = useState(() => data ? data.link : '')
    const [isValidSocialLink, setIsValidSocialLink] = useState(true)
    const [state, setState] = useState({ [name]: data })
    const [initialize, setInitialaize] = useState(false)
        console.log(title)
    const saveSocialLink = () => {
        if (!socialLink) {
            isValid(false)
            setIsValidSocialLink(false)
            return
        }

        setIsEdit(false)
        isValid(true)
        setIsValidSocialLink(true)

        const newData = { checked: checked, link:socialConfig[title].createLink(socialLink) }
        console.log(newData)
        setState({ [name]: newData })
    }

    useEffect(() => {
        if (!initialize) {
            setInitialaize(true)
            return
        }

        saveItem(blockName, name, state)
    }, [state])


    const settingToggle = () => {

    }
    const check = (evt) => {
        setIsEdit(state => !state)
        const newData = { checked: !checked, link:socialLink }
        setState({ [name]: newData })
        setChecked(state => !state)
        if (checked) {
            setIsEdit(false)
            setIsValidSocialLink(true)
        }

    }

    return (
        <React.Fragment>
            <div className='social-item-conteiner'>
                <div className='social-checkbox-conteiner mt-3'>
                    <FormControlLabel className='social-item-checkbox'
                        control={<Switch size="medium" value={checked} checked={checked} onChange={() => check()} />}
                    />
                    <p className='social-item-title m-0'>{title}</p>
                </div>
                {/*   <div className='social-button-center'>
                    <Button disabled={!checked} title='настройки' onClick={settingToggle} />
                </div> */}
                
            </div>
            {
                isEdit || checked ? (
                    <div className='social-item-setting'>
                        <input placeholder={socialConfig[title].placeholder} className='input-text w-100 py-1' type='text' onBlur={saveSocialLink} value={socialLink} onChange={(evt) => setSocialLink(evt.target.value)} />
                        {!isValidSocialLink ? <p className='text-danger'>Поле не дожно быть пустым</p> : null}
                        {/*  <div className='social-button-right'>
                            <Button title='Сохранить' onClick={saveSocialLink} />
                        </div> */}

                    </div>
                )
                    : null
            }

        </React.Fragment>
    )
}

export default SocialItem