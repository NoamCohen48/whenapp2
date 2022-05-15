import { HubConnectionBuilder } from "@microsoft/signalr";
import { createContext, useContext, useEffect, useState } from "react";
import { thisServer } from "../Utils/Globals";
import { useChatContext } from "./ChatContextProvider";
import { useUserContext } from "./UserContextProvider";

const SignalContext = createContext()

export function useSignalContext() {
    return useContext(SignalContext);
}

export const SignalContextProvider = (props) => {
    const { currentUser, fetchContacts } = useUserContext()
    const { fetchMessages } = useChatContext()

    const [connection, setConnection] = useState(undefined)

    const Connect = async () => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl(`https://${thisServer}/chat`)
                .build()

            await connection.start()
            setConnection(connection)

            await connection.invoke("Connect", currentUser.id)

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        Connect()
    }, [])

    useEffect(() => {
        if (connection === null || connection === undefined)
            return

        connection.off("MessageReceived")

        connection.on("MessageReceived", async () => {
            await fetchContacts()
            await fetchMessages()
        })
    }, [connection, fetchContacts, fetchMessages])

    const value = {}

    return (
        <SignalContext.Provider value={value}>
            {props.children}
        </SignalContext.Provider>
    )
}