import React, {useState} from 'react'

const MyItemElem = ({src,addImgCheckArr,id}) => {
    const [checkImg, setCheckImg] = useState(false)
    const checkImgHandler = () =>{
        addImgCheckArr(state=>{
            const list = [...state]
           const index =  list.findIndex((el,i)=>{
               return el.src === src
            })
            if(index === -1){
                const obj = {src, id}
                list.push(obj)
            }else{
                console.log('фото есть', index)
                list.splice(index,1)
            }
            return list
        })
        setCheckImg(state=>!state)
    }
    const classes = ['my-items-item']
    if(checkImg){
        classes.push('my-items-check')
    }
    return (
    <li onClick = {()=>checkImgHandler()} className={classes.join(' ')}><img className = 'my-items-elem-img' src={src} /></li>
    )
}
export default MyItemElem