import React, { useRef } from 'react';
import { useUserContext } from '../../../Contexts/UserContextProvider.js';
import { findPerson } from '../../../db/users.js';

function  AddContact(props) {
    const userContext = useUserContext()

    const usernameInput = useRef(undefined)
    const closeBtn = useRef(undefined)
    const errorText = useRef();

    function onKeyPress(event) {
        if (event.key === 'Enter') {
            addContact();
        }
    }

    function addContact() {
        let username = usernameInput.current.value;

        let person = findPerson({ username: username })

        if (person <= 0) {
            errorText.current.style.visibility = "visible";
            errorText.current.textContent = "User not found.";
            return;
        }

        if (username === userContext.curUser.username) {
            errorText.current.style.visibility = "visible";
            errorText.current.textContent = "You can't add yourself!";
            return;
        }

        if (props.contacts.filter(personUserName => personUserName === username).length >= 1) {
            errorText.current.style.visibility = "visible";
            errorText.current.textContent = "User already present.";
            return;
        }

        props.addContact(usernameInput.current.value);

        closeBtn.current.click();
        usernameInput.current.value = ''
        errorText.current.style.visibility = "hidden";

    }

    return (
        <div className="modal fade" id={props.id} tabIndex={props.tabindex} aria-labelledby={props.aria_labelledby} aria-hidden={props.aria_hidden}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <p className="modal-title" id="AddContactModalLabel">Add Contact</p>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <input type="text" className="form-control" placeholder="User Name" ref={usernameInput} onKeyDown={onKeyPress} />
                        <p ref={errorText} className='error'></p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeBtn}>Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={addContact}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddContact;