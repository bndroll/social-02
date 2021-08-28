import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {Redirect} from "react-router-dom"

import {LoginReduxForm, LoginFormValuesType} from "./LoginForm/LoginForm"
import './Login.scss'
import {AppStateType} from "../../redux/redux-store"
import {login} from "../../redux/Reducers/authReducer"


const Login: React.FC = () => {
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl),
        isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch()

    const onSubmit = ({email, password, rememberMe, captcha}: LoginFormValuesType) => {
        dispatch(login(email, password, rememberMe, captcha))
    }

    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <div className="content__login">
            <div className="login__container">
                <div className="login__message">
                    <div className="login__text">
                        Please<br/>Login
                    </div>
                    <div className="login__picture">
                        <i className="fas fa-sign-in-alt"/>
                    </div>
                </div>

                <LoginReduxForm captchaUrl={captchaUrl} onSubmit={onSubmit}/>
            </div>
        </div>
    )
}

export default Login