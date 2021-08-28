import {profileAPI} from "../../api/profileAPI"
import {FormAction, stopSubmit} from "redux-form"
import {FriendsType, PhotosType, PostType, ProfileType} from "../../types/types"
import {BaseThunkActionType, InferActionsTypes} from "../redux-store"


const initialState = {
    posts: [
        {id: 1, message: 'how are u ?', likesCount: 12},
        {id: 2, message: 'hello world', likesCount: 2},
        {id: 3, message: 'fine', likesCount: 67}
    ] as Array<PostType>,
    friends: [
        {id: 1, name: 'Dimas'},
        {id: 2, name: 'Kirill'},
        {id: 3, name: 'Katya'},
        {id: 4, name: 'Nikita'},
        {id: 5, name: 'Nail'},
        {id: 6, name: 'Daniel'},
    ] as Array<FriendsType>,
    profile: null as ProfileType | null,
    status: ''
}

/* ---------------------- AC type: "names" & Reducer & Actions ----------------------- */

const ADD_POST = 'social-2/profilePage/ADD-POST',
    SET_USER_PROFILE = 'social-2/profilePage/SET-USER-PROFILE',
    SET_USER_STATUS = 'social-2/profilePage/SET-USER-STATUS',
    DELETE_POST = 'social-2/profilePage/DELETE-POST',
    SAVE_PHOTO_SUCCESS = 'social-2/profilePage/SAVE-PHOTO-SUCCESS'

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                posts: [...state.posts, {id: 4, message: action.newPostText, likesCount: 0}]
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_USER_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(item => item.id !== action.postId)
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }
        default:
            return state
    }
}

export const actions = {
    addPost: (newPostText: string) => ({ type: ADD_POST, newPostText } as const),
    setUserProfile: (profile: ProfileType)=> ({ type: SET_USER_PROFILE, profile } as const),
    setUserStatus: (status: string) => ({ type: SET_USER_STATUS, status } as const),
    deletePost: (postId: number) => ({ type: DELETE_POST, postId } as const),
    savePhotoSuccess: (photos: PhotosType) => ({ type: SAVE_PHOTO_SUCCESS, photos } as const),
}

/* -------------------- Thunks ------------------------- */

export const setProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.setProfile(userId)

    dispatch(actions.setUserProfile(data))
}

export const getUserStatus = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId)

    dispatch(actions.setUserStatus(data))
}

export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
    const data = await profileAPI.updateStatus(status)

    if (data.resultCode === 0) {
        dispatch(actions.setUserStatus(status))
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(file)

    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const data = await profileAPI.saveProfile(profile)

    if (data.resultCode === 0) {
        if (userId != null) {
            await dispatch(setProfile(userId))
        } else {
            throw new Error('userId cant be null')
        }
    } else {
        dispatch(stopSubmit('editProfile', {_error: data.messages[0]}))
        return Promise.reject(data.messages[0])
    }
}

/* -------------------- Types ------------------------- */

type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkActionType<ActionsType | FormAction>

export default profileReducer