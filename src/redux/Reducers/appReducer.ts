import {getAuthUserData} from "./authReducer"
import {BaseThunkActionType, InferActionsTypes} from "../redux-store"


const initialState = {
    initialized: false
}

/* ---------------------- AC type: "names" & Reducer & Actions ----------------------- */

const INITIALIZED_SUCCESS = 'social-02/app/INITIALIZED-SUCCESS'

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state
    }
}

export const actions = {
    initializedSuccess: () => ({ type: INITIALIZED_SUCCESS } as const)
}

/* ----------------------- Thunks ---------------------- */

export const initializeApp = (): ThunkActionType => async (dispatch) => {
    await dispatch(getAuthUserData())
    dispatch(actions.initializedSuccess())
}

/* -------------------- Types ------------------------- */

type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkActionType = BaseThunkActionType<ActionsType>

export default appReducer