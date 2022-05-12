import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';
import { thisServer } from '../Utils/Globals';
import { useUserContext } from './UserContextProvider';

const ChatContext = createContext();

export function useChatContext() {
    return useContext(ChatContext);
}

function ChatContextProvider(props) {
    const { currentUser, contacts, userEntered } = useUserContext()
    
    const [chatWith, setChat] = useState(undefined);
    const [messages, setMessages] = useState([])

    const addMessage = async (content) => {
        const myResponse = await axios.post(
            `${thisServer}/api/contacts/${chatWith.id}/messages`,
            { content },
            { withCredentials: true }
        )

        const hisResponse = await axios.post(
            `${chatWith.server}/api/transfer`,
            { from: currentUser.id, to: chatWith.id, content },
            { withCredentials: true }
        )

        // refetch mesages
        fetchMessages(chatWith)
    }

    const fetchMessages = async (user) => {
        const response = await axios.get(
            `${thisServer}/api/contacts/${user.id}/messages`,
            { withCredentials: true }
        )

        setMessages(response.data)
    }

    const changeCurrentChat = async (user) => {
        setChat(user)
        fetchMessages(user)
    }

    const value = {
        chatWith,
        messages,
        addMessage,
        changeCurrentChat
    }

    return (
        <ChatContext.Provider value={value}>
            {props.children}
        </ChatContext.Provider>
    )
}

export default ChatContextProvider;