import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux"
import thunkMiddleWare, {ThunkAction} from "redux-thunk"
import {reducer as formReducer} from "redux-form"

import profileReducer from "./Reducers/profileReducer"
import dialogsReducer from "./Reducers/dialogsReducer"
import usersReducer from "./Reducers/usersReducer"
import authReducer from "./Reducers/authReducer"
import appReducer from "./Reducers/appReducer"
import chatReducer from "./Reducers/chatReducer"


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    chat: chatReducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkActionType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleWare)))

// @ts-ignore
window.store = store

export default store