//import {createSelector} from "reselect"
import {AppStateType} from "../redux-store"


export const getUsers = (state: AppStateType) => {
    return state.usersPage.users
}

// An example of creating a complex selector that makes rendering work easier
// export const getUsersSelector = createSelector(getUsers, (users) => {
//     return users.filter(user => true)
// })

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress
}

export const getUsersFilter = (state: AppStateType) => {
    return state.usersPage.filter
}