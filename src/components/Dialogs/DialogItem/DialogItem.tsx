import React from "react"
import {NavLink} from "react-router-dom"

import './DialogItem.scss'


type PropsType = {
    id: number
    name: string
}


const DialogItem: React.FC<PropsType> = ({id, name}) => {
    return (
        <div className="dialogs__item">
            <NavLink to={`/dialogs/ + ${id}`}>{name}</NavLink>
        </div>
    )
}

export default DialogItem