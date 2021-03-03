import React, { useContext, useEffect, useState } from 'react'
import './blockEditor.css'
import BlockMenu from './BlockMenu/BlockMenu'
import BlockQueston from './BlockMenu/BlockQuestion/BlockQuestion'
import ContextEditor from '../../ContextEditor'
import Context from '../../Context'
import useFetch from '../../hooks/useFetch'
import Text from './BlockMenu/Text/Text'
import Banner from './BlockMenu/Banner/Banner'
import Contacts from './BlockMenu/Contacts/Contacts'
import Social from './BlockMenu/Social/Social'
import Feedback from './BlockMenu/FeedBack/Feedback'
import Timer from './BlockMenu/Timer/Timer'
import Video from './BlockMenu/Video/Video'
import Maps from './BlockMenu/Maps/Maps'
import Items from './BlockMenu/Items/Items'
import Carusel from './BlockMenu/Carusel/Carusel'
import PopUp from '../../UI/PopUp/PopUp'
import ButtonAddComponent from '../../UI/ButtonAddComponent/ButtonAddComponent'
import { ContextAddBlock } from '../../ContextAddBlock'

const changeDataObjForBackend = (formdata, arr) => {
    arr.forEach((el, i) => {
        formdata.set(`issue[${i}]`, `${el.answer}`)
        formdata.set(`answer[${i}]`, `${el.answer}`)
    })
    return formdata
}

const BlockEditor = () => {
    /*  const [isOpenEditBlock, setIsOpenEditBlock] = useState(true) */
    const [objNewQuestion, setObjNewQuestion] = useState(null)
    const [currentWidjet, setCurrentWidjet] = useState(null)
    const [state, changeState, setState, catalogId, setVidjetData, vidjArr] = useContext(Context)
    const [response, doFetch] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=set_landing_prop_data')
    const { isOpenEditBlock, setIsOpenEditBlock } = useContext(ContextAddBlock)
    const changeWidget = (text) => {
        setIsOpenEditBlock(true)
        setCurrentWidjet(text)
    }

    const changeStateVidjet = (obj, questionTitle) => {
        const vidjetName = Object.keys(obj)[0]
        const newState = { ...state }
     /*    newState.siteVidjets[vidjetName] = obj[vidjetName]
        console.log(newState, 'newState')
        setState(newState) */
        setObjNewQuestion(obj)
        const formData = new FormData()
        formData.set('landing_prop_id', 2)
        formData.set('catalog_id', catalogId)
        formData.set('title', questionTitle)
        changeDataObjForBackend(formData, obj.questions)
        doFetch(changeDataObjForBackend(formData, obj.questions))
    }

    useEffect(() => {
        if (!response) {
            return
        }
        const list = [...vidjArr]
        list.push({ title: 'question', id: String(response.landing_prop_data_id),blockTitle:response.$update_game.title, body: objNewQuestion.questions })
        console.log('response',response)
        setVidjetData(list)
    }, [response])
    const openWidjet = () => {
        switch (currentWidjet) {
            case 'questions': return <BlockQueston setVidjetData={setVidjetData} vidjArr={vidjArr} changeStateVidjet={changeStateVidjet} />
            case 'text': return <Text setVidjetData={setVidjetData} vidjArr={vidjArr} />
            case 'banner': return <Banner setVidjetData={setVidjetData} vidjArr={vidjArr} />
            case 'contacts': return <Contacts setVidjetDataArray={setVidjetData} vidjArray={vidjArr} />
            case 'social': return <Social setVidjetDataArray={setVidjetData} vidjArray={vidjArr} />
            case 'callback': return <Feedback setVidjetDataArray={setVidjetData} vidjArray={vidjArr} />
            case 'timer': return <Timer setVidjetDataArray={setVidjetData} vidjArray={vidjArr} />
            case 'video': return <Video setVidjetDataArray={setVidjetData} vidjArray={vidjArr} />
            /* case 'map': return <Maps /> */
            case 'items': return <Items setVidjetDataArray={setVidjetData} vidjArray={vidjArr} />
            case 'carusel': return <Carusel setVidjetDataArray={setVidjetData} vidjArray={vidjArr} />
            default: return null
        }
    }
    console.log('vidjArr', vidjArr)

    return (
        <ContextEditor.Provider value={[setCurrentWidjet, setIsOpenEditBlock]}>
            <div className='container d-flex'>
                {isOpenEditBlock && vidjArr.length===0 ?  <ButtonAddComponent  onClick={() => setIsOpenEditBlock(false)}/>:null}
                {!isOpenEditBlock && <PopUp closePopup={setIsOpenEditBlock} editMode={false} title='Добавить блок'> <BlockMenu setCurrentWidjet={(text) => changeWidget(text)} hideBlock={setIsOpenEditBlock} /></PopUp>}
                {openWidjet()}
            </div>
        </ContextEditor.Provider>

    )
}

export default BlockEditor