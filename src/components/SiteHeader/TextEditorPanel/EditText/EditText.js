import React, { useState, useContext, useEffect } from 'react'
import './editText.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import PopUp from '../../../../UI/PopUp/PopUp'
import Text from '../../Text/Text'
import Context from '../../../../Context'
import useFetch from '../../../../hooks/useFetch'
import EditButton from '../../../../UI/EditButton/EditButton'

const EditText = ({content}) => {
    const [isEdit, setIsEdit] = useState(false)
    const [textTile, setTextTitle] = useState('')
    const [state, changeState, _, calalogId] = useContext(Context)
    const [response, doFetch] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=update_menu_title')

    const changeText = () => {
        const formData = new FormData()
        formData.set('title', textTile)
        formData.set('catalog_id', calalogId)
        doFetch(formData)
    }

    useEffect(()=>{
        if(!response) return
        const obj = {'siteTitle' : textTile}
        changeState(obj)
        closePopUp()
    },[response])

    const closePopUp = () => {
        setIsEdit(false)
        
    }

    const saveChange = () => {
        console.log('text')
    }

    return (
        <div>
            <div className='edit-text'>
                <EditButton openEdit = {setIsEdit}/>
             {/*    <FontAwesomeIcon fontWeight = 'light' onClick={() => setIsEdit(state => !state)} icon={faEdit} size='2x' /> */}
            </div>
            {isEdit ?
                <PopUp title='Текст' saveHandler={changeText} closePopup={closePopUp} >
                    <Text text = {content} setText={setTextTitle} />
                </PopUp> : null}
        </div>
    )
}

export default EditText