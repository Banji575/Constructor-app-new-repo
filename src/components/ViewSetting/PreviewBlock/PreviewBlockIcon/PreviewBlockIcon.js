import React, { useState,useEffect } from 'react'
/* import decktopOn from '../../../../image/IcoNos/decktopOn.png'
import decktopOff from '../../../../image/IcoNos/decktopOff.png' */
/* import decktopOn from '../../uploads/decktopOn.png'
import decktopOff from '../../uploads/decktopOff.png'
import mobileOff from '../../uploads/mobileOff.png'
import mobileOn from '../../uploads/mobileOn.png' */
/* import mobileOff from '../../../../image/IcoNos/mobileOff.png'
import mobileOn from '../../../../image/IcoNos/mobileOn.png' */

/* import decktopOff from '../../../../image/IcoNos/decktopOff.png'
import mobileOn from '../../../../image/IcoNos/mobileOn.png' */
/* import mobileOff from '../../../../image/IcoNos/mobileOff.png' */
import './previewBlockIcon.css'


let mobileOn = '//cloudsgoods.com/work/uploads/mobile.png'
let mobileOff = '//cloudsgoods.com/work/uploads/mobileOff.png'
let decktopOn = '//cloudsgoods.com/work/uploads/decktopOn.png'
let decktopOff = '//cloudsgoods.com/work/uploads/decktoOff.png'

let deck
const PreviewBlockIcon = ({typeViewMode,decktopOrMobileMode}) => {
    const [previewMode, setPreviewMode] = useState('mobile')
   /*  const decktopSrc = previewMode === 'decktop' ? decktopOn : decktopOff
    const mobileSrc = previewMode === 'mobile' ? mobileOn : mobileOff */
    const decktopSrc = previewMode === 'decktop' ? decktopOn : decktopOff
    const mobileSrc = previewMode === 'mobile' ? mobileOn : mobileOff
/*     const mobileSrc = previewMode === 'mobile' ? mo : moff */
    console.log(previewMode)


    const changeMode = (type) => {
        if(type === previewMode) return
        setPreviewMode(type)
        decktopOrMobileMode()
        /* console.log(decktopOrMobileMode) */
    }


    useEffect(()=>{
        typeViewMode(previewMode)
        console.log('preview block icon triggerd')
    },[previewMode])

    return (
        <React.Fragment>{
                <React.Fragment>
                    <div className = 'd-flex'>
                       {/*  <div onClick = {()=>previewMode === 'mobile' ? setPreviewMode('decktop') : null}> */}
                        <div onClick = {()=>changeMode('decktop')}>
                            <img src={decktopSrc} className='preview-mode-icon preview-mode-icon-deck' />
                        </div>
                        {/* <div onClick = {()=>previewMode === 'decktop' ? setPreviewMode('mobile') : null}> */}
                        <div onClick = {()=>changeMode('mobile')}>
                            <img src='' className='preview-mode-icon preview-mode-icon-mobi' />
                        </div>
                    </div>
                </React.Fragment> 
        }</React.Fragment>
    )
}

export default PreviewBlockIcon