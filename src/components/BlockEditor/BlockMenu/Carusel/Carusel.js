import React, { useRef, useState, useContext, useEffect, } from 'react'
import Button from '../../../../UI/Button/Button'
import './carusel.css'
import Context from '../../../../Context'
import ContextEditor from '../../../../ContextEditor'
import CaruselItem from './CaruselItem/CaruselItem'
import useFetch from '../../../../hooks/useFetch'
import PopUp from '../../../../UI/PopUp/PopUp'


const generateId = () => Math.random()


const Carusel = ({ body, id, setViewEdit, vidjArray, setVidjetDataArray }) => {
    const [content, setContent] = useState(body ? body : { title: 'carusel', id: generateId(), body: { images: [], interval: null } })
    const [setCurrentWidjet, setIsEditer, setVidjetData, vidjArr] = useContext(ContextEditor)
    /* const [url] = useImageLoad(file) */
    const [files, setFiles] = useState([])
    const [changefile, setChangeFile] = useState(null)
    const [interval, setInterval] = useState(body ? body.interval : 1)
    const [respCarusel, doFetchCarusel] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=set_landing_prop_data')
    const [state, changeState, setState, catalogId] = useContext(Context)
    const [isValidLimitSlide, setIsValidLimitSlide] = useState(true)
    const [limitSlide, setLimitSlide] = useState(3)

    console.log(body)

    useEffect(() => {
        if (files.length === limitSlide) {
            setIsValidLimitSlide(false)
        } else {
            setIsValidLimitSlide(true)
        }
    }, [files])
    console.log('filelist', files)
    const root = useRef()
    const clickHandler = () => {
        if (!isValidLimitSlide) return
        root.current.click()
    }
    const addFile = (val) => {
        console.log(val)
        const fileList = [...files]
        fileList.push(val)
        setFiles(fileList)
    }
    const closeWindow = () => {
        if (setViewEdit) {
            setViewEdit(false)
            return
        }
        setCurrentWidjet(null)
    }

    const saveList = () => {
        console.log('carusel body',body, id)
        if(body){
            const list= [...vidjArr]
            list.forEach(el=>{
                if(el.id===id){
                    console.log(el)
                }
            })
            return
        }
        console.log('save list')
        const formData = new FormData()
        const list = [...files]
        console.log(list)
        formData.set('landing_prop_id', 1)
        formData.set('catalog_id', catalogId)
        list.forEach(el => formData.append('slider_photo[]', el))
        formData.set('interval', interval)


        doFetchCarusel(formData)

    }

    useEffect(() => {
        if (!respCarusel) return
        if (respCarusel.success === 'Успешно!') {
            console.log(respCarusel)
            const list = [...vidjArray]
            const url = respCarusel.$fields.slider_photo.value
            content.id = respCarusel.landing_prop_data_id
            content.body.images = url
            content.body.interval = interval
            list.unshift(content)
            setVidjetDataArray(list)
            closeWindow()
        }
    }, [respCarusel])


    useEffect(() => {
        if (!changefile) return
        setFiles(changefile)
    }, [changefile])

    const delItem = (file, index) => {
        console.log(file, index)
        if (file) {
            console.log('файла нет')
            const list = [...files]
            list.splice(index, 1)
            setChangeFile(list)
        } else {
            console.log('файл есть', vidjArr, content, index, id)
            const list = [...vidjArr]
            list.map((el, i) => {
                if (el.id == id) {
                    console.log(el)
                    el.body.images.splice(index, 1)
                }
            })

            /* list.body.images.splice(index, 1) */
            console.log(list)
            setVidjetData(list)

        }


    }
    const CarouselList = ({ files, urls }) => {
        console.log('создаем карусель лист ')
        if (urls != null) {
            console.log('urlsfile', urls)
            return urls.images.map((el, i) => {
                return <CaruselItem delHandler={delItem} key={i} urlFile={el} index={i} />
            })
        }
        console.log('нет urlsfile', urls)
        return files.map((el, i) => {
            return <CaruselItem delHandler={delItem} key={i} file={el} index={i} />
        })
    }

    return (
        <PopUp title="Карусель картинок" closePopup={closeWindow} saveHandler={() => saveList()}>
            <div className='timer-conteiner d-flex'>
                <div className=' p-3 w-100 '>
                    <h3 className='question-item-header mb-4'>Добавление слайдов</h3>
                    <div className='items-list'>
                        <CarouselList files={files} urls={body ? content : null} />
                    </div>
                    <input ref={root} className='items-input-hidden' accept="image/*" type='file' onChange={(evt) => addFile(evt.target.files[0])} />
                    <Button classes={['w-100 mw-100 text-left new-slide-button']} disabled={!isValidLimitSlide} onClick={clickHandler} title='+ новый слайд ' />
                    {!isValidLimitSlide ? <p className='text-danger'>Не больше трех слайдов</p> : null}
                    <div className='mt-4 carusel-input-duration-container'>
                        <h3 className='question-item-header mb-4'>Автоматическая смена слайдов</h3>
                        <div className='d-flex '>
                            <input type='number' className=' question-item-input w-8 carusel-input-duration' value={interval} onChange={(evt) => setInterval(evt.target.value)} />
                            <p className='items-label m-0'>Cек</p>
                        </div>
                    </div>
                </div>
            </div>
            {/*   <div className='block-question-save'><p onClick={() => saveList()} className='block-question-button-save'>Сохранить</p></div> */}
        </PopUp>
    )
}

export default Carusel;