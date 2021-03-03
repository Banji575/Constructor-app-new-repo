import React, { useContext, useMemo } from 'react'
import InputColor from 'react-input-color';
import EditButton from '../../UI/EditButton/EditButton'
import ArrowDown from '../../UI/ArrowButton/ArrowButton'
import ContextEditor from '../../ContextEditor'
import Context from '../../Context'
import './widjetWrapper.css'
import DeleteButton from '../DeleteButton/DeleteButton';
import Utils from '../../scripts/Utils';
import EditBackground from '../../components/SiteHeader/TextEditorPanel/EditBackground/EditBackground';
const WidjetWrapper = ({ children, editWindow, isView, setViewEdit, delHandler, setBackground, backgroundColor, replaceVidj, id, changeBackground, fullScreen = false }) => {
    const [setCurrentWidjet, setIsEditer, setVidjetData, vidjArr] = useContext(ContextEditor)
    const [state, changeState, setState, catalogId, setVidjetDataasdf, vidjetData, decktopMode] = useContext(Context)

    const index = useMemo(() => {
        let i;
        vidjArr.forEach((el, ind) => el.id == id ? i = ind : null)
        return i
    }, [vidjArr])


    //для полноэкранных виджетов
    const classes = ['question-center']
    if (!fullScreen) {
        classes.push('container')
    }


    const setBg = (evt) => {
        const col = evt.hex.substring(0, evt.hex.length - 2)
        setBackground(col)
    }

    const buttonBlock = (
        
        <div className='questions-buttons container'>
           {/*  <EditBackground/> */}
           <div className = 'edit-background mr-3'><p className = 'edit-background-text'>Фон</p>
           <InputColor
                    className='input-color-widjet input-color-margin'
                    initialValue={backgroundColor || "#f0f1f7"}
                    onChange={(evt) => setBg(evt)}
                    placement="right"

                />
           </div>
            <div className='icon-conteiner'>
                {vidjArr.length - 1 == index ? null : <ArrowDown id={id} replaceVidj={replaceVidj} />}
            </div>
            <div className='icon-conteiner'>

                {index != 0 ? <ArrowDown id={id} replaceVidj={replaceVidj} direction='up' /> : null}
            </div>
           {/*  <div className='d-flex  icon-conteiner px-2 icon-container-padding'>
                <div>
                    <p className='edit-background-text input-color-label'>Фон</p>
                </div>
                <InputColor
                    className='input-color-widjet input-color-margin'
                    initialValue={backgroundColor || "#f0f1f7"}
                    onChange={(evt) => setBg(evt)}
                    placement="right"

                />
            </div> */}
            <div className='icon-conteiner icon-conteiner--middle-line icon-conteiner--double-icon' color='green'>
                <DeleteButton onDelete={delHandler} />
                <EditButton openEdit={setViewEdit} />
            </div>
        </div>
    )

    return (

        <div className={classes.join(' ')}>
            <div className='questions-header'>
                {decktopMode ? buttonBlock : null}
            </div>
            <div className='questions-body'>
                {children}
            </div>
            {isView ? editWindow : null}
            {/*  {viewEdit ? <BlockQueston setViewEdit={setViewEdit} id={id} changeStateVidjet={changeStateVidjet} isNew={false} listArr={body} title = {title} /> : null} */}
        </div>
    )
}

export default WidjetWrapper;