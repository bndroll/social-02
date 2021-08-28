import React, {useEffect} from "react"

import {Paginator} from "../Common/Paginator/Paginator"
import {User} from "./User/User"
import {UsersSearchForm as UsersSearchPanel} from "./UsersSearchPanel/UsersSearchPanel"

import './Users.scss'
import {FilterType, requestUsers, follow, unfollow} from "../../redux/Reducers/usersReducer"
import {useDispatch, useSelector} from "react-redux"
import {
    getCurrentPage, getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/Selectors/UsersSelectors"
import { useHistory } from "react-router-dom"
import * as queryString from "querystring"


type QueryParamsType = {
    term?: string
    page?: string
    friend?: string
}

export const Users: React.FC = () => {
    const totalUsersCount = useSelector(getTotalUsersCount),
          currentPage = useSelector(getCurrentPage),
          pageSize = useSelector(getPageSize),
          filter = useSelector(getUsersFilter),
          users = useSelector(getUsers),
          followingInProgress = useSelector(getFollowingInProgress)


    const dispatch = useDispatch(),
          history = useHistory()

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.slice(1)) as QueryParamsType

        let actualPage = currentPage,
            actualFilter = filter

        if (parsed.page) actualPage = Number(parsed.page)

        if (parsed.page) actualFilter = {...actualFilter, term: parsed.term as string}
        if (parsed.page) actualFilter = {...actualFilter, friend: parsed.friend === 'null' ? null : parsed.friend === 'true'}

        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        const query: QueryParamsType = {}

        if (filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)

        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const followUser = (userId: number) => {
        dispatch(follow(userId))
    }

    const unfollowUser = (userId: number) => {
        dispatch(unfollow(userId))
    }

    return (
        <div className="content__users">
            <UsersSearchPanel onFilterChanged={onFilterChanged} />
            <Paginator totalItemsCount={totalUsersCount}
                       pageSize={pageSize}
                       currentPage={currentPage}
                       onPageChanged={onPageChanged} />
            <div className="users__list">
                { users.map(user => <User key={user.id}
                                          user={user}
                                          onFollowClick={followUser}
                                          followingInProgress={followingInProgress}
                                          onUnfollowClick={unfollowUser} />) }
            </div>
        </div>
    )
}