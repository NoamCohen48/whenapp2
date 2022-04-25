import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../../Contexts/UserContextProvider.js';
import { addMessage, reset, resetMessages } from '../../../db/messages.js';
import AddContact from './AddContact';
import './SideBar.css';
import SideBarItem from './SideBarItem.js';

function SideBar(props) {
    const userContext = useUserContext()
    let user = userContext.curUser;

    const [contacts, setContacts] = useState(userContext.curUser.contacts);

    const addContact = (username) => {
        setContacts((prev) => {
            return prev.concat(username);
        })
    }

    useEffect(() => {
        setContacts([])
        resetMessages();

        if (user.username === 'admin') {
            setContacts((prev) => {
                return prev.concat('mike', 'jhon', 'world');
            })

            addMessage("mike", false, "text", "hello there", new Date());
            addMessage("mike", true, "text", "general kenobi", new Date());
            addMessage("mike", false, "img", "https://cdn.domestika.org/c_limit,dpr_auto,f_auto,q_auto,w_820/v1559596346/content-items/003/031/416/mike_wazowski_Mesa_de_trabajo_1-original.jpg?1559596346", new Date());
            addMessage("mike", true, "text", "lol", new Date());

            addMessage("jhon", false, "text", "sup admin?", new Date());
            addMessage("jhon", true, "text", "im good how are you", new Date());
            addMessage("jhon", false, "text", "you know", new Date());
            addMessage("jhon", true, "text", ":)", new Date());

            addMessage("world", false, "text", "look", new Date());
            addMessage("world", false, "video", "/resources/video.mp4", new Date());
            addMessage("world", true, "text", "nice", new Date());
            addMessage("world", true, "text", "hear this", new Date());
            addMessage("world", true, "audio", "/resources/audio.mp3", new Date());
            addMessage("world", false, "text", "nostalgic", new Date());
        }

    }, [userContext.curUser])

    // useEffect(() => {
    //     if (user.username === 'admin') {
    //         setContacts((prev) => {
    //             return prev.concat('mike', 'jhon', 'world');
    //         })

    //         addMessage("mike", true, "text", "hello there mike?", new Date());
    //         addMessage("mike", false, "text", "yeah", new Date());
    //         addMessage("jhon", true, "text", "bla", new Date());
    //     }
    // }, [])


    /*
    TODO:
    1. create component of items
    2. list as column flexbox
    3. each has function that changes the setter
    4. fetch contacts
    5. design top bar
    */

    // if (chatContext.contacts === undefined) {
    //     return (
    //         <>
    //             <img className='openImage' src='https://www.reddit.com/r/CatGifs/comments/48sql9/hacker_cat_at_it_again_taking_over_the_webs/' alt='' />;
    //         </>
    //     )
    // }

    return (
        <>
            <div className='top-bar'>
                <img src={user.img} alt='' />
                <div className='user-info'>
                    <p>{user.nickname}</p>
                    <p>{user.username}</p>
                </div>
                <i className="bi bi-person-plus" data-bs-toggle="modal" data-bs-target="#AddContactModal" />
                <AddContact id="AddContactModal" tabindex="-1" aria_labelledby="AddContactModalLabel" aria_hidden="true" contacts={contacts} addContact={addContact} />
            </div>
            <div className='contacts-list scroll--simple list-group'>
                {contacts.map(username =>
                    <SideBarItem key={username} username={username} />
                )}
            </div>
        </>
    )
}

export default SideBar;