import React, { useContext, useEffect, useState } from 'react'
import NewMenuItem from '../NewMenuItem/NewMenuItem';



const NewMenuList = (props) => {
    return (
        <ul className="">
            {props.children}
        </ul>
    )
}


export default NewMenuList;