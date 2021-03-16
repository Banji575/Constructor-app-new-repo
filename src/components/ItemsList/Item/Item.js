import React, { useEffect, useRef, useState } from 'react'
import ItemEditMenu from '../../../UI/ItemEditMenu/ItemEditMenu'
import './item.css'

const Item = ({ el ,openItemPage}) => {
    const [showMenu, setShowMenu] = useState(false)
    const root = useRef()
   
    useEffect(()=>{
        const onClick = e =>{
            if(!root.current) return
            return root.current.contains(e.target) || setShowMenu(false)
        }
        document.addEventListener('click', onClick)

        return ()=>document.removeEventListener('click', onClick)
    },[])

    const openEdit = () =>{
        openItemPage(el.id)
    }

    return (
        <div ref={root} className="col-6 col-md-3" >
            <div className = 'tree-dotted' onClick={(evt) => setShowMenu(true)}>...</div>
            <div  className='items-list-items-tepmlate'>
                <img src={el.default_look_preview_200} />
            </div>
            <ItemEditMenu openEdit = {openEdit} isShow={showMenu} />
        </div>
    )
}

export default Item