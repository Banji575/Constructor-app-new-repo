import React from 'react'
/* import { CKEditor } from '@ckeditor/ckeditor5-react' */
import Utils from '../../../scripts/Utils'
/* import ClassicEditor from '@ckeditor/ckeditor5-build-classic' */
import CKEditor from 'ckeditor4-react-advanced'
const Text = ({setText, text}) => {
    console.log(text)
    return(
        <div>
            <CKEditor
                    /* data={content ? content.title : ''} */
                    data = {text}
                  /*   onBlur={(evt) => changeTitleHandler(evt.editor)} */
                    /* onChange={(e,text)=>setTitle(e.editor.getData())} */

                    config={{
                        toolbar: [Utils.CKEditorTools],
                        height:'60px'
                    }}
                    onChange = {(e)=>setText(e.editor.getData())}
                />
            
           {/*  <CKEditor
        editor={ClassicEditor}
        data={text ? text : ''}
        config={{
            toolbar: {
                items: [
                    'fontfamily', 'fontsize', '|',
                    'alignment', '|',
                    'fontColor', 'fontBackgroundColor', '|',
                    'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
                    'insertTable', '|',
                    'imageUpload', 'blockQuote', '|',
                    'undo', 'redo'
                ],
                shouldNotGroupWhenFull: true
            }
        }}
        onChange = {(event, editor)=>setText(editor.getData())}
    /> */}</div>
    )
}
 
export default Text;