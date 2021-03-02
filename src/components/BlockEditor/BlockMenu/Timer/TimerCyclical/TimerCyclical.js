import React, { useState, useEffect } from 'react'
import './timerCyclical.css'

const TimerCyclical = ({getParams}) => {
  const [cyclingDatePoint, setCyclingDatePonit] = useState('12:00')
  const [cyclingDuration, setCyclingDuration] = useState('0:00')

  const changeDateValue = (id, value) => {
    console.log(id, value)
    if (id === 0) {
        const newValue = value > 23 ? 23 : Math.abs(value) 
        const newDate = cyclingDuration.split(':').map((el, i) => i == id ? newValue : el).join(':')
        setCyclingDuration(newDate)
    }
    if (id === 1) {
        const newValue = value > 59 ? 59 : Math.abs(value) 
        const newDate = cyclingDuration.split(':').map((el, i) => i == id ? newValue : el).join(':')
        setCyclingDuration(newDate)
    }
}

useEffect(()=>{
  getParams({cyclingDatePoint, cyclingDuration} )
},[cyclingDatePoint, cyclingDuration])

    return (
        <div className='d-flex justify-content-between'>
        <div className='date-picker-conteiner  mr-3 mb-4'>
            <p className='question-item-header mb-3'>Начало отсчета</p>
            <div className = 'd-flex flex-column'>
            <label htmlFor = 'startCount' className='m-0 input-number-label'> Каждый день в <input id='startCount' onChange = {(evt)=> setCyclingDatePonit(evt.target.value)} value = {cyclingDatePoint}  name='timer-type' type='time' /></label>
            </div>
        </div>
        <div className='date-picker-conteiner'>
            <p className='question-item-header mb-3'>Длительность</p>
            <div className='timer-input-number-conteiner'>
              <div className = 'timer-input-item'>
                <input id = 'hours' onChange={(evt) => changeDateValue(0, evt.target.value)} max={23} value={cyclingDuration.split(':')[0]}  className = 'timer-input-number' type='number' />
                <label className = 'input-number-label w-100 text-center' htmlFor = 'hours'>Часов</label>
              </div>
              <div  className = 'timer-input-item'>
                <input id = 'minuts' onChange={(evt) => changeDateValue(1, evt.target.value)} max = {59} value={cyclingDuration.split(':')[1]}  className = 'timer-input-number' type='number' />
                <label className = 'input-number-label w-100 text-center' htmlFor = 'minuts'>Минут</label>

              </div>
            </div>
        </div>
    </div>
    )
}

export default TimerCyclical