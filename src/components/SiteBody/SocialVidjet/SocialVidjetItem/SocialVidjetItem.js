
import React, { useMemo } from 'react'
import Button from '../../../../UI/Button/Button'
import './socialVidjetItem.css'
import facebook from '../../../../image/facebook.png'
import vk from '../../../../image/vk.png'
import twitter from '../../../../image/twitter.png'
import tiktok from '../../../../image/tiktok.png'
import whatsup from '../../../../image/whatsapp.png'
import telegram from '../../../../image/telegram.png'
import skype from '../../../../image/skype.png'
import viber from '../../../../image/viber.png'
import Utils from '../../../../scripts/Utils'
/* const nameSocialButton = {
    vk: 'Наша страница в Вконтакте',
    facebook: 'Наша страница в facebook',
    facebook: 'Наша страница в facebook',
    twitter: 'Наша страница в twitter',
    tiktok: 'Наша страница в tiktok',
    whatsup: 'Написать нам в WhatsApp',
    viber: 'Написать нам в Viber',
    skype: 'Написать нам в Skype',
    telegram: 'Написать нам в Telegtam',
} */
const nameSocialButton = {
    vk: vk,
    facebook: facebook,
    twitter: twitter,
    tiktok: tiktok,
    whatsup: whatsup,
    viber: viber,
    skype: skype,
    telegram: telegram,
}

const isMobile = (1 && window.share)

const createViberLink = link => {
    if (link.indexOf('viber') + isMobile) {  
        return link.replace('chat', 'add' )
    }
    return link
}

const SocialVidjetItem = ({ data }) => {
    const goToLink = (link) => {
        document.location.href = link
    }

    console.log('navigator', data, navigator.share)


    return (
        <div className='social-vidjet-item-conteiner mb-3 container '>
            <h3 className='social-vidjet-title'>{Utils.createHTML(data.title)}</h3>
            <div className='social-vidjet-item-buttons d-flex flex-row justify-center'>
                {Object.keys(data)
                    .map((el, i) => {
                        if (el === 'title' || !data[el].checked) {
                            return
                        }
                        console.log(el)
                        return (
                            <div className='mr-5 '>
                                <a target='_blank' key={i} href={`${createViberLink(data[el].link)}`}><img src={nameSocialButton[el]} /></a>
                            </div>
                            /* <React.Fragment>
                                <a key={i} href={`https://${data[el].link}`}  className='social-vidjet-button'>{nameSocialButton[el]}</a>
                            </React.Fragment> */
                        )
                    })}
            </div>
        </div>
    )
}

export default SocialVidjetItem