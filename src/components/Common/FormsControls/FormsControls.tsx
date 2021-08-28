import React from "react"
import {Field, WrappedFieldProps} from "redux-form"

import './FormsControl.scss'
import {FieldValidatorType} from "../../../utils/validators/validators"


/* ----------------------- Custom Textarea ----------------------- */

export const TextareaConstructor: React.FC<WrappedFieldProps> = ({input, meta: { touched, error },  ...props}) => {
    const hasError = error && touched

    return (
        <div className={`posts__area_control ${ hasError && 'posts__textarea_error' }`}>
            <textarea {...input} {...props} />
            { hasError && <span className="posts__area_error">
                {error}
                <i className="fas fa-exclamation"/>
            </span> }
        </div>
    )
}

/* ----------------------- Custom Input ----------------------- */

export const InputConstructor: React.FC<WrappedFieldProps> = ({input, meta: { touched, error }, ...props}) => {
    const hasError = error && touched

    return (
        <div className={`posts__area_control ${ hasError && 'posts__textarea_error' }`}>
            <input {...input} {...props} />
            { hasError && <span className="posts__area_error">
                <i className="fas fa-exclamation"/>
            </span> }
        </div>
    )
}

/* ----------------------- Create Field FuncConstructor ----------------------- */

export function CreateField<FormsKeysType extends string> (containerClass: string,
                            component: React.FC<WrappedFieldProps>,
                            name: FormsKeysType,
                            placeholder: string | undefined,
                            type: string,
                            validators: Array<FieldValidatorType>,
                            className: string) {

    return <div className={containerClass}>
               <Field component={component} name={name}
                      placeholder={placeholder} type={type}
                      validate={validators} className={className} />
           </div>
}

export type GetStringKeys<T> = Extract<keyof T, string>