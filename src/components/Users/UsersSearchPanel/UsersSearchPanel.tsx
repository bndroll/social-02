import {Field, Form, Formik} from "formik"
import React from "react"

import './UsersSearchPanel.scss'
import {FilterType} from "../../../redux/Reducers/usersReducer"
import {useSelector} from "react-redux"
import {getUsersFilter} from "../../../redux/Selectors/UsersSelectors"


type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
type FriendFormType = 'null' | 'true' | 'false'
type FormType = {
    term: string
    friend: FriendFormType
}


export const UsersSearchForm: React.FC<PropsType> = React.memo(({onFilterChanged}) => {
    const filter = useSelector(getUsersFilter)
    const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true'
        }

        onFilterChanged(filter)
        setSubmitting(false)
    }

    return (
        <div className="users__search_panel_container">
            <Formik
                enableReinitialize
                initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormType }}
                onSubmit={submit}
            >
                {({isSubmitting}) => (
                    <Form className="users__search_panel_form">
                        <div className="users__search_panel_form_container">
                            <Field className="users__search_panel_input" type="text" name="term"/>
                            <Field as="select" className="users__search_panel_select" type="select" name="friend">
                                <option value="null">All</option>
                                <option value="true">Only Followed</option>
                                <option value="false">Only Unfollowed</option>
                            </Field>
                        </div>
                        <button className="users__search_panel_button" type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
})