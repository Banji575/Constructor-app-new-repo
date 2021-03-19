import React, { useContext, useEffect, useState } from 'react'
/* import { CKEditor } from '@ckeditor/ckeditor5-react' */
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import ContextEditor from '../../../../ContextEditor'
import Context from '../../../../Context'
import useFetch from '../../../../hooks/useFetch'
import PopUp from '../../../../UI/PopUp/PopUp'
import CKEditor from 'ckeditor4-react-advanced'
import Utils from '../../../../scripts/Utils'
//import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'

import './text.css'
import Body from '../../../../HOC/SiteBody'
const randomId = () => Math.random()
/* console.log(ClassicEditor.builtinPlugins.map(plugin => plugin.pluginName)); */
const Text = ({ content, closeEdit, vidjArr, setVidjetData, replaceVidj }) => {
    const {state, changeState, setState, catalogId} = useContext(Context)
    const [setCurrentWidjet, setIsEditer] = useContext(ContextEditor)
    const [textContent, setTextContent] = useState(content || { id: randomId(), title: '', discription: '' })
    const [respEditText, doFetchEditText] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=set_landing_prop_data')

    console.log(content)

    const closeWindow = () => {
        if (closeEdit) {
            closeEdit()
        } else
            setCurrentWidjet(null)
    }

    

    const saveList = () => {
        const formData = new FormData()
        formData.set('landing_prop_id', 4)
        formData.set('catalog_id', catalogId)
        formData.set('title', textContent.title)
        formData.set('description', textContent.discription)
        if (content) {
            formData.set('landing_prop_data_id', content.id)
        } else {
            console.log('new')
        }
        doFetchEditText(formData)
    }

    useEffect(() => {
        if (!respEditText) {
            return
        }
        console.log(textContent, content,';sdjafdjasfjasdfkljdasfkljdasklj')
        closeWindow()
        if (respEditText.success === 'Успешно!') {
       
            const list = [...vidjArr]
            if (content) {
                list.map(el => {
                    if (!el) {
                        return
                    }
                    if (el.id === content.id) {
                        console.log(el.id, content.id, el)
                        const newBody = { id: String(content.id), title: textContent.title, discription: textContent.discription }
                        el.body = newBody
                        return el
                    }
                })
            } else {
                const id = respEditText.landing_prop_data_id;
                const newObj = {
                    title: "text", id, body: {
                        discription: textContent.discription,
                        id,
                        title: textContent.title
                    }
                }
                list.push(newObj)
            }
            console.log(list)
            setVidjetData(list)
        }
    }, [respEditText])

    const changeTitleHandler = evt => {
        const title = evt.getData()
        setTextContent(state => {
            return {
                ...state,
                title
            }
        })
    }

    const changeTextHandler = editor => {
        console.log(editor)
        const discription = editor.getData()
        console.log(discription)
        setTextContent(state => {
            return {
                ...state,
                discription
            }
        })
    }

    return (
        <PopUp title="Текст" closePopup={closeWindow} saveHandler={() => saveList()}>
            <div className='text-title-conteiner  py-1 px-3 '>
                <h3 className='question-item-header'>Заголовок</h3>
                <CKEditor
                    data={content ? content.title : ''}
                    onChange={(evt) => changeTitleHandler(evt.editor)}
                    /* onChange={(e,text)=>setTitle(e.editor.getData())} */
                    config={{
                        toolbar: [Utils.CKEditorTools],
                        height:'60px'
                    }}
                />
              {/*   <textarea onBlur={(evt) => changeTitleHandler(evt)} className='w-100' placeholder={content ? content.title : ''} /> */}
            </div>
            <div className='text-body-conteiner py-1 px-3'>
                <h3 className='question-item-header'>Текст</h3>
                <CKEditor
                    data={content ? content.discription : ''}
                    onChange={(event) => changeTextHandler(event.editor)}
                    /* onChange={(e,text)=>setTitle(e.editor.getData())} */
                    config={{
                        toolbar: [Utils.CKEditorTools],
                        height:'100px'
                    }}
                />
               {/*  <CKEditor
                    editor={ClassicEditor}
                    data={content ? content.discription : ''}
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
                    onBlur={(event) => changeTextHandler(event.editor)}
                /> */}
            </div>
            {/*     <div className='block-question-save'><p onClick={saveList} className='block-question-button-save'>Сохранить</p></div> */}
        </PopUp>
    )
}

export default Text