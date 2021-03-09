import React from 'react'
import Utils from '../../scripts/Utils'

const LinkWrapper = ({children, link}) => {
    return <a target = '_blank' href = { link} >{children}</a>
}

export default LinkWrapper