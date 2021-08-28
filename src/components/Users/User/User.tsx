import React from "react"
import {NavLink} from "react-router-dom"

import userPhoto from "../../../assets/images/pudge.jpg"

import './User.scss'
import {UserType} from "../../../types/types"


type PropsType = {
    user: UserType
    followingInProgress: Array<number>

    onUnfollowClick: (userId: number) => void
    onFollowClick: (userId: number) => void
}

export const User: React.FC<PropsType> = ({user, followingInProgress, onUnfollowClick, onFollowClick}) => {
    return (
        <div className="users__user">
            <div className="user__inner">
                <img className="user__photo"
                     src={user.photos.small != null ? user.photos.small : userPhoto}
                     alt="avatar"/>
                <div className="user__main">
                    <div className="user__info">
                        <NavLink to={'/profile/' + user.id}>
                            <div className="user__name">{user.name}</div>
                        </NavLink>
                    </div>
                    <div className="user__status">Status: {user.status}</div>
                </div>
                {user.followed ?
                    <button disabled={followingInProgress.some(id => id === user.id)}
                            className="user__btn followed__btn" onClick={() => {
                        onUnfollowClick(user.id)
                    }}>Unfollow</button> :
                    <button disabled={followingInProgress.some(id => id === user.id)}
                            className="user__btn" onClick={() => {
                        onFollowClick(user.id)
                    }}>Follow</button>}
            </div>
        </div>
    )
}