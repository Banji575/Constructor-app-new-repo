import React, { useContext, useEffect, useState } from 'react'
import Context from '../../../Context'
import useFetch from '../../../hooks/useFetch'
import './loadingLogo.css'

const LoadingLogo = () => {
    const {state, changeState, setState, catalogId} = useContext(Context)
    const [loadLogo, setLoadLogo] = useState(false)
    const [response, doFetch] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=upload_logo')
    const fileChange = evt => {
        const file = evt.target.files[0]
        const formData = new FormData()
        /*  formData.set('mode', 'upload_logo') */
        formData.set('image', file)
        formData.set('catalog_id', catalogId)
        doFetch(formData)

    }
    useEffect(() => {
        if (response) {
            const siteLogo = response.catalog.logo
            setState(s=>({
                ...s, 
                siteLogo
            }))
           /*  changeState({ siteLogo: response.catalog.logo }) */
        }
    }, [response])
    const styles = {
        backgroundImage: `url("${state.siteLogo}")`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPositionX: 'center'
    }
    const IsLogoComponent = () => {
        /* if (!state.siteLogo) { */
        return (
            <div className="input__wrapper" style={styles}>
                <input name="file" accept=".jpg, .png" type="file" name="file" id="input__file" className="input input__file" onChange={(evt) => fileChange(evt)} />
                <label htmlFor="input__file" className="input__file-button">
                    <span className="input__file-button-text">{!state.siteLogo ? 'Ваш логотип' : ''}</span>
                </label>
            </div>)

    }
    return (
        <IsLogoComponent />
    )
}
export default LoadingLogo