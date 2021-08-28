import {GetItemsType, instance, ResponseType} from "./API"


export const usersAPI = {
    getUsers(page = 1, pageSize = 10, term: string = '', friend: null | boolean = null) {
        return instance.get<GetItemsType>(`users?page=${page}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
                       .then(response => response.data)
    },
    followUser(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`, null)
                       .then(response => response.data)
    },
    unfollowUser(userId: number) {
        return instance.delete(`follow/${userId}`)
                       .then(response => response.data) as Promise<ResponseType>
    }
}