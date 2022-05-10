import { useEffect, useLayoutEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useRenderContext } from '../../../Contexts/RenderContextProvider';
import { useUserContext } from '../../../Contexts/UserContextProvider';
import { addMessage, reset } from '../../../db/messages';
import { addContact, registerPerson } from '../../../db/users';
import DialogScreen from '../DialogScreen/DialogScreen.js';
import SideBar from '../SideBar/SideBar.js';
import './ChatScreen.css';

function ChatScreen(props) {
    //const userContext = 
    const { curUser, chats, userEntered } = useUserContext()
    let { } = useRenderContext();

    // TODO: find a solution for fetching contacts, 
    // now doing it here, putting in context and extracting in side bar
    // Need a way to tell this parent that side bar is loading. 

    if (curUser === undefined) {
        return <Navigate to="/" replace={true} />
    }

    return (
        <>
            <div className='container-xl chat-container c-shadow'>
                <div className='row'>
                    <div className="col-4 side-bar" >
                        <SideBar />
                    </div>
                    <div className="col-8 dialog-screen" >
                        <DialogScreen />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatScreen;