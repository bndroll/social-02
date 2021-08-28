import React from "react"

import './Message.scss'
import {ChatMessageType} from "../../../../../redux/Reducers/chatReducer"


export const Message: React.FC<{message: ChatMessageType}> = React.memo(({message}) => {
    return (
        <div className='chat__message-container'>
            <div className='chat__message__img-container'>
                <img className='chat__message__img' src={message.photo || 'https://lh3.googleusercontent.com/proxy/JE7kfjpH9T4h5dit6_NW6PrCtGy7J76xSesbfQsxy7kPciyr58-0R2dq--YVIMkxeHlCYxOUfBZoEc0qSkjVRhcwxgNBQq8saa0J6xo'} alt={message.userName} />
            </div>
            <div className='chat__message__info-container'>
                <div className='chat__message__author'>
                    {message.userName}
                </div>
                <div className='chat__message__text'>
                    {message.message}
                </div>
            </div>
        </div>
    )
})