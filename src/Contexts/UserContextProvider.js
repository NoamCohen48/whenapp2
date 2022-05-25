import axios from 'axios';
import React, { createContext, useCallback, useContext, useState } from 'react';
import { thisServer } from '../Utils/Globals';

const UserContext = createContext();

export function useUserContext() {
    return useContext(UserContext);
}

export function UserContextProvider(props) {
    const [currentUser, setCurrentUser] = useState(null);
    const [contacts, setContacts] = useState(null);

    const fetchUser = async (username) => {
        const userResponses = await axios.get(
            `https://${thisServer}/api/contacts/${username}`,
            { withCredentials: true }
        )

        return userResponses.data
    }

    const fetchContacts = useCallback(async () => {
        const chatsResponses = await axios.get(
            `https://${thisServer}/api/contacts`,
            { withCredentials: true }
        )

        const contacts = chatsResponses.data
        contacts.forEach(contact => {
            contact.img = 'https://i.stack.imgur.com/l60Hf.png'
        })

        setContacts(contacts)
    }, [])

    const userEntered = async (username) => {
        await fetchContacts()

        setCurrentUser({
            id: username,
            nickname: username,
            img: "https://w7.pngwing.com/pngs/867/319/png-transparent-mr-krabs-patrick-star-krusty-krab-remix-music-bob-sponge-cartoon-vehicle-music-download.png"
        })
    }

    const addContact = async (username, nickname, otherServer) => {
        //1. add my server
        const myResponse = await axios.post(
            `https://${thisServer}/api/contacts/`,
            { id: username, server: otherServer, name: nickname },
            { withCredentials: true },
        )

        //2. add other server
        const otherResponse = await axios.post(
            `https://${otherServer}/api/invitations/`,
            { from: currentUser.id, to: username, server: thisServer },
            { withCredentials: true },
        )

        await fetchContacts()
    }

    const value = { currentUser, contacts, userEntered, addContact, fetchContacts }

    return (
        <UserContext.Provider value={value} >
            {props.children}
        </UserContext.Provider>
    )
}