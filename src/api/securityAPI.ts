import {instance} from "./API"


export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrlResponseType>(`security/get-captcha-url`)
                       .then(response => response.data)
    }
}

type GetCaptchaUrlResponseType = {
    url: string
}