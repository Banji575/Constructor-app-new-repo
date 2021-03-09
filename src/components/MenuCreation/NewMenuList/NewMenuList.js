import React, { useContext, useEffect, useState } from 'react'

const NewMenuList = (props) => {
    return (
        <ul className="">
            {props.children}
        </ul>
    )
}


export default NewMenuList;