import React, { useState } from 'react'
export const ContextAddBlock = React.createContext()
export const VidjetAddWrapper = ({children}) => {
    const [isOpenEditBlock, setIsOpenEditBlock] = useState(true)
    return(
        <ContextAddBlock.Provider value = {{isOpenEditBlock, setIsOpenEditBlock}}>{children}</ContextAddBlock.Provider>
    )
}
