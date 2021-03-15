import React, {useContext} from 'react'
import Context from '../../Context'
import './mobilePreview.css'
const MobilePreview = () => {
    const {state, changeState, setState, catalogId, setVidjetData, vidjArr,decktopMode,setDecktopMode} = useContext(Context)
    const url = window.location.href
    return (
        <div className='mobile-preview-container'>
            <div className = 'mobile-preview-shell'>
             {/*    <iframe src={`/?id=${catalogId}&?mobile-mode`}></iframe> */}
                <iframe className = 'iframe' src={`${url}&?mobile-mode`}></iframe>
            </div>
        </div>
    )
}

export default MobilePreview