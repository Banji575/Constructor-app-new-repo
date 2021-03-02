import React, { useState } from 'react'
import decktopOn from '../../../../image/IcoNos/decktopOn.png'
import decktopOff from '../../../../image/IcoNos/decktopOff.png'
import mobileOn from '../../../../image/IcoNos/mobileOn.png'
import mobileOff from '../../../../image/IcoNos/mobileOff.png'
import './previewBlockIcon.css'

const PreviewBlockIcon = () => {
    const [previewMode, setPreviewMode] = useState('decktop')
    const decktopSrc = previewMode === 'decktop' ? decktopOn : decktopOff
    const mobileSrc = previewMode === 'mobile' ? mobileOn : mobileOff
    return (
        <React.Fragment>{
                <React.Fragment>
                    <div className = 'd-flex'>
                        <div onClick = {()=>previewMode === 'mobile' ? setPreviewMode('decktop') : null}>
                            <img src={decktopSrc} className='preview-mode-icon preview-mode-icon-deck' />
                        </div>
                        <div onClick = {()=>previewMode === 'decktop' ? setPreviewMode('mobile') : null}>
                            <img src={mobileSrc} className='preview-mode-icon preview-mode-icon-mobi' />
                        </div>
                    </div>
                </React.Fragment> 
        }</React.Fragment>
    )
}

export default PreviewBlockIcon