import React from 'react'
import './previewFile.css'
const PreviewFile = ({changeImg, imgArr = [] , activeImg}) => {

    const className = ['my-items-item my-items-preview']
    return (
        <ul className='my-items-list justify-content-center p-0 mt-3'>
                    {imgArr.map((el, i,arr) => {
                            return <div className="col-3 col-md-2 frame-border mr-1 ">
                            <div

                                key={i}
                                onClick={() => changeImg(el)}
                                className='my-items-item my-items-preview'>
                                <img className='my-items-elem-img' src={el} />
                            </div>
                        </div>
                    })}
                </ul>
    )
}

export default PreviewFile