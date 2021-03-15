import React, { useContext, useEffect, useState, useRef } from 'react'
import Slider from 'infinite-react-carousel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../../../hooks/useFetch'
import Context from '../../../Context'
/* import Carusel from '../../BlockEditor/BlockMenu/Carusel/Carusel' */
import { Carousel } from 'react-bootstrap'
/* import Carousel from 'react-elastic-carousel' */
import WidjetWrapper from '../../../UI/VidjetVrapper/WidjetWrapper'
import ContextEditor from '../../../ContextEditor'

import { ContextAddBlock } from '../../../ContextAddBlock'
import ButtonAddComponent from '../../../UI/ButtonAddComponent/ButtonAddComponent'
import Carusel from '../../BlockEditor/BlockMenu/Carusel/Carusel'

const CaruselVidjet = ({ body, id, replaceVidj }) => {
    const [respDelCarusel, doFetchDelCarusel] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=delete_catalog_landing_prop_data')
    const {state, changeState, setState, catalogId} = useContext(Context)
    const [setCurrentWidjet, setIsEditer, setVidjetData, vidjArr] = useContext(ContextEditor)
    const [viewEdit, setViewEdit] = useState(false)
    const [data, setData] = useState(body)
    const [slideSpeed, setSlideSpeed] = useState(null)
    const [backgroundColor, setBackgroundColor] = useState('')
    const { isOpenEditBlock, setIsOpenEditBlock } = useContext(ContextAddBlock)
    const carusel = useRef()
    const delHandler = () => {
        const formData = new FormData()
        formData.set('landing_prop_id', 1)
        formData.set('catalog_id', catalogId)
        formData.set('landing_prop_data_id', id)
        doFetchDelCarusel(formData)
    }


    console.log(body,body.interval*1000)

    useEffect(() => {
        if (!respDelCarusel) return
        console.log(respDelCarusel)
        if (respDelCarusel.success === 'Успешно!') {
            const list = [...vidjArr]
            list.forEach((el, i) => {
                if (el.id === id) {
                    list.splice(i, 1)
                }
            })
            setVidjetData(list)
        }
    }, [respDelCarusel])



    const SimpleSlider = () => (
        <div className='questions-container' style={{ backgroundColor: ['#fff'] }} >
            <WidjetWrapper fullScreen= {true} id={id} replaceVidj={replaceVidj} delHandler={delHandler} setBackground={setBackgroundColor} isView={viewEdit} setViewEdit={setViewEdit} editWindow={<Carousel body={body} setViewEdit={setViewEdit} id={id} />} >
                <div className='questions-body'>
                    {
                                <Carousel>
                                    {body.images.map(el=>{
                                        return (
                                            <Carousel.Item interval = {body.interval*1000 || 800}>
                                                <img src={`https://cloudsgoods.com/images${el}`}/>
                                            </Carousel.Item>
                                        )
                                    })}
                                </Carousel>
                    }


                    {/*   <Carousel
                    ref = {carusel}
                        itemsToShow={1}
                        enableAutoPlay={true}
                        isRTL = {false}
                        onChange={(currentItem, pageIndex) => {
                           

                        }}
                    >
                        {body.images.map((el, i) => {
                            console.log(el)
                            return <div key={i}><img src={`https://cloudsgoods.com/images${el}`} /></div>
                        })}
                    </Carousel> */}
                </div>
                <ButtonAddComponent isVidjetButton={true} onClick={() => setIsOpenEditBlock(false)} />

            </WidjetWrapper>
            {/*    {body.length > 2 && !viewFullList ? <Button onClick={() => viewFillLisnHundler()} title='Еще' /> : null} */}
        </div >
    );
    return (
        <div>
            <SimpleSlider />
        </div>
    )
}

export default CaruselVidjet