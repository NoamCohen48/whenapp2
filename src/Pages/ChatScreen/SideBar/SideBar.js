import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../../Contexts/UserContextProvider.js';
import { addMessage, reset, resetMessages } from '../../../db/messages.js';
import { thisServer } from '../../../Utils/Globals.js';
import AddContactModal from './AddContact';
import './SideBar.css';
import SideBarItem from './SideBarItem.js';

function SideBar(props) {
    //const userContext = 
    const { currentUser, contacts, userEntered, addContact } = useUserContext()

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
                <AddContactModal id="AddContactModal" tabindex="-1" aria_labelledby="AddContactModalLabel" aria_hidden="true" />
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