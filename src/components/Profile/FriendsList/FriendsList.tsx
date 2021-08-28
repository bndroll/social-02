import React from "react"
import {useSelector} from "react-redux"

import {Friend} from "./Friend/Friend"
import './FriendsList.scss'
import {AppStateType} from "../../../redux/redux-store"


export const FriendsList: React.FC = () => {
    const friends = useSelector((state: AppStateType) => state.profilePage.friends),
          friendsElements = friends.map(item => <Friend key={item.id} name={item.name} />)

    return (
        <div className="profile__friends friends">
            { friendsElements }
        </div>
    )
}