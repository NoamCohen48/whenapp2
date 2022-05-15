import axios from 'axios';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { addMessage, resetMessages } from '../db/messages';
import { addContact, findPerson, resetUsers } from '../db/users';
import { thisServer } from '../Utils/Globals';
import { useSignalContext } from './SignalContextProvider';

const UserContext = createContext();

export function useUserContext() {
    return useContext(UserContext);
}

export function UserContextProvider(props) {
    const [currentUser, setCurrentUser] = useState(null);
    const [contacts, setContacts] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const fetchUser = async (username) => {
        const userResponses = await axios.get(`https://${thisServer}/api/contacts/${username}`, { withCredentials: true })
        return userResponses.data
    }

    const fetchContacts = useCallback(async () => {
        const chatsResponses = await axios.get(`https://${thisServer}/api/contacts`, { withCredentials: true })
        setContacts(chatsResponses.data)
        console.log(chatsResponses.data);
    }, [])

    const userEntered = async (username) => {
        //const userResponses = await fetchUser(username)
        await fetchContacts()

        setCurrentUser({
            id: username,
            nickname: "amazing username",
            img: "https://w7.pngwing.com/pngs/867/319/png-transparent-mr-krabs-patrick-star-krusty-krab-remix-music-bob-sponge-cartoon-vehicle-music-download.png"
        })

        // get all contacts
        //TODO: Add Token
        //const response = await axios.get(`${server}/api/contacts`, { withCredentials: true })

        //localStorage.setItem('User_Token', user.token)

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

    useEffect(() => {
        if (currentUser === null || currentUser === undefined) {
            return
        }

        return;

        fetchContacts()
    }, [currentUser])

    /*
    useEffect(() => {
        setCurUser(null)

        let usernameStorage = localStorage.getItem('User_Token');
        if (!usernameStorage) {
            return;
        }

        let user = findPerson({ username: usernameStorage })[0];

        if (!user) {
            setCurUser(undefined)
            return
        }

        setCurUser(user)
    }, [])
    */

    const value = { currentUser, contacts, userEntered, addContact, fetchContacts }

    return (
        <UserContext.Provider value={value} >
            {props.children}
        </UserContext.Provider>
    )
}