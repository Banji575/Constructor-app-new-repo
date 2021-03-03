import React, {useContext} from 'react'
import EditBackground from './EditBackground/EditBackground'
import EditText from './EditText/EditText'
import './textEditorPanel.css'
import Context from '../../../Context'
const TextEditorPanel = () => {
    const [state, changeState, setState, catalogId, setVidjetData, vidjetData,decktopMode] = useContext(Context)
    console.log(state)
    return(
        <div className = 'text-editor-panel'>
            <EditBackground/>
            <EditText content = {state.siteTitle} />
        </div>
    )
}

export default TextEditorPanel