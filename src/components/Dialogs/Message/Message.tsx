import React from "react"

import './Message.scss'


type PropsType = {
    message: string
}


const Message: React.FC<PropsType> = ({message}) => {
    return (
        <div className="dialogs__message">
            <div className="message__ava"><i className="far fa-user"/></div>
            <div className="message__info">
                <div className="message__name">Max</div>
                <div className="message__text">{message}</div>
            </div>
        </div>
    )
}

export default Message