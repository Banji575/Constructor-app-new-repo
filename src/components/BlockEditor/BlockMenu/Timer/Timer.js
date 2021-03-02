import React, { useState, useContext, useEffect } from 'react'
import './timer.css'
import TimerCyclical from './TimerCyclical/TimerCyclical'
import TimerForInterval from './TimerForInrerval/TimerForInterval'
import TimerToDate from './TimerToDate/TimerToDate'
import ContextEditor from '../../../../ContextEditor'
import Context from '../../../../Context'
import useFetch from '../../../../hooks/useFetch'
import PopUp from '../../../../UI/PopUp/PopUp'
import Adapter from '../../../../scripts/Adapter'

const dateFormat = date => date.toLocaleString('ru', { year: 'numeric', month: 'numeric', day: 'numeric' })
const generateId = () => Math.random()
const Timer = ({ closeEdit, content, setVidjetDataArray, vidjArray }) => {
    const [timerParams, setTimerParams] = useState(content || { title: 'timer', type: 'to_date', id: generateId(), body: { toDateDate: dateFormat(new Date), toDateTime: '12:00', onDateDatumPoint: 'firstView', onDateDuration: '0:00:00', cyclingDatePoint: '12:00', cyclingDuration: '0:00', test: 'test' } })
    const [setCurrentWidjet, setIsEditer] = useContext(ContextEditor)
    const [state, changeState, setState, catalogId] = useContext(Context)

    const [type, setType] = useState(content ? content.type : 'to_date')
    const [respEditTimer, doFetchEditTimer] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=set_landing_prop_data')
    console.log(timerParams, 'a;ljdaslkjdsaflkjdsfkljdaskljdas')
  /*   console.log(setIsEditer, 'closeEdit') */
    const closeWindow = () => {
        if (closeEdit) {
            closeEdit()
        } else
            setCurrentWidjet(null)
    }

    console.log(content)

    const getTimerParametr = (obj) => {
        console.log(type)
        const { toDateDate, toDateTime, onDateDatumPoint, onDateDuration, cyclingDuration, cyclingDatePoint } = obj
        const body = { ...timerParams.body, toDateDate, toDateTime, onDateDatumPoint, onDateDuration, cyclingDuration, cyclingDatePoint }
        setTimerParams(state => ({ ...state, type, body }))
    }

    const timerTypeObj = (type) => {
        switch (type) {
            case 'to_date': return <TimerToDate getParams={getTimerParametr} />
            case 'on_date': return <TimerForInterval getParams={getTimerParametr} />
            case 'cycle': return <TimerCyclical getParams={getTimerParametr} />
        }
    }

    const changeSelectHandler = evt => setType(evt.target.value)


    const saveList = () => {
        const { toDateDate, toDateTime, onDateDatumPoint, onDateDuration, cyclingDuration, cyclingDatePoint } = timerParams.body
        const formData = new FormData()
        formData.set('landing_prop_id', 7)
        formData.set('catalog_id', catalogId)
        formData.set('title', type)
        if (type === 'to_date') {
            formData.set('to_date_date', toDateDate)
            formData.set('to_date_time', toDateTime)
        }
        if (type === 'on_date') {
            formData.set('on_date_datum_point', onDateDatumPoint)
            formData.set('on_date_duration', onDateDuration)
        }
        if (type === 'cycle') {
            formData.set('cycle_datum_point', cyclingDatePoint)
            formData.set('cycle_duration', cyclingDuration)
        }



        doFetchEditTimer(formData)
    }

    useEffect(() => {
        if (!respEditTimer) return
        if (respEditTimer.success === 'Успешно!') {
            const list = [...vidjArray]
            list.unshift(timerParams)

            setVidjetDataArray(list)
          

            console.log(respEditTimer)
            window.location.reload()
            closeWindow()
        }
    }, [respEditTimer])

    return (
        <PopUp title="Таймер" closePopup={closeWindow} saveHandler={() => saveList()}>
            {/*  <div className='block-question-conteiner'>
            <div className='block-menu-header'>
                <h3>Таймер</h3>
                <div onClick={closeWindow} className='block-header-close'></div>
            </div> */}
            <div className='timer-conteiner'>
                <div className='timer-type-block'>
                    <p className='question-item-header'>Тип таймера</p>
                    <p><select onChange={(evt) => changeSelectHandler(evt)} className='timer-select' name="timer">
                        <option defaultValue value='to_date'>До определенной даты</option>
                        <option value="on_date">На промежуток времени</option>
                        <option value="cycle">Цикличный</option>
                    </select></p>
                </div>
                <div className='timer-timerType-block p-3'>
                    {timerTypeObj(type)}
                </div>
            </div>
            {/* <div className='block-question-save'><p onClick={() => saveList()} className='block-question-button-save'>Сохранить</p></div> */}
        </PopUp>
    )
}
export default Timer