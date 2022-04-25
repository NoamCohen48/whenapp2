import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export function useChatContext() {
    return useContext(ChatContext);
}

function ChatContextProvider(props) {
    const [curChat, setCurChat] = useState(undefined);

    return (
        <ChatContext.Provider value={{ curChat, setCurChat }}>
            {props.children}
        </ChatContext.Provider>
    )
}

export default ChatContextProvider;