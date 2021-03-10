import React, { useEffect, useRef, useState, useContext } from 'react'
import './bannerVidjet.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import ContextEditor from '../../../ContextEditor'
import useFetch from '../../../hooks/useFetch'
import LinkWrapper from '../../../UI/LinkWrapper/LinkWrapper'
import Banner from '../../BlockEditor/BlockMenu/Banner/Banner'
import Context from '../../../Context'
import WidjetWrapper from '../../../UI/VidjetVrapper/WidjetWrapper'
import {ContextAddBlock} from '../../../ContextAddBlock'
import ButtonAddComponent from '../../../UI/ButtonAddComponent/ButtonAddComponent'

const BannerVidjet = ({ body, id, replaceVidj }) => {
    const [link, setLink] = useState(null)
    const [viewEdit, setViewEdit] = useState(false)
    const [linkSite, setLinkSite] = useState(body.linkSite)
    const [setCurrentWidjet, setIsEditer, setVidjetData, vidjArr] = useContext(ContextEditor)
    const [respDelQuestion, doFetchDelQuestion] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=delete_catalog_landing_prop_data')
    const [state, changeState, setState, catalogId] = useContext(Context)
    const [backgroundColor, setBackgroundColor] = useState('')
    const {isOpenEditBlock, setIsOpenEditBlock} = useContext(ContextAddBlock)
    console.log(backgroundColor)

    const root = useRef()
    if (body.link && !link) {
        setLink(body.link)
    }

    const delHandler = () => {
        console.log('del')
        const formData = new FormData()
        formData.set('landing_prop_id', 6)
        formData.set('catalog_id', catalogId)
        formData.set('landing_prop_data_id', id)
        doFetchDelQuestion(formData)

    }

    useEffect(() => {
        if (!respDelQuestion) return
        if (respDelQuestion.success === 'Успешно!') {
            const list = [...vidjArr]
            list.map((el, i) => {
                if (!el) return
                if (el.id == id) {
                    list.splice(i, 1)
                }
            })
            setVidjetData(list)
        }
    }, [respDelQuestion])

    useEffect(() => {
        /*    console.log('vidget change', link, vidjArr,id) */
        if (!link) return
        vidjArr.forEach(el => {
            if (!el) return
            if (el.id == id) {
                const elem = root.current
                elem.src = ` https://cloudsgoods.com/images${el.body.link}`
                /*    setLinkSite(el.body.linkSite) */
                console.log(el, linkSite, body, 'alsjfladkljsfds;lj')
                return
            }/* else{
                console.log('не равен', el.id,id)
                const elem = root.current
                elem.src = ` https://cloudsgoods.com/images${link[0]}`
            } */
        })

    }, [vidjArr])

    const editHandler = () => {
        setViewEdit(true)
    }

    return (
        <div className='questions-container'style = {{backgroundColor: ['#fff']}} >
        <WidjetWrapper fullScreen = {true} delHandler={delHandler} replaceVidj = {replaceVidj} id={id} setBackground = {setBackgroundColor} isView={viewEdit} setViewEdit={setViewEdit} editWindow={<Banner setViewEdit={setViewEdit} vidjArr={vidjArr} setVidjetData={setVidjetData} id={id}  vidjetObj={body} />} >
            <div className='banner-body' >
                {linkSite ? <LinkWrapper link={linkSite}> <img className = 'banner-vidjet-img' ref={root} /></LinkWrapper> : <img className = 'banner-vidjet-img' ref={root} />}
            </div>
        </WidjetWrapper>
        <ButtonAddComponent isVidjetButton = {true} onClick={() => setIsOpenEditBlock(false)}/>
        </div>
    )
}
export default BannerVidjet