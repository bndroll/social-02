import React from "react"

import './ProfilePersonSecondInfo.scss'
import {ContactsType} from "../../../../../types/types"


type PropsType = {
    fullName: string
    contacts: ContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    isOwner: boolean
    goToEditMode: () => void
    aboutMe: string
}


const ProfilePersonSecondInfo: React.FC<PropsType> = ({fullName, contacts,
                                                          lookingForAJob, lookingForAJobDescription,
                                                          isOwner, goToEditMode, aboutMe}) => {
    let contactElements = Object.keys(contacts)
        .filter(key => contacts[key as keyof ContactsType])
        .map(key => <Contact key={key} contactName={key} contactValue={contacts[key as keyof ContactsType]} />)

    return (
        <div className="info__second_inner">
            <div className="info__second">
                {fullName ? <div className="info__full_name some__info">
                    <span>Full Name</span>: {fullName}</div> : null}
                {aboutMe ? <div className="info__contacts some__info">
                    <span>About Me</span>: {aboutMe}</div> : null}
                {lookingForAJob ? <div className="info__job some__info">
                    <span>Job</span>: {lookingForAJobDescription}</div> : null}
                {contactElements.length > 0 ? <div className="info__contacts some__info">
                    <span>Contact</span>: {contactElements}</div> : null}
            </div>
            <div className="info__second_btn-container">
                { isOwner ? <button onClick={goToEditMode} className="info__second_button">Redactor</button> : null }
            </div>
        </div>
    )
}


type ContactPropsType = {
    contactName: string
    contactValue: string
}

export const Contact: React.FC<ContactPropsType> = ({contactName, contactValue}) => {
    return (
        <div className="info__contact">{contactName}: <a className="contact__link"
                                                         href={contactValue}>{contactValue}</a></div>
    )
}

export default ProfilePersonSecondInfo