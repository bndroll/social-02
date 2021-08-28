import React from "react"
import {Field, InjectedFormProps, reduxForm} from "redux-form"

import {InputConstructor, CreateField, GetStringKeys} from "../../Common/FormsControls/FormsControls"
import {requiredField} from "../../../utils/validators/validators"

import './LoginForm.scss'


type LoginFormOwnPropsType = {
    captchaUrl: string | null
}
export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
export type LoginFormValuesKeysType = GetStringKeys<LoginFormValuesType>


const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnPropsType> & LoginFormOwnPropsType> = ({
                                                                         handleSubmit, error, captchaUrl }) => {
    return (
        <>
            <form onSubmit={handleSubmit} className="login__form_container">
                {CreateField<LoginFormValuesKeysType>('form__login',
                    InputConstructor,
                    'email',
                    'Email',
                    'text',
                    [requiredField],
                    'email__input')
                }
                {CreateField<LoginFormValuesKeysType>('form__password',
                    InputConstructor,
                    'password',
                    'Pass',
                    'password',
                    [requiredField],
                    'password__input')
                }
                {captchaUrl && <img className='form__captcha_img' src={captchaUrl} alt="captcha"/>}
                {captchaUrl && CreateField<LoginFormValuesKeysType>('form__captcha',
                    InputConstructor,
                    'captcha',
                    '',
                    'text',
                    [requiredField],
                    'captcha__input')
                }
                <div className="form__remember">
                    <Field component={'input'} name={'rememberMe'} type="checkbox" className="remember__check" />
                    <div className="remember__text">Remember Me</div>
                </div>
                <div className="form__submit">
                    <button className="submit__form">Login</button>
                </div>
            </form>
            {error ? <div className="form__error_block">
                {error}
            </div> : null}
        </>
    )
}

export const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnPropsType>({form: 'login'})(LoginForm)