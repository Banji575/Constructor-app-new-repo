import React from 'react'
import './feedbackVidjetItem.css'
const changeNameObj = {
    name:'Имя',
    email: 'E-mail',
    phone:'Тел',
    message: 'Комментарий'
}

const FeedbackVidjetItem = ({ data, title }) => {
    console.log(title, data)
    if(title === 'ourEmail')
    return null
    const Elem = () => (
        <div className = 'feedback-vidjet-item mb-3'>
            {/* <label className = 'feedback-item-label' htmlFor={title}>{changeNameObj[title]}</label> */}
          {title==='message' ? <textarea placeholder = {changeNameObj[title]}/> :  <input className = 'question-item-input' id='title' type='text' placeholder = {changeNameObj[title]} />} 
        </div>
    )
    return (
        <React.Fragment>
           {data.show ? <Elem /> : null} 
        </React.Fragment>
    )
}

export default FeedbackVidjetItem