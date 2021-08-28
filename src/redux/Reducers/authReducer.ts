import {FormAction, stopSubmit} from "redux-form"

import {headerAPI} from "../../api/headerAPI"
import {securityAPI} from "../../api/securityAPI"
import {ResultCodesEnum, ResultCodeWithCaptchaEnum} from "../../api/API"
import {BaseThunkActionType, InferActionsTypes} from "../redux-store"


const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

/* ---------------------- AC type: "names" & Reducer & Actions ----------------------- */

const SET_USER_DATA = 'social-2/auth/SET-USER-DATA',
      GET_CAPTCHA_URL_SUCCESS = 'social-2/auth/GET-CAPTCHA-URL-SUCCESS'

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data
            }
        }
        case GET_CAPTCHA_URL_SUCCESS: {
            return {
                ...state,
                ...action.data
            }
        }
        default:
            return state
    }
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: SET_USER_DATA, data: { userId, email, login, isAuth }
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: GET_CAPTCHA_URL_SUCCESS, data: { captchaUrl }
    } as const),
}

/* --------------------- Thunks ------------------------ */

export const getAuthUserData = (): ThunkActionType => async (dispatch) => {
    const data = await headerAPI.setUser()

    if (data.resultCode === ResultCodesEnum.Success) {
        const {id, email, login} = data.data
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkActionType => async (dispatch) => {
    const data = await headerAPI.loginUser(email, password, rememberMe, captcha)

    if (data.resultCode === ResultCodesEnum.Success) {
        await dispatch(getAuthUserData())
    } else {
        if (data.resultCode === ResultCodeWithCaptchaEnum.CaptchaIsRequired) {
            await dispatch(getCaptchaUrl())
        }

        const message = data.messages.length > 0 ? data.messages[0] : 'some wrong'
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const getCaptchaUrl = (): ThunkActionType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl(),
          captchaUrl = data.url

    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export const logout = (): ThunkActionType => async (dispatch) => {
    const data = await headerAPI.logoutUser()

    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

/* -------------------- Types ------------------------- */

type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkActionType = BaseThunkActionType<ActionsType | FormAction>

export default authReducer