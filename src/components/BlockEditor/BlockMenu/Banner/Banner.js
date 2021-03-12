import React, { useEffect, useRef, useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faImage } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../../../../hooks/useFetch'
import ContextEditor from '../../../../ContextEditor'
import Context from '../../../../Context'
import PopUp from '../../../../UI/PopUp/PopUp'
import './banner.css'
import Utils from '../../../../scripts/Utils'

const convertBootToString = (bool) => {
    return bool === true ? 1 : 0
}

const generaneId = () => Math.random()

const checkLink = (str) => {
    const regex = new RegExp(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/)
    if (!str) return
    if (str.match(regex)) {
        return true
    } else {
        return false
    }
}


const Banner = ({ vidjetObj, setViewEdit, setVidjetData, vidjArr, id }) => {
    const root = useRef()
    const [previewImage, setPreviewImage] = useState(null)
    const [state, changeState, setState, catalogId] = useContext(Context)
    const [file, setFile] = useState(null)
    const [oneLoad, setOneLoad] = useState(false)
    const [setCurrentWidjet, setIsEditer] = useContext(ContextEditor)
    const [isLink, setIsLink] = useState(false)
    const [isValidUrl, setIsValidUrl] = useState(true)
    const [link, setLink] = useState(null)
    const [respEditBanner, doFetchEditBanner] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=set_landing_prop_data')

    //класс для скрывания надписи загрузить картинку
    const clasess = ['banner-load-img-label']
    if (previewImage) {
        clasess.push('hide')
    }

    console.log(';lakjsdflkjsdf', id)


    if (vidjetObj && !oneLoad) {

        const url = `https://cloudsgoods.com/images${vidjetObj.link}`
        setOneLoad(true)
        setPreviewImage(url)
    }
    console.log(vidjArr)
    useEffect(() => {
        if (!vidjetObj) return
        setIsLink(vidjetObj.checked)
        setLink(vidjetObj.linkSite)

    }, [])

    const saveList = () => {
        if (isLink) {
            if (!checkLink(link)) {
                setIsValidUrl(false)
                return
            }
        }
        setIsValidUrl(true)
        const formData = new FormData()
        if (file) {
            formData.set('banner_photo', file)
        }
        formData.set('catalog_id', catalogId)
        formData.set('landing_prop_id', 6)
        if (vidjetObj) {
            formData.set('landing_prop_data_id', id)
        }
        if (isLink) {
            formData.set('checkbox_banner', convertBootToString(isLink))
            formData.set('link', link)
        }

        doFetchEditBanner(formData)
    }

    useEffect(() => {
        if (!respEditBanner) return
        setOneLoad(false)
        if (respEditBanner.success = 'Успешно!') {
            if (!vidjetObj) {
                const id = respEditBanner.landing_prop_data_id
                const list = [...vidjArr]
                const newObj = { title: 'banner', id, body: { checked: isLink, link: [respEditBanner.$fields.banner_photo.value[0]], linkSite: Utils.checkEntry(link, 'https://') } }
                list.unshift(newObj)
                setVidjetData(list)
                closeWindow()
                console.log(respEditBanner, 'new', id)
            } else {
                console.log(respEditBanner, 'edit')
                const list = [...vidjArr]
                console.log(list, 'old')
                list.map((el, i) => {
                    if (!el) return
                    if (el.id == id) {

                        const url = respEditBanner.$fields.banner_photo.value[0]
                        console.log(el, url,)
                        const newBody = { checked: isLink, link: url, linkSite: link }
                        el.body = newBody
                        console.log(vidjetObj)

                        return el
                    }
                })
                console.log(list, 'new')
                setVidjetData(list)
                closeWindow()
            }
        }

    }, [respEditBanner])

    const closeWindow = () => {
        if (setViewEdit) {
            setViewEdit(false)
        }
        setCurrentWidjet(null)
    }

    const onLoadHandler = (evt) => {
        console.log('banner upload')
        if (evt.target.files.length === 0) return
        const fr = new FileReader()

        fr.readAsDataURL(evt.target.files[0])
        fr.addEventListener('load', function () {
            setPreviewImage(fr.result)
            setFile(evt.target.files[0])
        })
    }

    useEffect(() => {
        if (!previewImage) return
        const elem = root.current
        elem.style.backgroundImage = `url('${previewImage}')`
        /* setPreviewImage(null) */

    }, [previewImage])

    return (
        <PopUp title="Баннер" closePopup={closeWindow} saveHandler={() => saveList()}>
            <div className='text-body-conteiner py-1 px-3'>
                <div className='banner-upload-area-conteiner'>
                    {/*   <FontAwesomeIcon className='banner-upload-logo' size='10x' icon={faImage} /> */}
                    <div ref={root} className="input__wrapper input-wrapper-position input-wrapper-position--banner" >
                        <input accept="image/*" name="file" type="file" name="file" id="input__file_banner" className="input input__file" multiple onChange={(evt) => onLoadHandler(evt)}/* onChange={(evt) => fileChange(evt)} */ />
                        <label htmlFor="input__file_banner" className="input__file-button input-file-button--custom-height">
                            <span className="input__file-button-text"></span>
                            <p className={clasess.join(' ')}>Загрузить картинку</p>
                        </label>
                    </div>
                    <div>
                    </div>
                </div>
                <div className='banner-upload-link-conteiner'>
                    <div className='d-flex mb-3'>
                        <div className='mr-2'>
                            <input checked={isLink} onChange={() => { setIsLink(s => !s) }} id='upload-check' type='checkbox' />
                        </div>

                        <div>
                            <label className='label-text' htmlFor='upload-check'>Сделать баннер ссылкой</label>
                        </div>
                    </div>
                    <h3 className="question-item-header">Ссылка</h3>
                    <input className='input-text' type='text' value={link} pattern='/^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/' onChange={(evt) => setLink(evt.target.value)} />
                    {!isValidUrl ? <p className='text-danger'>Не верный формат ссылки</p> : null}
                </div>
            </div>
            {/* <div className='block-question-save'><p onClick={saveList} className='block-question-button-save'>Сохранить</p></div> */}
        </PopUp>
    )
}
export default Banner