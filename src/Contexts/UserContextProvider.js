import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { addMessage, resetMessages } from '../db/messages';
import { addContact, findPerson, resetUsers } from '../db/users';
import { server } from '../Utils/Globals';

const UserContext = createContext();

// const ACTIONS = {
//     ADD_MESSAGE: 'add message',
//     REMOVE_MESSAGE: 'remove message',
//     SET_USER: 'set current user',
// }

// const reducer = (state, action) => {
//     switch (action.type) {
//         case ACTIONS.ADD_MESSAGE:

//             break
//         case ACTIONS.REMOVE_MESSAGE:

//             break
//         case ACTIONS.SET_USER:

//             break
//         default:
//             break
//     }
// }



export function useUserContext() {
    return useContext(UserContext);
}

export function UserContextProvider(props) {
    const [curUser, setCurUser] = useState(null);
    const [chats, setChats] = useState(new Map());

    const enterUser = async () => {
        const _chats = new Map()

        // get all contacts
        const response = await axios.get(server + "api/contacts")

        // for each contact fetch messages
        response.data.forEach(async element => {
            // fetch messages
            const response = await axios.get(`${server}api/contacts/${element.id}/messages`)

            element.messages = [...response.data]

            _chats.set(element.id, element)

        })

        setChats(_chats)
    }

    useEffect(() => {
        setCurUser(null)


        let usernameStorage = localStorage.getItem('username');
        if (!usernameStorage) {
            setCurUser(undefined)
            return;
        }

        let user = findPerson({ username: usernameStorage })[0];

        if (!user) {
            setCurUser(undefined)
            return
        }

        setCurUser(user)
    }, [])

    // fetching info when a new user entred
    function userEntered(username) {
        localStorage.setItem('username', username)

        setCurUser(findPerson({ username: username })[0])
    }

    return (
        <UserContext.Provider value={{ curUser, userEntered }} >
            {props.children}
        </UserContext.Provider>
    )
}