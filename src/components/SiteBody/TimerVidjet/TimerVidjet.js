import React, { useEffect, useState, useContext, useMemo } from 'react'
import './timerVidjet.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import TimerNumber from './TimerNumber/TimerNumber'
import useFetch from '../../../hooks/useFetch'
import Context from '../../../Context'
import WidjetWrapper from '../../../UI/VidjetVrapper/WidjetWrapper'
import Timer from '../../BlockEditor/BlockMenu/Timer/Timer'
import {ContextAddBlock} from '../../../ContextAddBlock'
import ButtonAddComponent from '../../../UI/ButtonAddComponent/ButtonAddComponent'
import ContextEditor from '../../../ContextEditor'
const dateFormat = date => date.toLocaleString('ru', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })
const createTime = (type, value = {}) => {
    const { toDateDate, toDateTime, onDateDatumPoint, onDateDuration, cyclingDuration, cyclingDatePoint, timerCreated } = value

    let currentDate;
    let expirationDate;
    if (type == 'to_date') {
        currentDate = Date.now()
        expirationDate = Date.parse(toDateDate + ' ' + toDateTime)
        /*     console.log(toDateDate, toDateTime)
            console.log(expirationDate) */
    }

    

    if (type === 'on_date') {
        currentDate = Date.now()
        /* const days = onDateDuration.join(':') */
        const date = onDateDuration.split(':').map(el => Number(el))
        const days = date[0] * 86400000
        const hours = date[1] * 3600000
        const minuts = date[2] * 60000
        expirationDate = (days + hours + minuts) + Date.parse(timerCreated)
    }

    if (type === "cycle") {
        currentDate = Date.now()
        const date = cyclingDuration.split(':').map(el => Number(el))
        const hours = date[0] * 3600000
        const minuts = date[1] * 60000
        expirationDate = (hours + minuts) + Date.parse(timerCreated)

    }

    const timerCountSecond = (expirationDate - currentDate) / 1000
    const timerCountMinut = (timerCountSecond) / 60
    const timerCountHour = timerCountMinut / 60

    return {
        days: Math.floor(timerCountHour / 24),
        hours: Math.floor(timerCountHour % 24),
        minutes: Math.floor(timerCountMinut % 60),
        seconds: Math.floor(timerCountSecond % 60)
    }
    // /console.log(type, toDateDate, toDateTime, onDateDatumPoint, onDateDuration, cyclingDuration, cyclingDatePoint)
}

const TimerVidjet = ({ body, id ,replaceVidj, bgColor}) => {

    const [respDelVideo, doFetchDelVideo] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=delete_catalog_landing_prop_data')
    const [respEditTimer, doFetchEditTimer] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=set_landing_prop_data')
    const {state, changeState, setState, catalogId} = useContext(Context)
    const [type, setType] = useState(body.type)
    const {days, hours, minutes, seconds } = createTime(type, body)
    const [backgrounColor, setBackgroundColor] = useState(bgColor)
    const [viewEdit, setViewEdit] = useState(false)
    const [setCurrentWidjet, setIsEditer, setVidjetData, vidjArr] = useContext(ContextEditor)
    const {isOpenEditBlock, setIsOpenEditBlock} = useContext(ContextAddBlock)
    const editHandler = () => {
        setViewEdit(true)
    }


    

    console.log('body timer', backgrounColor)
    const [second, setSecond] = useState(() => {
        if(body.type === 'cycle' ){
            const {seconds} = createTime(type, body)
            return seconds < 0 ? 0 : seconds
         }
        return seconds < 0 ? 0 : seconds
    })
    const [minut, setMinut] = useState(() => {
        if(body.type === 'cycle'){
           const {minutes} = createTime(type, body)
           return minutes < 0 ? 0 : minutes
        }
        return minutes < 0 ? 0 : minutes
    })
    const [hour, setHour] = useState(() => {
        if(body.type === 'cycle'){
            const {hours} = createTime(type, body)
            return hours < 0 ? 0 : hours
         }
        return hours < 0 ? 0 : hours
    })
    const [day, setDay] = useState(()=>{
        if(body.type === 'cycle'){
            const {days} = createTime(type, body)
            return days < 0 ? 0 : days
         }
        return days < 0 ? 0 : days
    })
    const delHandler = () => {

        const formData = new FormData()
        formData.set('landing_prop_id', 4)
        formData.set('catalog_id', catalogId)
        formData.set('landing_prop_data_id', id)
        doFetchDelVideo(formData)

    }

/*    const fetchBackgroundColor = (color) =>{
        console.log(color)
        const formData = new FormData()
        formData.set('landing_prop_id', 7)
        formData.set('catalog_id', catalogId)
        formData.set('background_color', color)
        doFetchEditTimer(formData)
    } */

    const closeEdit = () => setViewEdit(false)

    useEffect(()=>{
        if(!respDelVideo) return
        
        const list = [...vidjArr]
        list.map((el, i) => {
            if (!el) return
            if (el.id === id) {
                list.splice(i, 1)
            }
        })
        setVidjetData(list)

    },[respDelVideo])


    useEffect(() => {
        if (day <= 0 && hour <= 0 && minut <= 0 && second <= 0) return
        const timer = setInterval(() => {
            setSecond(state => state = state - 1)

            if (second === 0) {
                setMinut(state => state -= 1)
                setSecond(59)
            }
            if (minut === 0 && second === 0) {
                setHour(state => state -= 1)
                setMinut(59)
            }
            if (hour === 0 && minut === 0 && second === 0) {
                setDay(state => state -= 1)
                setHour(23)
            }

        }, 1000)

        return () => clearInterval(timer)
    }, [second])


    

    return (
        <div className='questions-container ' style = {{backgroundColor: [backgrounColor]}}>
            <div className='container question-center '>
                <WidjetWrapper id={id} replaceVidj = {replaceVidj} setBackground = {setBackgroundColor} isView={viewEdit} setViewEdit={setViewEdit} delHandler = {delHandler} editWindow={ <Timer setViewEdit={editHandler}  id={id} content={{ id: id, title: 'video', body: body }} closeEdit={() => setViewEdit(false)} />} >
                <div className='questions-body' >
                   {/*  <h3 className='question-h3 mb-3 text-center'>До конца акции </h3> */}
                    <div className='timer-number-conteiner'>
                        <ul className='timer-number-list pl-0'>
                            <li className='timer-number-item d-flex justify-content-center flex-column'>
                                <div className='timer-number my-0 mx-auto'>
                                    <TimerNumber title='Дни' number={day} />
                                </div>
                                <p className='timer-absolut-p'>Дней</p>
                            </li>
                            <li className='timer-number-item d-flex justify-content-center flex-column'>
                                <div className='timer-number my-0 mx-auto'>
                                    <TimerNumber title='Часы' number={hour} />
                                </div>
                                <p className='timer-absolut-p'>Часов</p>
                            </li>
                            <li className='timer-number-item d-flex justify-content-center flex-column'>
                                <div className='timer-number my-0 mx-auto'>
                                    <TimerNumber title='Минуты' number={minut} />
                                </div>
                                <p className='timer-absolut-p'>Минут</p>
                            </li>
                            <li className='timer-number-item d-flex justify-content-center flex-column'>
                                <div className='timer-number my-0 mx-auto'>
                                    <TimerNumber title='Секунды' number={second} />
                                </div>
                                <p className='timer-absolut-p'>Секунд</p>
                            </li>

                        </ul>
                    </div>
                </div>
            </WidjetWrapper>
            <ButtonAddComponent isVidjetButton = {true} onClick={() => setIsOpenEditBlock(false)}/>
            </div>
            {/* {viewEdit ? <Video setViewEdit={setViewEdit} id={id} content={{ id: id, title: 'video', body: body }} /> : null} */}
        </div>
    )
}
export default TimerVidjet