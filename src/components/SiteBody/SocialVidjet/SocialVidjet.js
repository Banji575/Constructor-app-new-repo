import React,{useState, useEffect,useContext} from 'react'
import './socialVidjet.css'
import SocialVidjetItem from './SocialVidjetItem/SocialVidjetItem'
import Social from '../../BlockEditor/BlockMenu/Social/Social'
import useFetch from '../../../hooks/useFetch'
import Context from '../../../Context'
import ContextEditor from '../../../ContextEditor'
import WidjetWrapper from '../../../UI/VidjetVrapper/WidjetWrapper'

import {ContextAddBlock} from '../../../ContextAddBlock'
import ButtonAddComponent from '../../../UI/ButtonAddComponent/ButtonAddComponent'
import Utils from '../../../scripts/Utils'

const SocialVidjet = ({ body ,id, replaceVidj}) => {
    console.log(body)
    const [viewEdit, setViewEdit] = useState(false)
    const [respDelSocial, doFetchDelSocial] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=delete_catalog_landing_prop_data')
    const [respEditSocial, doFetchEditSocial] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=set_landing_prop_data')
    const {state, changeState, setState, catalogId} = useContext(Context)
    const [setCurrentWidjet, setIsEditer, setVidjetData, vidjArr] = useContext(ContextEditor)
    const [backgroundColor, setBackgroundColor] = useState('')
    const {isOpenEditBlock, setIsOpenEditBlock} = useContext(ContextAddBlock)
    const editHandler = () => {
        setViewEdit(true)
    }

    const fetchBackgroundColor = (col) =>{
            console.log('tesdfsfsdffafasasfasddfdasffdfsst', col)
        const colorWithoutSharp = col.replace('#','')
            console.log(id)
        const formData = new FormData()

        formData.set('landing_prop_id', id)
        formData.set('background_color', colorWithoutSharp)
        doFetchEditSocial(formData)
        setBackgroundColor(col)
    }



    const delHandler = () => {
        const formData = new FormData()
        formData.set('landing_prop_id', 10)
        formData.set('catalog_id', catalogId)
        formData.set('landing_prop_data_id', id)
        doFetchDelSocial(formData)
    }

    useEffect(() => {
        if (!respDelSocial) return
        if (respDelSocial.success === 'Успешно!') {
            const list = [...vidjArr]
            list.map((el, i) => {
                if (!el) return
                if (el.id === id) {
                    list.splice(i, 1)
                }
            })
            setVidjetData(list)
        }
    }, [respDelSocial])
    const socialSection = Object.keys(body)
    return (
        <div className='questions-container' style = {{backgroundColor:[backgroundColor]}}>
                <WidjetWrapper id={id} replaceVidj = {replaceVidj} delHandler = {delHandler} setBackground = {fetchBackgroundColor} isView={viewEdit} setViewEdit={setViewEdit} editWindow={ <Social content = {body} setViewEdit={setViewEdit} id={id} /* changeStateVidjet={changeStateVidjet} isNew={false} listArr={body} */ />} >
                <div className='questions-body'>
                    <div className='social-vidjet-list-container  d-md-flex'>
                        {socialSection.map((el, i) => {
                            /* console.log(Utils.checkSocialList(body[el]))
                            console.log('dsafjasd;ljdasljdas',body[el]) */
                            return <SocialVidjetItem key={i} data={body[el]} />
                        })}
                    </div>
                </div>
                
                </WidjetWrapper>
                <ButtonAddComponent isVidjetButton = {true} onClick={() => setIsOpenEditBlock(false)}/>
             {viewEdit ? <Social content = {body} setViewEdit={setViewEdit} id={id} /* changeStateVidjet={changeStateVidjet} isNew={false} listArr={body} */ /> : null}
        </div>
    )


}

export default SocialVidjet