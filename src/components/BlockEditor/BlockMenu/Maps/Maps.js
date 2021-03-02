import React, { useState } from 'react'
import { YMaps, Map, SearchControl, Placemark } from 'react-yandex-maps'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import Button from '../../../../UI/Button/Button'
import './maps.css'

const Maps = () => {
    const [defaultCoords, setDefaultCoords] = useState([55.684758, 37.738521])
    const MyMapComponent = (props) =>
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: -34.397, lng: 150.644 }}
        >
            {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
        </GoogleMap>
    const changeCoords = () => {
        console.log(';lasdfljasd;lajsd;lasdfl;jasd')
        setDefaultCoords([33, 78])
    }
    return (
        <div className='block-question-conteiner'>
            <div className='block-menu-header'>
                <h3>Карты</h3>
                <div /* onClick={closeWindow} */ className='block-header-close'></div>
            </div>
            <div className='timer-conteiner d-flex'>
                <div className='mx-auto my-0 p-3'>
                    <h3 className='question-item-header'>Заголовок</h3>
                    <textarea className=' question-item-input' />

                    <YMaps>
                        <Map state={{ center: defaultCoords, zoom: 9, }}>
                            <SearchControl />
                            <Placemark geometry={[55.684758, 37.738521]} />
                        </Map>
                    </YMaps>
                    <h3 className='question-item-header mt-3'>Введите адрес метки</h3>
                    <div className='d-flex'>
                        <input className=' question-item-input' /><button className='maps-add-tag-button'>Добавить метку</button>
                    </div>
                </div>
            </div>
            <div className='block-question-save'><p /* onClick={() => saveList()} */ className='block-question-button-save'>Сохранить</p></div>
        </div>

    )
}

export default Maps