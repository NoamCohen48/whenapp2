import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { addMessage, resetMessages } from '../db/messages';
import { addContact, findPerson, resetUsers } from '../db/users';
import { thisServer } from '../Utils/Globals';

const UserContext = createContext();

export function useUserContext() {
    return useContext(UserContext);
}

export function UserContextProvider(props) {
    const [currentUser, setCurrentUser] = useState(null);
    const [contacts, setContacts] = useState(null);

    const userEntered = async (username) => {
        const userResponses = await axios.get(`${thisServer}/api/contacts/${username}`, { withCredentials: true })
        const chatsResponses = await axios.get(`${thisServer}/api/contacts`, { withCredentials: true })

        setCurrentUser(userResponses.data)


        // get all contacts
        //TODO: Add Token
        //const response = await axios.get(`${server}/api/contacts`, { withCredentials: true })

        //localStorage.setItem('User_Token', user.token)

        setContacts(chatsResponses.data)
    }

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

    const value = {
        currentUser,
        contacts,
        userEntered
    }

    return (
        <UserContext.Provider value={value} >
            {props.children}
        </UserContext.Provider>
    )
}