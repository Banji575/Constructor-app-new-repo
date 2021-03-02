import React, { useState } from 'react'
import './timerNumber.css'

const TimerNumber = ({ type, number, title }) => {
    const num = String(number)
    return (
        <React.Fragment>
            <div className='timer-number-conteiner'>
                <div className='d-flex'>
                    <div className='timer-number my-0 mx-auto'>{num.length < 2 ? 0 : num[0]}</div>
                    <div className='timer-number my-0 mx-auto'>{num.length < 2 ? num : num[1]}</div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default TimerNumber;