import React, { useEffect, useState, useCallback } from 'react'
import useFetch from '../../../../../hooks/useFetch'
import Button from '../../../../../UI/Button/Button'
import Cropper from 'react-easy-crop'
import { Slider } from '@material-ui/core'
import getCroppedImg from '../../../../../scripts/CropImage'
import './newItems.css'

const NewItem = ({ setView, img, createNewItem }) => {
    const [resp, doFetch] = useFetch('https://cloudsgoods.com/api/ObjectController.php?mode=search_objects_categories')
    const [itemName, setItemName] = useState('')
    const [itemCategory, setItemCategory] = useState(null)
    const [itemPrice, setItemPrice] = useState('')
    const [isValidName, setIsValidName] = useState(true)
    const [isValidPrice, setIsValidPrice] = useState(true)
    const [isVaidCategory, setIsValidCategory] = useState(true)
    const [category, setCategory] = useState(null)

    // useState для cropper
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels)
    }, [])


    const showCroppedImage = () => {
        console.log('test crop button')
    }


    useEffect(() => {
        console.log('test')
        const formData = new FormData()
        /* formData.set('mode', 'search_objects_categories') */
        doFetch(formData)
    }, [])

    useEffect(() => {
        if (!resp) return
        setCategory(resp.items)
        console.log(resp.items)
    }, [resp])

    const addItem = () => {
        if (itemName.length === 0) {
            console.log('Поле имя false')
            setIsValidName(false)
            return
        }
        setIsValidName(true)
        if (itemPrice.length === 0) {
            console.log('Поле цена')
            setIsValidPrice(false)
            return
        }

        setIsValidPrice(true)
        createNewItem(itemName, itemPrice)
        setView(false)

    }


    return (
        <div className='item-new-container'>
     {/*        <div className='item-new-image-wrapper'>
                <div className = 'w-25'>
                    <Cropper
                        image={img}
                        crop={crop}
                        zoom={zoom}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        aspect={4 / 3}
                    />
                </div>
                <Slider
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    onChange={(e, zoom) => setZoom(zoom)}
                />

            </div>
            <button onclick={showCroppedImage}>Cropp</button> */}
              <div className='item-new-image-wrapper'>
                <img src={img} />
            </div>
            <div className='item-new-desc-wpapper'>
                <div className='input-wpapper'>
                    <div className='w-100'>
                        <label htmlFor='item-desc'>Выберите категорию</label>
                        {/*  <input id='item-desc' value={itemName} onChange={evt => setItemName(evt.target.value)} type='text' /> */}
                        <select className='w-100' onChange={evt => setItemCategory(evt.target.value)}>
                            {category ? category.map((el, i) => {
                                return <option value={el.id}>{el.title}</option>
                            }) : null}
                        </select>
                        {!isVaidCategory ? <p className='text-danger'>Выберите категорию</p> : null}
                    </div>
                    {!isValidName ? <p className='text-danger'>Поле не должно быть пустым</p> : null}
                </div>
                <div className='input-wpapper'>
                    <div className='w-100'>
                        <label htmlFor='item-desc'>Введите название товара</label>
                        <input className='w-100' id='item-desc' value={itemName} onChange={evt => setItemName(evt.target.value)} type='text' />
                    </div>
                    {!isValidName ? <p className='text-danger'>Поле не должно быть пустым</p> : null}
                </div>
                <div className='input-wpapper'>
                    <div className='w-100'>
                        <label htmlFor='item-price'>Укажите стоимость товара</label>
                        <input className='w-100' id='item-price' value={itemPrice} onChange={evt => setItemPrice(evt.target.value)} type='number' />
                    </div>
                    {!isValidPrice ? <p className='text-danger'>Поле не должно быть пустым</p> : null}

                </div>

                <div>
                    <Button title='Отмена' onClick={() => setView(false)} />
                    <Button title="Применить" onClick={() => addItem()} />
                </div>

            </div>
        </div>
    )
}

export default NewItem;