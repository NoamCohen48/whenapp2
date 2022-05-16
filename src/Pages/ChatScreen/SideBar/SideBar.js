import React from 'react';
import { useUserContext } from '../../../Contexts/UserContextProvider.js';
import AddContactModal from './AddContact';
import './SideBar.css';
import SideBarItem from './SideBarItem.js';

function SideBar(props) {
    const { currentUser, contacts } = useUserContext()

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