import React, {ChangeEvent, useEffect, useState} from "react"

import './ProfileStatus.scss'


type PropsType = {
    status: string

    updateStatus: (status: string) => void
}


export const ProfileStatus: React.FC<PropsType> = ({status, updateStatus}) => {
    let [editMode, setEditMode] = useState(false)
    let [myStatus, setMyStatus] = useState(status)

    useEffect(() => {
        setMyStatus(status)
    }, [status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        updateStatus(myStatus)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMyStatus(e.currentTarget.value)
    }

    return (
        <div className="info__status">
            {!editMode ?
                <div className="status__text" onClick={activateEditMode}>
                    <span >{status || 'Set status: '}</span>
                </div> :
                <div className="status__set_block">
                    <input className="status__input"
                           type="text"
                           autoFocus={true}
                           value={myStatus}
                           onChange={onStatusChange}
                           onBlur={deactivateEditMode} />
                </div>
            }
        </div>
    )
}