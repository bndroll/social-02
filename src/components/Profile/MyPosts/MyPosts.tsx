import React from "react"
import {useDispatch, useSelector} from "react-redux"

import {Post} from './Post/Post'
import './MyPosts.scss'
import AddNewPostFormRedux, {AddPostFormValuesType} from "./MyPostsForm/AddNewPostForm"
import {AppStateType} from "../../../redux/redux-store"
import {actions} from "../../../redux/Reducers/profileReducer"


export const MyPosts: React.FC = () => {
    const posts = useSelector((state: AppStateType) => state.profilePage.posts)
    const postsElements = [...posts]
        .reverse()
        .map(item => <Post key={item.id} message={item.message} likesCount={item.likesCount} />)

    const dispatch = useDispatch()

    const onAddPost = (values: AddPostFormValuesType) => {
        dispatch(actions.addPost(values.newPostText))
    }

    return (
        <div className="content__posts posts">
            <AddNewPostFormRedux onSubmit={onAddPost} />
            <div className="posts__old">
                { postsElements }
            </div>
        </div>
    )
}