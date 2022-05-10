import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../../Contexts/UserContextProvider.js';
import { addMessage, reset, resetMessages } from '../../../db/messages.js';
import { thisServer } from '../../../Utils/Globals.js';
import AddContact from './AddContact';
import './SideBar.css';
import SideBarItem from './SideBarItem.js';

function SideBar(props) {
    //const userContext = 
    const { currentUser, contacts, userEntered } = useUserContext()

    const addContact = async (username, otherServer, nickname) => {
        //TODO: Add Contact

        //1. add my server
        const myResponse = await axios.post(
            `${thisServer}/api/contacts/`,
            { id: username, server: otherServer, name: nickname },
            { withCredentials: true },
        )

        //2. add other server
        const otherResponse = await axios.post(
            `${otherServer}/api/invitations/`,
            { from: currentUser.id, to: username, server: thisServer },
            { withCredentials: true },
        )
    }

    /*
    TODO:
    1. create component of items
    2. list as column flexbox
    3. each has function that changes the setter
    4. fetch contacts
    5. design top bar
    */

    return (
        <>
            <div className='top-bar'>
                <img src={currentUser.img} alt='' />
                <div className='user-info'>
                    <p>{currentUser.nickname}</p>
                    <p>{currentUser.id}</p>
                </div>
                <i className="bi bi-person-plus" data-bs-toggle="modal" data-bs-target="#AddContactModal" />
                <AddContact id="AddContactModal" tabindex="-1" aria_labelledby="AddContactModalLabel" aria_hidden="true" contacts={contacts} addContact={addContact} />
            </div>
            <div className='contacts-list scroll--simple list-group'>
                {contacts.map(contact =>
                    <SideBarItem key={contact.id} contact={contact} />
                )}
            </div>
        </>
    )
}

export default SideBar;