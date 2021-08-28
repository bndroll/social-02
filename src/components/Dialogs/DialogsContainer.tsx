import React from "react"
import {connect} from "react-redux"
import {compose} from "redux"

import {actions} from "../../redux/Reducers/dialogsReducer"
import {Dialogs} from "./Dialogs"
import {withAuthRedirect} from "../../hoc/withAuthRedirect"
import {AppStateType} from "../../redux/redux-store"
import './Dialogs.scss'


const mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {...actions}),
    withAuthRedirect
)(Dialogs)