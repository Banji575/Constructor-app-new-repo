import React, { useEffect, useRef, useState, useContext } from 'react'

const NewEmptyList = ({id}) => {
    return (
        <div className="" onClick={() => console.log('id', id)}>
            Добавить пункт
        </div>
    )
}

export default NewEmptyList;