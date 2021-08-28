import React from "react"
import {InjectedFormProps, reduxForm} from "redux-form"

import {requiredField} from '../../../../utils/validators/validators'
import {CreateField, GetStringKeys, TextareaConstructor} from "../../../Common/FormsControls/FormsControls"

import './AddNewPostForm.scss'


type PropsType = {}
export type AddPostFormValuesType = { newPostText: string }
type AddPostFormValuesKeysType = GetStringKeys<AddPostFormValuesType>


const AddNewPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = ({handleSubmit}) => {
    return (
        <form className="posts__make" onSubmit={handleSubmit} >
            {CreateField<AddPostFormValuesKeysType>('',
                TextareaConstructor,
                'newPostText',
                'Ur post',
                'text',
                [requiredField],
                'posts__area')
            }
            <button className="posts__btn">Add Post</button>
        </form>
    )
}

export default reduxForm<AddPostFormValuesType, PropsType>({ form: 'profileAddNewPostForm' })(AddNewPostForm)