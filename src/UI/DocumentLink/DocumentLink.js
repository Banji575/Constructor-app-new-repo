import React from 'react'
import word from '../../image/word-view.png'
import excel from '../../image/xls-view.png'
import pdf from '../../image/pdf-view.png'

const fileType = {
    pdf: pdf,
    xls: excel,
    xlsx: excel,
    word: word
}

const getType = str => str.split('.')[1]

const DocumentLink = ({ type, linkNum }) => {
    console.log(getType(type))

    return (
        <div className = 'mr-3' >
            <a href={`https://cloudsgoods.com/api/actionsAdmin.php?mode=object_download_document&object_id=4986&key_file=${linkNum}`}>
                <img src={fileType[getType(type)]} />
            </a>
        </div>
    )
}

export default DocumentLink