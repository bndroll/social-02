import {Dispatch} from "redux"

import {usersAPI} from "../../api/usersAPI"
import {updateObjectToArray} from "../../utils/objectsHelpers/objectsHelpers"
import {UserType} from "../../types/types"
import {InferActionsTypes, BaseThunkActionType} from "../redux-store"


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 3,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>,
    filter: {
        term: '',
        friend: null as null | boolean
    }
}

/* ---------------------- AC type: "names" & Reducer & Actions ----------------------- */

const FOLLOW = "social-02/app/FOLLOW",
      UNFOLLOW = "social-02/app/UNFOLLOW",
      SET_CURRENT_PAGE = "social-02/app/SET-CURRENT-PAGE",
      SET_FILTER = "social-02/app/SET-FILTER",
      SET_USERS = "social-02/app/SET-USERS",
      SET_TOTAL_USERS_COUNT = "social-02/app/SET-TOTAL-USERS-COUNT",
      TOGGLE_IS_FETCHING = "social-02/app/TOGGLE-IS-FETCHING",
      TOGGLE_IS_FOLLOWING_PROGRESS = "social-02/app/TOGGLE-IS-FOLLOWING-PROGRESS"


const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: updateObjectToArray(state.users, action.userId, 'id', { followed: true })
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: updateObjectToArray(state.users, action.userId, 'id', {followed: false})
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.page
            }
        }
        case SET_FILTER: {
            return {
                ...state,
                filter: action.payload
            }
        }
        case SET_USERS: {
            return {
                ...state,
                users: action.users
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.count
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.followingInProgress ?
                    [...state.followingInProgress, action.userId] :
                    state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state
    }
}

export const actions = {
    followSuccess: (userId: number) => ({ type: FOLLOW, userId } as const),
    unfollowSuccess: (userId: number) => ({ type: UNFOLLOW, userId } as const),
    setUsers: (users: Array<UserType>) => ({ type: SET_USERS, users } as const),
    setCurrentPage: (page: number) => ({ type: SET_CURRENT_PAGE, page } as const),
    setFilter: (filter: FilterType) => ({ type: SET_FILTER, payload: filter } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: TOGGLE_IS_FETCHING, isFetching } as const),
    toggleFollowingProgress: (followingInProgress: boolean, userId: number) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, followingInProgress, userId } as const)
}

/* -------------------- Thunks ------------------------- */

export const requestUsers = (page: number, pageSize: number, filter: FilterType): ThunkActionType => async (dispatch) => {
    dispatch(actions.toggleIsFetching(true))
    dispatch(actions.setCurrentPage(page))
    dispatch(actions.setFilter(filter))

    const data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend)

    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalUsersCount(data.totalCount))
    dispatch(actions.toggleIsFetching(false))
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsType>,
                                   userId: number,
                                   apiMethod: any,
                                   actionCreator: (userId: number) => ActionsType) => {

    dispatch(actions.toggleFollowingProgress(true, userId))

    const data = await apiMethod(userId)
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }

    dispatch(actions.toggleFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkActionType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, usersAPI.followUser.bind(usersAPI), actions.followSuccess)
}

export const unfollow = (userId: number): ThunkActionType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, usersAPI.unfollowUser.bind(usersAPI), actions.unfollowSuccess)
}

/* -------------------- Types ------------------------- */

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
type ActionsType = InferActionsTypes<typeof actions>
type ThunkActionType = BaseThunkActionType<ActionsType>

export default usersReducer