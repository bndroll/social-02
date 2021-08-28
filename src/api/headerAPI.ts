import {instance, ResultCodesEnum, ResultCodeWithCaptchaEnum, ResponseType} from "./API"


export const headerAPI = {
    setUser() {
        return instance.get<ResponseType<SetUserResponseDataType>>(`auth/me`)
                       .then(response => response.data)
    },
    loginUser(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<ResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodeWithCaptchaEnum>>(`auth/login`, { email, password, rememberMe, captcha })
                       .then(response => response.data)
    },
    logoutUser() {
        return instance.delete(`auth/login`)
                       .then(response => response.data)
    }
}

type SetUserResponseDataType = {
    id: number
    email: string
    login: string
}
type LoginResponseDataType = {
    userId: number
}
