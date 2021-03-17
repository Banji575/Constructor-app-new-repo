import React, { useState } from 'react'

const MyItemElem = ({ src, addImgCheckArr, id, loadArr, setLoadArr }) => {
    const [checkImg, setCheckImg] = useState(false)
    const checkImgHandler = () => {
        console.log('click', id)
        console.log('loadArr', loadArr)

        const list = [...loadArr]
        list.push({ id, src })

        setLoadArr(list)

        addImgCheckArr(state => {
            const list = [...state]
            const index = list.findIndex((el, i) => {
                return el.src === src
            })
            if (index === -1) {
                const obj = { src, id }
                list.push(obj)
            } else {
                console.log('фото есть', index)
                list.splice(index, 1)
            }
            return list
        })
        setCheckImg(state => !state)
    }
    const classes = ['my-items-item']
    /* if(checkImg){
        classes.push('my-items-check')
    } */
    return (
        <li onClick={() => checkImgHandler()} className=" col-2">
            <div className={classes.join(' ')}>
                <img className='my-items-elem-img' src={src} />
            </div>
        </li>
    )
}
export default MyItemElem