import React, {useState} from "react"

import './ProfilePerson.scss'
import {ProfilePersonFirstInfo} from "./ProfilePersonFirstInfo/ProfilePersonFirstInfo"
import ProfilePersonSecondInfo from "./ProfilePersonSecondInfo/ProfilePersonSecondInfo"
import {ProfilePersonDataFormReduxForm as ProfilePersonDataForm} from "./ProfilePersonDataForm/ProfilePersonDataForm"
import {ProfileType} from "../../../../types/types"


type PropsType = {
    profile: ProfileType
    status: string
    isOwner: boolean

    saveProfile: (profile: ProfileType) => Promise<any>
    updateStatus: (status: string) => void
}


export const ProfilePerson: React.FC<PropsType> = ({profile, status, updateStatus, isOwner, saveProfile}) => {
    const [editMode, setEditMode] = useState(false)

    const onSubmit = (formData: ProfileType) => {
        saveProfile(formData)
            .then(() => setEditMode(false))
    }

    const exitEditForm = () => {
        setEditMode(false)
    }

    return (
        <div className="about__info info">
            <ProfilePersonFirstInfo fullName={profile.fullName}
                                    status={status}
                                    updateStatus={updateStatus} />
            <div className="info__line"><span/></div>

            { editMode ? <ProfilePersonDataForm contacts={profile.contacts}
                                                initialValues={profile}
                                                onSubmit={onSubmit}
                                                exitEditForm={exitEditForm} /> :
            <ProfilePersonSecondInfo fullName={profile.fullName}
                                     contacts={profile.contacts}
                                     aboutMe={profile.aboutMe}
                                     isOwner={isOwner}
                                     lookingForAJobDescription={profile.lookingForAJobDescription}
                                     goToEditMode={() => { setEditMode(true) }}
                                     lookingForAJob={profile.lookingForAJob} /> }
        </div>
    )
}