import {ChatMessageType} from "../redux/Reducers/chatReducer";

const subscribes = {
    'messages-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[]
}

let ws: WebSocket | null

const closeHandler = () => {
    notifySubscribesAboutStatus('pending')
    setTimeout(createChannel, 1000)
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribes['messages-received'].forEach(s => s(newMessages))
}

const openHandler = () => {
    notifySubscribesAboutStatus('ready')
}

const errorHandler = () => {
    notifySubscribesAboutStatus('error')
    console.error('refresh page')
}

const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}

const notifySubscribesAboutStatus = (status: StatusType) => {
    subscribes['status-changed'].forEach(s => s(status))
}

function createChannel() {
    cleanUp()
    ws?.close()

    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribesAboutStatus('pending')

    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}

export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribes['messages-received'] = []
        subscribes['status-changed'] = []
        cleanUp()
        ws?.close()
    },
    subscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribes[eventName].push(callback)

        return () => {
            // @ts-ignore
            subscribes[eventName] = subscribes[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribes[eventName] = subscribes[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}

type MessagesReceivedSubscriberType = (messages: ChatMessageType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void
export type EventsNamesType = 'messages-received' | 'status-changed'
export type StatusType = 'pending' | 'ready' | 'error'