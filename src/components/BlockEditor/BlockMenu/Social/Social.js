import React, { useEffect, useState,useContext } from 'react'
import Context from '../../../../Context'
import ContextEditor from '../../../../ContextEditor'
import useFetch from '../../../../hooks/useFetch'
import SocialBlock from './SocialBlock/SocialBlock'
import PopUp from '../../../../UI/PopUp/PopUp'
const itemArrSocial = [
    { title: 'Вконтакте', name: 'vk' },
    { title: 'Facebook', name: 'facebook' },
    { title: 'Twitter', name: 'twitter' },
    { title: 'TikTok', name: 'tiktok' },
]
const itemArrMessedger = [
    { title: 'WhatsApp', name: 'whatsup' },
    { title: 'Telegram', name: 'telegram' },
    { title: 'skype', name: 'skype' },
    { title: 'viber', name: 'viber' },
]

const genetateId = () => Math.random()

const Social = ({ content,setViewEdit ,id,setVidjetDataArray, vidjArray}) => {
    const [setCurrentWidjet, setIsEditer, setVidjetData, vidjArr] = useContext(ContextEditor)
    const [data, setData] = useState(content ? content : { title: 'social', id: genetateId(), social: { title: 'Социальные сети', vk: { checked: false, link: '' }, facebook: { checked: false, link: '' }, twitter: { checked: false, link: '' }, tiktok: { checked: false, link: '' } }, messeger: { title: 'Месседжеры', whatsup: { checked: false, link: '' }, telegram: { checked: false, link: '' }, skype: { checked: false, link: '' }, viber: { chedked: false, link: '' } } })
    const [respEditSocial, doFetchEditSocial] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=set_landing_prop_data')
    const [respEditTimer, doFetchEditTimer] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=set_landing_prop_data')
    const [state, changeState, setState, catalogId] = useContext(Context)
    const [isValid, setIsValid] = useState(false)

    console.log('social', isValid)

    const closeWindow = () => {
        if (setViewEdit) {
            setViewEdit(false)
        } else
            setCurrentWidjet(null)
    }


    const saveList = () => {
        console.log(data)
        const formData = new FormData()
        formData.set('landing_prop_id', 10)
        formData.set('catalog_id', catalogId)
        if(content){
            formData.set('landing_prop_data_id', id)
        }
        
        formData.set('social_title', data.social.title)
        formData.set('messengers_title', data.messeger.title)

        formData.set('vk_link', data.social.vk.link)
        formData.set('vk', data.social.vk.checked === true ? 1 : false)
        formData.set('facebook_link', data.social.facebook.link)
        formData.set('facebook', data.social.facebook.checked === true ? 1 : false)
        formData.set('twitter_link', data.social.twitter.link)
        formData.set('twitter', data.social.twitter.checked === true ? 1 : false)
         formData.set('tiktok_link', data.social.tiktok.link)
        formData.set('tiktok', data.social.tiktok.checked === true ? 1 : false)

        formData.set('WhatsApp_link', data.messeger.whatsup.link)
        formData.set('WhatsApp', data.messeger.whatsup.checked === true ? 1 : false)
        formData.set('Telegram_link', data.messeger.telegram.link)
        formData.set('Telegram', data.messeger.telegram.checked === true ? 1 : false)
        formData.set('Viber_link', data.messeger.viber.link)
        formData.set('Viber', data.messeger.viber.checked === true ? 1 : false)
        formData.set('skype_link', data.messeger.skype.link)
        formData.set('skype', data.messeger.skype.checked === true ? 1 : false)


        doFetchEditSocial(formData)
    }



    useEffect(()=>{
        if(!respEditSocial)
        return
        if(respEditSocial.success === 'Успешно!'){
           console.log(respEditSocial)
            if(!content){
                const list = [...vidjArray]
                const body = {title: 'social', id: respEditSocial.landing_prop_data_id, body:{social:data.social, messeger:data.messeger}}
                console.log(data)
                list.unshift(body)

                console.log(body)
                setVidjetDataArray(list)
            }else{
                const list = [...vidjArr]
                console.log('edit',list)
                
                list.map((el,i)=>{
                    if(!el) return
                    if(el.id ===id){
                        const body = {social:data.social, messeger:data.messeger}
                        el.body=body
                        console.log(el)
                        console.log(body)

                    }
                })
                setVidjetData(list)
            }
           
            closeWindow()
        }
    },[respEditSocial])

    const saveTitle = (category, title)=>{
        console.log(category, title)
        if(title === ''){
            return
        }
        const list = {...data}
        list[category].title = title
        setData(list)
    }

    useEffect(()=>{
        console.log('data', data)
    }, [data])

    const saveItem = (blockName, name ,itemStr) => {
       /*  console.log(blockName, name ,itemStr) */
        const list = {...data}
        const objName = Object.keys(itemStr)[0]
        list[blockName][objName] = itemStr[objName]
        console.log(list)
    }

    return (
        <PopUp buttonDisable = {isValid} title="Соц сети / месседжеры" closePopup={closeWindow}  saveHandler={() => saveList()}>

            <SocialBlock isValid = {setIsValid} saveTitle = {saveTitle} itemArr={itemArrSocial} blockName = 'social' saveItem = {saveItem}  content = {data.social} blockTitle='Социальные сети' />
            <SocialBlock isValid = {setIsValid} saveTitle = {saveTitle} itemArr={itemArrMessedger} blockName = 'messeger' saveItem = {saveItem} content = {data.messeger} blockTitle='Месседжеры' />
          {/*   <div className='block-question-save'><p onClick={saveList} className='block-question-button-save'>Сохранить</p></div> */}
         
        </PopUp>
    )
}

export default Social