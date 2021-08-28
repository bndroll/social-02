import React from "react"

import {ProfilePicture} from "./ProfilePicture/ProfilePicture"
import {ProfilePerson} from "./ProfilePerson/ProfilePerson"
import {Preloader} from "../../Common/Preloader/Preloader"
import './ProfileInfo.scss'
import {ProfileType} from "../../../types/types"


type PropsType = {
    profile: ProfileType | null
    status: string
    isOwner: boolean

    saveProfile: (profile: ProfileType) => Promise<any>
    savePhoto: (file: File) => void
    updateStatus: (status: string) => void
}


export const ProfileInfo: React.FC<PropsType> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {
    if (!profile) {
        return (
            <div className="preloader__container">
                <Preloader />
            </div>
        )
    }

    return (
        <div className="profile__about about">
            <ProfilePicture photo={profile.photos.large}
                            savePhoto={savePhoto}
                            isOwner={isOwner} />
            <ProfilePerson profile={profile}
                           isOwner={isOwner}
                           status={status}
                           saveProfile={saveProfile}
                           updateStatus={updateStatus} />
        </div>
    )
}