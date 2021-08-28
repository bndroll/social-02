import axios from "axios"
import {UserType} from "../types/types"


export const instance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': '03de452b-a2f3-4c33-a93a-3553ce839920'
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})

/* ----------------------- Exporting Types --------------------------- */

export type ResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeWithCaptchaEnum {
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}