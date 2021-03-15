import { React, useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom'


const BreadCrumbs = ({ arrayParentMenu }) => {

    return (
        <nav className="">
            <ol class="breadcrumb">
                {arrayParentMenu.map(el => {
                    return <NavLink>
                        <li class="breadcrumb-item"> {el.text} </li>
                    </NavLink>
                })}
            </ol>
        </nav>
    )
}


export default BreadCrumbs;