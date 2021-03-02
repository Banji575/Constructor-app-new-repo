import React from 'react'
import './previewMode.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faDesktop, faTabletAlt, faMobileAlt } from '@fortawesome/free-solid-svg-icons'
import PreviewBlockIcon from '../PreviewBlock/PreviewBlockIcon/PreviewBlockIcon'
const PreviewMode = ({ changeViewMode }) => {

    return (
        <div className='preview-mode'>
            <div className = 'd-flex justify-content-center flex-column'>
                <p onClick={() => changeViewMode()} className='preview-item preview-item-prev text-left mb-0  mr-3 pr-3'> Редактировать </p>
            </div>
            <div className='preview-mode-icon-block d-flex justify-content-center flex-column'>
              {/*   <FontAwesomeIcon className='mr-5' icon={faDesktop} size='3x' />
                <FontAwesomeIcon className='mr-5' icon={faTabletAlt} size='3x' />
                <FontAwesomeIcon className='mr-5' icon={faMobileAlt} size='3x' /> */}
                <PreviewBlockIcon/>
            </div>
        </div>
    )
}

export default PreviewMode