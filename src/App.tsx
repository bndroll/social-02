import React, {ComponentType} from "react"
import {BrowserRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom'
import {connect, Provider} from "react-redux"
import {compose} from "redux"

import Header from "./components/Header/Header"
import Nav from './components/Nav/Nav'
import {initializeApp} from "./redux/Reducers/appReducer"
import {Preloader} from "./components/Common/Preloader/Preloader"
import {withSuspense} from "./hoc/withSuspense"
import store, {AppStateType} from "./redux/redux-store"
import './App.scss'


const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer')),
      DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer')),
      UsersPage = React.lazy(() => import('./components/Users/UsersPage')),
      Login = React.lazy(() => import('./components/Login/Login')),
      ChatPage = React.lazy(() => import('./pages/ChatPage/ChatPage'))

const SuspendedProfile = withSuspense(ProfileContainer),
      SuspendedDialogs = withSuspense(DialogsContainer),
      SuspendedUsers = withSuspense(UsersPage),
      SuspendedLogin = withSuspense(Login),
      SuspendedChat = withSuspense(ChatPage)

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = { initializeApp: () => void }

class App extends React.Component<MapPropsType & DispatchPropsType> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className='wrapper'>
                <div className="container">
                    <Header />
                    <Nav/>
                    <div className="content">
                        <Switch>
                            <Route exact path='/' render={ () => <Redirect to={'/profile'} /> } />
                            <Route path='/profile/:userId?' render={ () => <SuspendedProfile /> } />
                            <Route path='/dialogs' render={ () => <SuspendedDialogs /> } />
                            <Route path='/users' render={ () => <SuspendedUsers /> } />
                            <Route path='/login' render={ () => <SuspendedLogin /> } />
                            <Route path='/chat' render={ () => <SuspendedChat /> } />
                            <Route path='*' render={ () => <div className="error__not_found">404: Not Found</div> } />
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

const AppContainer = compose<ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp})
)(App)

const SocialNetworkApp: React.FC = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
    )
}

export default SocialNetworkApp


