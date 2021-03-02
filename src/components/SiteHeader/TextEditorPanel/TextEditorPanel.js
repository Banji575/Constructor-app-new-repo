import React from 'react'
import EditBackground from './EditBackground/EditBackground'
import EditText from './EditText/EditText'
import './textEditorPanel.css'

const TextEditorPanel = () => {
    return(
        <div className = 'text-editor-panel'>
            <EditBackground/>
            <EditText />
        </div>
    )
}

export default TextEditorPanel