import React, { createContext, useContext, useEffect, useState } from 'react';
import { addMessage, resetMessages } from '../db/messages';
import { addContact, findPerson, resetUsers } from '../db/users';

const UserContext = createContext();

export function useUserContext() {
    return useContext(UserContext);
}

export function UserContextProvider(props) {
    const [curUser, setCurUser] = useState(undefined);

    useEffect(() => {
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