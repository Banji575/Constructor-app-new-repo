import React, { useEffect, useRef, useState } from 'react'
import useImageLoad from '../../../../../hooks/useImageLoad'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import './caruselItem.css'


const CaruselItem = ({ file, index, delHandler, urlFile }) => {
    const [url] = useImageLoad(file)
    const [fileUrl, setFileUrl] = useState(null)
    useEffect(() => {
        if (!url) return
        setFileUrl(url)
    }, [url])

    return (<div className='carusel-index-conteiner'>
        <div className='carusel-item-index'>
            <p>{index + 1}</p>
        </div>
        {urlFile ? <img className='carusel-item-img' src={`https://cloudsgoods.com/images${urlFile}`} /> : <img className='carusel-item-img' src={url} />}
        <div className='icon-conteiner' onClick={delHandler} color='green'>
            <FontAwesomeIcon onClick={() => delHandler(file, index)} color={'red'} icon={faTrashAlt} />
        </div>
    </div>

    )
}
export default CaruselItem