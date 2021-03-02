import React from 'react'
import './popUp.css'
const PopUp = ({ classNames = [], children, closePopup, title ,saveHandler, editMode = true, buttonDisable = true, showSave = true}) => {
    

    const disabledButton = () => buttonDisable ? saveHandler : null
    const classes = ['block-question-button-save']
    if(!buttonDisable){
        classes.push('button-disabled')
    }
    return (
        <React.Fragment>
            <div className='popup-container  pupUpZindex '>
                <div className='block-menu-header py-1'>
                    <h3 className='ml-3'>{title}</h3>
                    <div onClick={closePopup} className='block-header-close'></div>
                </div>
                <div className = 'popup-body'>
                {children}
                </div>
             { showSave && <div className='block-question-save'><p onClick={editMode ? disabledButton() : closePopup}  className={classes.join(' ')}>{editMode ? 'Сохранить': 'Отменить'}</p></div>}
            </div>
            <div onClick={closePopup} className='overlay-wpapper'>
            </div>
        </React.Fragment>
    )
}
export default PopUp