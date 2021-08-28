import React from "react"
import {connect} from "react-redux"
import {RouteComponentProps, withRouter} from 'react-router-dom'
import {compose} from "redux"

import {Profile} from "./Profile"
import {getUserStatus, savePhoto, setProfile, updateUserStatus, saveProfile} from "../../redux/Reducers/profileReducer"
import {withAuthRedirect} from "../../hoc/withAuthRedirect"
import {getIsAuth, getProfile, getStatus, getUserId} from "../../redux/Selectors/ProfileSelectors"
import {AppStateType} from "../../redux/redux-store"
import {ProfileType} from "../../types/types"


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    setProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
    updateUserStatus: (status: string) => void
}
type PathParamsType = { userId: string }
type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>


class ProfileContainer extends React.Component<PropsType> {
    refreshProfile = () => {
        let userId: number | null = +this.props.match.params.userId
        if (!userId) {
            userId = this.props.registeredUserId
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        if (userId) {
            this.props.setProfile(userId)
            this.props.getUserStatus(userId)
        }
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: PropsType, prevState: ProfileType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <Profile {...this.props}
                     isOwner={!this.props.match.params.userId}
                     profile={this.props.profile}
                     savePhoto={this.props.savePhoto}
                     updateStatus={this.props.updateUserStatus}
                     saveProfile={this.props.saveProfile}
                     status={this.props.status} />
        )
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        profile: getProfile(state),
        status: getStatus(state),
        registeredUserId: getUserId(state),
        isAuth: getIsAuth(state)
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        setProfile,
        getUserStatus,
        savePhoto,
        saveProfile,
        updateUserStatus }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)