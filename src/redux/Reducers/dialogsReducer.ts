import {InferActionsTypes} from "../redux-store"


const initialState = {
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Hello World'},
        {id: 3, message: 'YoYo'}
    ] as Array<MessagesType>,
    dialogs: [
        {id: 1, name: 'Dima'},
        {id: 2, name: 'Nikita'},
        {id: 3, name: 'Kirill'},
        {id: 4, name: 'Danil'},
        {id: 5, name: 'Nail'}
    ] as Array<DialogsType>
}

/* ---------------------- AC type: "names" & Reducer & Actions ----------------------- */

const SEND_MESSAGE = 'social-2/dialogsPage/SEND-MESSAGE'

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE: {
            const body = action.newMessageBody
            return {
                ...state,
                messages: [...state.messages, {id: 5, message: body}]
            }
        }
        default:
            return state
    }
}

export const actions = {
    sendMessage: (newMessageBody: string) => ({ type: SEND_MESSAGE, newMessageBody } as const)
}

/* -------------------- Types ------------------------- */

type MessagesType = {
    id: number
    message: string
}
type DialogsType = {
    id: number
    name: string
}
export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

export default dialogsReducer