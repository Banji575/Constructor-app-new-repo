import React, { useContext } from 'react'
import LoadingLogo from './loadingLogo/LoadingLogo'
import SiteTitle from './SiteTitle/SiteTitle'
import './siteHeader.css'
import Context from '../../Context'
import TextEditorPanel from './TextEditorPanel/TextEditorPanel'
import MobileMenuIcon from '../../UI/MobileMenuIcon/MobileMenuIcon'
const SiteHeader = ({menuIsClose, changeViewMenu , styleClassHeader}) => {
    const [state, changeState, setState, catalogId, setVidjetData, vidjetData,decktopMode] = useContext(Context)
    const backgroundColor =  state.titleBackground
    const classes = ['site-header'].concat(styleClassHeader)

    if(!decktopMode){
        classes.push('site-header-preview-mode')
    } 

    const styles = {backgroundColor}
    console.log('site-list', state)
    return (
        <div className={classes.join(' ')} style = {{...styles}}>
            <div className='container d-flex site-header-conteiner '>
               {state.menuDirection == '1' ?  <LoadingLogo /> : null}
                <SiteTitle />
               { decktopMode ? <TextEditorPanel/> : null}
                <MobileMenuIcon menuIsClose={menuIsClose} changeViewMenu={changeViewMenu}/>
            </div>
        </div>
    )
}
export default SiteHeader