import React, { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import Context from './../../Context';
import styled from 'styled-components';
import ColorChange from './../../UI/ColorChange/ColorChange';
import { updateUrl } from '../../scripts/Common';


const BreadCrumbs = ({ catalogId, currentId = 0 }) => {
    const { state, setUrlCatalogId } = useContext(Context);
    const BreadCrumbsStyled = styled.div`
        
        .breadcrumb {
            flex-wrap: nowrap;
            white-space:nowrap;
            overflow-x: auto;
            background: rgba(0, 0, 0, 0);
            li, a {
                font-size: ${state.bread_crumbs_settings.font_size || '14'}px;
                font-family: ${state.bread_crumbs_settings.font_family || 'Montserrat'};
                color:  #${state.bread_crumbs_settings.without_allocation_font_color || '000'};
                &:hover {
                    color: #${state.bread_crumbs_settings.with_allocation_font_color || '000'};
                }
            }
            li.active {
                color: #${state.bread_crumbs_settings.with_allocation_font_color || '000'};
            }
        }
    `;
    const [brList, setBrList] = useState([]);

    const getArrayItem = (arrs = [], parrentArray = [{ id: 0, text: 'Главная' }]) => {
        arrs.map(el => {
            let newParrentArray = [...parrentArray, { id: el.id, text: el.text }]

            if (el.id == currentId) {
                setBrList(newParrentArray)
                return;
            }
            if (el.childrenList.length) {
                getArrayItem(el.childrenList, newParrentArray)
            }
            return;
        })
    }


    useEffect(() => {
        getArrayItem(state.siteMenu)
    }, []);

    useEffect(() => {
        getArrayItem(state.siteMenu)
    }, [currentId]);

    useEffect(() => {
        getArrayItem(state.siteMenu)
    }, [state.siteMenu]);

    const changeCatalogId = (id) => {
        setUrlCatalogId(id)
    }

    const BrCrList = ({ parrentArray = [] }) => {
        return (
            <BreadCrumbsStyled>
                <div className="container px-3 px-sm-0">
                    <nav className="">
                        <ol className="breadcrumb px-0">
                            {parrentArray.map((el, i) => {
                                if (el.id == 0) {
                                    return (
                                        <li key={i} className="breadcrumb-item" onClick={() => changeCatalogId(el.id)}>
                                            <NavLink
                                                to={`/work/user/site-creator/index.php?id=${catalogId}`}
                                            >
                                                {el.text}
                                            </NavLink>
                                        </li>
                                    )
                                } else if (i != (parrentArray.length - 1)) {
                                    return (
                                        <li key={i} className="breadcrumb-item" onClick={() => changeCatalogId(el.id)}>
                                            <NavLink
                                                to={`/work/user/site-creator/items?id=${catalogId}&menu_id=${el.id}`}
                                            >
                                                {el.text}
                                            </NavLink>
                                        </li>
                                    )
                                } else {
                                    return (<li key={i} className="breadcrumb-item active">
                                        {el.text}
                                    </li>)
                                }

                            })}
                        </ol>
                    </nav>
                </div>
            </BreadCrumbsStyled>
        )
    }

    return (
        <BrCrList
            parrentArray={brList}
        />
    )
}


export default BreadCrumbs;