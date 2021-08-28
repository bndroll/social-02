import React from "react"

import {ProfileStatus} from "./ProfileStatus/ProfileStatus"
import './ProfilePersonFirstInfo.scss'


type PropsType = {
    fullName: string
    status: string

    updateStatus: (status: string) => void
}


export const ProfilePersonFirstInfo: React.FC<PropsType> = ({fullName, status, updateStatus}) => {
    return (
        <div className="info__main">
            <div className="info__name">{fullName}</div>
            <ProfileStatus status={status} updateStatus={updateStatus}/>
        </div>
    )
}