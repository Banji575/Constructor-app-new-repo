import React, { useState, useContext, useEffect } from 'react';
import Utils from '../../scripts/Utils';
import Context from './../../Context';


const InfoModal = () => {
    const { infoModalState, setInfoModalState } = useContext(Context);


    const closeModal = () => {
        setInfoModalState({ ...infoModalState, isOpen: false })
    }

    const saveModal = (e) => {
        if (typeof infoModalState.onSave() == 'function') {
            infoModalState.onSave(e)
        }
    }

    // useEffect(()=>{
    //     console.log(infoModalState.timeOutFunc)
    //     if(infoModalState.timeOutFunc){
    //         const callback = infoModalState.timeOutFunc
    //         setTimeout(()=>callback(), 1000)
    //         console.log('a;lkjf;lajsdfjasdfklj')
    //     }

    // },[])
    return (
        <React.Fragment>
            <div className={infoModalState.isOpen ? "modal fade show d-block" : "modal fade"} tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog modal-md" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">{infoModalState.title || ''}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => closeModal()}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {Utils.createHTML(infoModalState.content) || ''}
                        </div>

                        {infoModalState.showFooter &&
                            <div className="modal-footer justify-content-between">
                                <a href={false} className="text-secondary" onClick={() => closeModal()}>Закрыть</a>
                                <button type="button" className="landing-btn landing-btn--blue-gradient" onClick={(e) => saveModal(e)}>{infoModalState.saveButtonText}</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
            {infoModalState.isOpen &&
                <div class="modal-backdrop fade show"></div>
            }
        </React.Fragment>
    )
}

export default InfoModal;