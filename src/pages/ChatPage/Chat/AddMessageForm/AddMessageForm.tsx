import React, {useState} from "react"

import './AddMessageForm.scss'
import {useDispatch, useSelector} from "react-redux"
import {sendMessage} from "../../../../redux/Reducers/chatReducer"
import {AppStateType} from "../../../../redux/redux-store";


export const AddMessageForm: React.FC = () => {
    const dispatch = useDispatch()
    const [message, setMessage] = useState('')

    const status = useSelector((state: AppStateType) => state.chat.status)

    const sendMessageHandler = () => {
        if (message.trim().length === 0) return

        dispatch(sendMessage(message))
        setMessage('')
    }

    return (
        <div className='chat__add-message__form'>
            <div className='chat__add-message__textarea_container'>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)}
                          value={message}
                          className='chat__add-message__textarea' />
            </div>
            <div className='chat__add-message__button_container'>
                <button onClick={sendMessageHandler}
                        disabled={status !== 'ready'}
                        className='chat__add-message__button'>Send</button>
            </div>
        </div>
    )
}