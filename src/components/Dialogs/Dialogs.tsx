import React from "react"

import DialogItem from "./DialogItem/DialogItem"
import Message from "./Message/Message"
import {AddMessageFormRedux} from "./DialogsForm/DialogsForm"
import './Dialogs.scss'
import {InitialStateType} from "../../redux/Reducers/dialogsReducer"


type OwnPropsType = {
    dialogsPage: InitialStateType

    sendMessage: (messageText: string) => void
}
export type NewMessageFormValuesType = {
    newMessageBody: string
}


export const Dialogs: React.FC<OwnPropsType> = ({dialogsPage, sendMessage}) => {
    const dialogsElements = dialogsPage.dialogs.map(item => <DialogItem key={item.id} name={item.name} id={item.id} />)
    const messagesElements = dialogsPage.messages.map(item => <Message key={item.id} message={item.message} />)

    const addNewMessage = (values: NewMessageFormValuesType) => {
        sendMessage(values.newMessageBody)
    }

    return (
        <div className="dialogs">
            <div className="dialogs__items">
                { dialogsElements }
            </div>
            <div className="dialogs__messages">
                <div className="dialogs__all_messages">
                    { messagesElements }
                </div>

                <AddMessageFormRedux onSubmit={addNewMessage} />
            </div>
        </div>
    )
}