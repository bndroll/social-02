import React from "react"

import './Post.scss'


type PropsType = {
    message: string
    likesCount: number
}


export const Post: React.FC<PropsType> = ({message, likesCount}) => {
    return (
        <div className="posts__post post">
            <div className="post__inner">
                <div className="post__avatar"><i className="far fa-user-circle"/></div>
                <div className="post__info">
                    <div className="post__name">Max Banenkov</div>
                    <div className="post__text">{message}</div>
                </div>
            </div>
            <div className="post__like">
                <span className="post__like-count">{likesCount}</span>
                <i className="fas fa-thumbs-up"/>
            </div>
        </div>
    )
}