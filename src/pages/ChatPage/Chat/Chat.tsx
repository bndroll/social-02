import React, {useEffect} from "react"

import {Messages} from "./Messages/Messages"
import {AddMessageForm} from "./AddMessageForm/AddMessageForm"
import './Chat.scss'
import {useDispatch, useSelector} from "react-redux"
import {startMessagesListening, stopMessagesListening} from "../../../redux/Reducers/chatReducer"
import {AppStateType} from "../../../redux/redux-store";


export const Chat: React.FC = () => {
    const dispatch = useDispatch()

    const status = useSelector((state: AppStateType) => state.chat.status)

    useEffect(() => {
        dispatch(startMessagesListening())

        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <>
            {status === 'error' ? <div>Some error occurred :( Please refresh the page</div> :
                <div className='chat__container'>
                    <Messages/>
                    <AddMessageForm/>
                </div>
            }
        </>
    )
}