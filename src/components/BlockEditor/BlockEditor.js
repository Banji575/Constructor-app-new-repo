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
import { faCommentsDollar, faLessThanEqual } from '@fortawesome/free-solid-svg-icons'
import { queryByTestId } from '@testing-library/dom'


const BlockEditor = () => {
    /*  const [isOpenEditBlock, setIsOpenEditBlock] = useState(true) */
   
    const [currentWidjet, setCurrentWidjet] = useState(null)
    const {state, changeState, setState, catalogId, setVidjetData, vidjArr=[], vidjetData} = useContext(Context)
   
    const { isOpenEditBlock, setIsOpenEditBlock } = useContext(ContextAddBlock)
    const changeWidget = (text) => {
        setIsOpenEditBlock(true)
        setCurrentWidjet(text)
    }

  
    const openWidjet = () => {
        switch (currentWidjet) {
            case 'questions': return <BlockQueston setVidjetData={setVidjetData} vidjArr={vidjetData}  />
            case 'text': return <Text setVidjetData={setVidjetData} vidjArr={vidjetData} />
            case 'banner': return <Banner setVidjetData={setVidjetData} vidjArr={vidjetData} />
            case 'contacts': return <Contacts setVidjetDataArray={setVidjetData} vidjArray={vidjetData} />
            case 'social': return <Social setVidjetDataArray={setVidjetData} vidjArray={vidjetData} />
            case 'callback': return <Feedback setVidjetDataArray={setVidjetData} vidjArray={vidjetData} />
            case 'timer': return <Timer setVidjetDataArray={setVidjetData} vidjArray={vidjetData} />
            case 'video': return <Video setVidjetDataArray={setVidjetData} vidjArray={vidjetData} />
            /* case 'map': return <Maps /> */
            case 'items': return <Items setVidjetDataArray={setVidjetData} vidjArray={vidjetData} />
            case 'carusel': return <Carusel setVidjetDataArray={setVidjetData} vidjArray={vidjetData} />
            default: return null
        }
    }

    const showAddButtonSiteBody = () =>{
        if(vidjetData == null) return true
        if(vidjetData.length === 0) return true
        return false
    }

    console.log('дебажим двойные кнопки',vidjetData )

/*     console.log(showAddButtonSiteBody(), vidjArr.length === 0) */

    return (
        <ContextEditor.Provider value={[setCurrentWidjet, setIsOpenEditBlock]}>
            <div className='container d-flex'>
                {isOpenEditBlock && showAddButtonSiteBody() ?  <ButtonAddComponent  onClick={() => setIsOpenEditBlock(false)}/>:null}
                {!isOpenEditBlock && <PopUp closePopup={setIsOpenEditBlock} editMode={false} title='Добавить блок'> <BlockMenu setCurrentWidjet={(text) => changeWidget(text)} hideBlock={setIsOpenEditBlock} /></PopUp>}
                {openWidjet()}
            </div>
        </ContextEditor.Provider>
    )
}

export default BlockEditor