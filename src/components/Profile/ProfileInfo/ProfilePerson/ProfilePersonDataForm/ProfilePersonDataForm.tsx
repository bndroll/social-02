import React from "react"
import {InjectedFormProps, reduxForm} from "redux-form"

import {
    CreateField,
    GetStringKeys,
    InputConstructor,
    TextareaConstructor
} from "../../../../Common/FormsControls/FormsControls"
import './ProfilePersonDataForm.scss'
import {ContactsType, ProfileType} from "../../../../../types/types"


type PropsType = {
    contacts: ContactsType

    exitEditForm: () => void
}
type ProfileTypeKeys = GetStringKeys<ProfileType>


const ProfilePersonDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({contacts, handleSubmit, exitEditForm, error}) => {
    let contactElements = Object.keys(contacts)
        .map(key => <div key={key} className="contacts__info_profile_container">
            <span className="some__info contacts__names">{key}: </span>
            {CreateField('input__info_container_profile', InputConstructor,
                `contacts.${key}`, '',
                'text', [],
                'input__profile_edit_contacts'
            )}
        </div>)

    return (
        <>
            {error ? <div className="exit__edit_form_error">
                    <div>{error}</div>
                    <div>
                        <button onClick={exitEditForm} className="exit__edit_form_btn info__second_button">
                            Exit <i className="fas fa-times"/>
                        </button>
                    </div>
                </div> :
                <form onSubmit={handleSubmit} className="info__second_inner">
                    <div className="info__second">
                        <div className="info__full_name some__info">Full Name:
                            {CreateField<ProfileTypeKeys>('input__info_container_profile', InputConstructor,
                                'fullName', '',
                                'text', [],
                                'input__full_name_profile input__profile_edit')}
                        </div>
                        <div className="info__job some__info">Job:
                            {CreateField<ProfileTypeKeys>('input__info_container_profile', InputConstructor,
                                'lookingForAJob', '',
                                'checkbox', [],
                                'input__looking_for_job_profile input__profile_edit')}
                        </div>
                        <div className="info__prof some__info">Professional Skills:
                            {CreateField<ProfileTypeKeys>('input__info_container_profile', InputConstructor,
                                'lookingForAJobDescription', '',
                                'input', [],
                                'input__prof_skills_profile input__profile_edit')}
                        </div>
                        <div className="info__contacts some__info">Contact: {contactElements}</div>
                        <div className="info__about_me some__info">About Me:
                            {CreateField<ProfileTypeKeys>('input__info_container_profile', TextareaConstructor,
                                'aboutMe', '',
                                'textarea', [],
                                'input__about_me_profile')}
                        </div>
                    </div>
                    <button className="info__second_button">Save</button>
                </form>
            }
        </>
    )
}

export const ProfilePersonDataFormReduxForm = reduxForm<ProfileType, PropsType>({ form: 'editProfile' })(ProfilePersonDataForm)