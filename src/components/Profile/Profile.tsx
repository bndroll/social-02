import React from "react"

import {ProfileInfo} from "./ProfileInfo/ProfileInfo"
import {MyPosts} from "./MyPosts/MyPosts"
import {FriendsList} from "./FriendsList/FriendsList"

import './Profile.scss'
import {ProfileType} from "../../types/types"


type PropsType = {
    profile: ProfileType | null
    status: string
    isOwner: boolean

    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
    updateStatus: (status: string) => void
}


export const Profile: React.FC<PropsType> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {
    return (
        <div className="profile">

            <ProfileInfo profile={profile}
                         savePhoto={savePhoto}
                         isOwner={isOwner}
                         status={status}
                         saveProfile={saveProfile}
                         updateStatus={updateStatus} />

            <div className="profile__second">
                <FriendsList />
                <MyPosts />
            </div>

        </div>
    )
}