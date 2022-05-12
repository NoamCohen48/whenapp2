import React, { useRef, useState } from 'react';
import { useUserContext } from '../../../Contexts/UserContextProvider.js';
import { findPerson } from '../../../db/users.js';

function AddContactModal(props) {
    const { currentUser, contacts, userEntered, addContact } = useUserContext()

    const usernameInput = useRef(null)
    const nicknameInput = useRef(null)
    const serverInput = useRef(null)
    const closeBtn = useRef(undefined)

    const [error, setError] = useState('')

    const onKeyPress = async (event) => {
        if (event.key === 'Enter') {
            submitContact();
        }
    }

    const submitContact = async () => {
        const username = usernameInput.current.value
        const nickname = nicknameInput.current.value
        const server = serverInput.current.value

        if (username === currentUser.id) {
            //errorText.current.style.visibility = "visible";
            setError("You can't add yourself!");
            return;
        }

        if (contacts.filter(personUserName => personUserName === username).length >= 1) {
            //errorText.current.style.visibility = "visible";
            setError("User already present.");
            return;
        }

        await addContact(username, nickname, server);

        closeBtn.current.click()
        usernameInput.current.value = ''
        nicknameInput.current.value = ''
        serverInput.current.value = ''
        setError('')
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
                        <input type="text" className="form-control" placeholder="Username" ref={usernameInput} onKeyDown={onKeyPress} />
                        <input type="text" className="form-control" placeholder="Nickname" ref={nicknameInput} onKeyDown={onKeyPress} />
                        <input type="text" className="form-control" placeholder="Server" ref={serverInput} onKeyDown={onKeyPress} />
                        <p className='error'>{error}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeBtn}>Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={submitContact}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddContactModal;