import React, { useContext, useState } from 'react'
import './buttonAddComponent.css'
import Context from '../../Context'
const ButtonAddComponent = ({ onClick, isVidjetButton = false, countVidj }) => {
    const [mouseOn, setMouseOn] = useState(false)
    const {state, changeState, setState, catalogId, setVidjetData, vidjetData, decktopMode, setDecktopMode} = useContext(Context)
    const classes = ['button-add-component']
    if (isVidjetButton) {
        classes.push('button-add-absolute')
    }

    return (<React.Fragment>
        {decktopMode ? <button
            onMouseEnter={() => setMouseOn(true)}
            onMouseLeave={() => setMouseOn(false)}
            onClick={() => onClick()}
            className={classes.join(' ')}
        >{mouseOn ? 'Добавить блок' : "+"}</button> : null}

    </React.Fragment>
    )

}

export default ButtonAddComponent