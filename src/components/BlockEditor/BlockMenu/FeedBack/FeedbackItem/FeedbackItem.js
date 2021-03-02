import React, { useState } from 'react'
import CKEditor from 'ckeditor4-react-advanced'
import Utils from '../../../../../scripts/Utils'
import './feedbackItem.css'
const FeedbackItem = ({ title, isInput, body, checkHandler, saveTitleHandler }) => {
    /* const [checked, setChecked] = useState(body.show) */
    const clasess = ['feedback-item-label']
    if(body.show){
        clasess.push('input-label-checked')
    }

    const clases = []
    if (title === 'Заголовок') {
        clases.push('d-none')
    }
    return (
        <div className='feedback-item'>
            {/* <p className='m-0 feedback-p'>{title}</p> */}
            <div className={clases.join(' ')}>
                <input id={title} type='checkbox'  onChange={() => { checkHandler(title) }} checked={body.show} className='mr-0 input-hide' />
                <label  className={clasess.join(' ')} htmlFor={title}>{title}</label>
            </div>
            {isInput && (
                <React.Fragment>
                    <CKEditor
                        data={body.text}
                        onBlur={(event) => saveTitleHandler(event.editor.getData())}
                        config={{
                            toolbar: [Utils.CKEditorTools],
                            height: '40px'
                        }}
                    />
                     <h3 className='feedback-option-h mt-5'> Форма анкеты</h3>
                </React.Fragment>
                /*  <input type = 'text' placeholder = {body.text} onBlur = {(evt)=>saveTitleHandler(evt.target.value)} className = 'w-100'/> */
            )}
        </div>
    )
}
export default FeedbackItem