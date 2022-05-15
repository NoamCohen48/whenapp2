import axios from 'axios';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { thisServer } from '../Utils/Globals';
import { useUserContext } from './UserContextProvider';

const ChatContext = createContext();

export function useChatContext() {
    return useContext(ChatContext);
}

function ChatContextProvider(props) {
    const { currentUser, fetchContacts } = useUserContext()

    const [chatWith, setChatWith] = useState(undefined);
    const [messages, setMessages] = useState([])

    const addMessage = async (content) => {
        try {
            const myResponse = await axios.post(
                `https://${thisServer}/api/contacts/${chatWith.id}/messages`,
                { content },
                { withCredentials: true }
            )

            const hisResponse = await axios.post(
                `https://${chatWith.server}/api/transfer`,
                { from: currentUser.id, to: chatWith.id, content: content },
                { withCredentials: true }
            )

        } catch (error) {
            console.log(error)
        }

        // refetch mesages
        fetchMessages()
        fetchContacts()
    }

    const fetchMessages = useCallback(async () => {
        if (chatWith === null || chatWith === undefined) {
            return;
        }

        const response = await axios.get(
            `https://${thisServer}/api/contacts/${chatWith.id}/messages`,
            { withCredentials: true }
        )

        setMessages(response.data)
    }, [chatWith])

    const changeCurrentChat = async (user) => {
        setChatWith(user)
    }

    useEffect(() => {
        fetchMessages()
    }, [chatWith])

    const value = { chatWith, messages, addMessage, changeCurrentChat, fetchMessages }

    return (
        <ChatContext.Provider value={value}>
            {props.children}
        </ChatContext.Provider>
    )
}

export default ChatContextProvider;