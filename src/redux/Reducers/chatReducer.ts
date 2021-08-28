import {ChatMessageAPIType} from "../../types/types"
import {BaseThunkActionType, InferActionsTypes} from "../redux-store"
import {chatAPI, StatusType} from "../../api/chatAPI"
import {Dispatch} from "redux"
import {nanoid} from "nanoid"


const initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}

/* ---------------------- AC type: "names" & Reducer & Actions ----------------------- */

const MESSAGES_RECEIVED = 'social-2/dialogsPage/MESSAGES-RECEIVED',
      SET_CHANGED = 'social-2/dialogsPage/SET-STATUS'

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case MESSAGES_RECEIVED: {
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
                    .map(m => ({...m, id: nanoid()}))
                    .filter((m, i, arr) => i >= arr.length - 100)
            }
        }
        case SET_CHANGED: {
            return {
                ...state,
                status: action.payload.status
            }
        }
        default:
            return state
    }
}

export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({type: MESSAGES_RECEIVED, payload: {messages}} as const),
    statusChanged: (status: StatusType) => ({type: SET_CHANGED, payload: {status}} as const)
}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null
const newMessageHandler = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages: ChatMessageType[]) => {
            dispatch(actions.messagesReceived(messages))
        }
    }

    return _newMessageHandler
}

let _newStatusHandler: ((status: StatusType) => void) | null = null
const newStatusHandler = (dispatch: Dispatch) => {
    if (_newStatusHandler === null) {
        _newStatusHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }

    return _newStatusHandler
}


export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessageHandler(dispatch))
    chatAPI.subscribe('status-changed', newStatusHandler(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe('messages-received', newMessageHandler(dispatch))
    chatAPI.unsubscribe('status-changed', newStatusHandler(dispatch))
    chatAPI.stop()
}

export const sendMessage = (message: string): ThunkType => async () => {
    chatAPI.sendMessage(message)
}

/* -------------------- Types ------------------------- */

export type ChatMessageType = ChatMessageAPIType & {id: string}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkActionType<ActionsType>

export default chatReducer