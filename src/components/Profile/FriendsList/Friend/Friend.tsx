import React from "react"

import './Friend.scss'


type PropsType = {
    name: string
}


export const Friend: React.FC<PropsType> = ({name}) => {
    return (
        <div className="friends__item">
            <div className="friends__avatar">
                <img className="friend__img"
                     src="https://s3.nat-geo.ru/images/2020/2/7/7efa4c389b364ee2a42e3dde552f918e.max-1200x800.jpg"
                     alt="friend"/>
            </div>
            <div className="friends__name">
                {name}
            </div>
        </div>
    )
}