import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import calendar from '../../../../../image/calendar.png'

import "react-datepicker/dist/react-datepicker.css";
import './timerToDate.css'
const dateFormat = date => date.toLocaleString('ru', { year: 'numeric', month: 'numeric', day: 'numeric' })
const TimerToDate = ({getParams, content}) => {
    const [toDateDate, setToDateDate] = useState( content ? new Date(content.body.toDateDate) : new Date())
    const [toDateTime, setToDateTime] = useState(content ? content.body.toDateTime : '12:00')
    console.log(dateFormat(toDateDate))

    console.log(content)
    console.log(dateFormat('09.03.2021'))

    useEffect(()=>{
        getParams({toDateDate:dateFormat(toDateDate), toDateTime} )
    },[toDateDate, toDateTime])

    return (
        <div className = 'd-flex'>
            <div className='date-picker-conteiner w-100  mr-3'>
                <p className='question-item-header'>Дата</p>
                <DatePicker className='date-picker' selected={toDateDate} onChange={date => setToDateDate(date)} />
                <div className = 'calendarBlock'>
                    {/* <img src={calendar}/> */}
                </div>
               {/*  <FontAwesomeIcon className='date-picker-icon' icon={faCalendar} /> */}
            </div>
            <div className='date-picker-conteiner'>
                <p className='question-item-header'  >Время</p>
                <input className = 'input-time' type= 'time' value = {toDateTime} onChange = {(evt)=> setToDateTime(evt.target.value)}/>
            </div>
        </div>
    )
}
export default TimerToDate