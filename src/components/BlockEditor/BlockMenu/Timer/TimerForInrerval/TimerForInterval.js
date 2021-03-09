import React, { useState,useEffect } from 'react'
import './timerForInterval.css'

const lessTen = num => num.length < 2 ? `0${num}` : num

const TimerForInterval = ({getParams, content}) => {
    const [onDateDatumPoint, setOnDateDatumPoint] = useState(content ? content.body.onDateDatumPoint :  'first_view')
    const [onDateDuration, setOnDateDuration] = useState('0:00:00')
    console.log(onDateDuration)
    useState(() => {
        const dateDurationArr = onDateDuration.split(':')
        console.log(dateDurationArr)
    }, [onDateDuration])


    const startCountHandler = (elem) => {
        setOnDateDatumPoint(elem.getAttribute('id'))
    }
    useEffect(()=>{
        getParams({onDateDatumPoint, onDateDuration} )
    },[onDateDatumPoint, onDateDuration])


console.log('таймер на промежуток времени', content)


    const changeDateValue = (id, value) => {
        console.log(id, value)
        if (id === 0) {
            const newValue = value > 30 ? 30 : Math.abs(value) 
            const newDate = onDateDuration.split(':').map((el, i) => i == id ? newValue : el).join(':')
            setOnDateDuration(newDate)
        }
        if (id === 1) {
            const newValue = value > 23 ? 23 : Math.abs(value) 
            const newDate = onDateDuration.split(':').map((el, i) => i == id ? newValue : el).join(':')
            setOnDateDuration(newDate)
        }
        if (id === 2) {
            const newValue = value > 59 ? 59 : Math.abs(value) 
            const newDate = onDateDuration.split(':').map((el, i) => i == id ? newValue : el).join(':')
            setOnDateDuration(newDate)
        }
    }

    return (
        <div className=''>
            <div className='date-picker-conteiner  mr-3'>
                <p className='question-item-header mb-3'>Начало отсчета</p>
                <div className='d-flex flex-column'>
                    <label htmlFor='first_view' className='m-0 input-number-label'> <input onChange={(evt) => startCountHandler(evt.target)} id='first_view' defaultChecked="checked" name='test' type='radio' /> С первого посещения клиентом</label>
                    <label htmlFor='now' className='input-number-label'>  <input onChange={(evt) => startCountHandler(evt.target)} name='test' id='now' type='radio' /> Прямо сейчас </label>
                </div>

            </div>
            <div className='date-picker-conteiner'>
                <p className='question-item-header mb-3'>Длительность</p>
                <div className='timer-input-number-conteiner'>
                    <div className='timer-input-item'>
                        <input id='days' max={30} value={onDateDuration.split(':')[0]} onChange={(evt) => changeDateValue(0, evt.target.value)} className='timer-input-number' type='number' />
                        <label className='input-number-label w-100 text-center' htmlFor='days'>Дней</label>
                    </div>

                    <div className='timer-input-item'>
                        <input id='hours' max={24} value={onDateDuration.split(':')[1]} onChange={(evt) => changeDateValue(1, evt.target.value)} className='timer-input-number' type='number' />
                        <label className='input-number-label w-100 text-center' htmlFor='hours'>Часов</label>
                    </div>
                    <div className='timer-input-item'>
                        <input id='minuts' max={59} value={onDateDuration.split(':')[2]} onChange={(evt) => changeDateValue(2, evt.target.value)} className='timer-input-number' type='number' />
                        <label className='input-number-label w-100 text-center' htmlFor='minuts'>Минут</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimerForInterval