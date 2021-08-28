import React, {useEffect, useRef, useState} from "react"

import './Messages.scss'
import {Message} from "./Message/Message"
import {useSelector} from "react-redux"
import {AppStateType} from "../../../../redux/redux-store"


export const Messages: React.FC = () => {
    const messagesFlagRef = useRef<HTMLDivElement>(null)
    const [autoScroll, setAutoScroll] = useState(true)

    const messages = useSelector((state: AppStateType) => state.chat.messages)

    useEffect(() => {
        if (autoScroll) {
            messagesFlagRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const elem = e.currentTarget
        if (elem.scrollHeight - elem.scrollTop < messages.length * 10) {
            !autoScroll && setAutoScroll(true)
        } else {
            autoScroll && setAutoScroll(false)
        }
    }

    return (
        <div onScroll={scrollHandler} className='messages__container'>
            { messages.map(m => <Message key={m.id} message={m} />) }
            <div ref={messagesFlagRef}/>
        </div>
    )
}