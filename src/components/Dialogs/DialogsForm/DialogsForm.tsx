import React from "react"

import './DialogsForm.scss'
import {InjectedFormProps, reduxForm} from "redux-form"
import {CreateField, TextareaConstructor} from "../../Common/FormsControls/FormsControls"
import {requiredField} from "../../../utils/validators/validators"
import {NewMessageFormValuesType} from "../Dialogs"


type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormValuesType, string>
type PropsType = {}

const DialogsForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit} className="dialogs__input">
            <div className="dialogs__text">
                {CreateField<NewMessageFormValuesKeysType>('',
                    TextareaConstructor,
                    'newMessageBody',
                    'Enter ur message',
                    'text',
                    [requiredField],
                    'dialogs__textarea')
                }
            </div>
            <div className="dialogs__send">
                <button className="dialogs__btn">Send</button>
            </div>
        </form>
    )
}

export const AddMessageFormRedux = reduxForm<NewMessageFormValuesType>({ form: 'dialogAddMessageForm' })(DialogsForm)