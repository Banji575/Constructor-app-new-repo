import React, { useEffect, useState } from 'react'
import SocialItem from './SocialItem/SocialItem'
import CKEditor from 'ckeditor4-react-advanced'
import Utils from '../../../../../scripts/Utils'
import './socialBlock.css'


const SocialBlock = ({ blockTitle, itemArr, content, saveItem, blockName, saveTitle, isValid }) => {
    const [firstLoad, setFirstLoad] = useState(false)
    const [customTitle, setCustomTitle] = useState('')

    const [title, setTitle] = useState(!firstLoad ? content.title : customTitle)


    
    return (
        <div className='social-block-container'>
            <h3 className='social-block-h mb-3'>{Utils.createHTML(blockTitle)}</h3>
            <div className='social-block-header'>
                <p className='question-item-header'>Заголовок </p>
                <CKEditor
                    data={title}
                    onBlur={()=>saveTitle(blockName, customTitle)}
                    onChange={(e)=>setCustomTitle(e.editor.getData())}
                    config={{
                        toolbar: [Utils.CKEditorTools],
                        height:'35px'
                    }}
                />
               {/*  <input type='text' value={customTitle} placeholder={title} onChange={(evt) => setCustomTitle(evt.target.value)} onBlur={()=>saveTitle(blockName, customTitle)} /> */}
                {itemArr.map((el, i) => {
                    return <SocialItem isValid = {isValid} blockName={blockName} saveItem={saveItem} data={content[el.name]} title={el.title} name={el.name} key={i} />
                })}
            </div>
        </div>
    )
}

export default SocialBlock