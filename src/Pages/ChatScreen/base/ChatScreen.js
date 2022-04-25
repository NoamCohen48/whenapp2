import { useEffect, useLayoutEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useRenderContext } from '../../../Contexts/RenderContextProvider';
import { useUserContext } from '../../../Contexts/UserContextProvider';
import { addMessage, reset } from '../../../db/messages';
import { addContact, registerPerson } from '../../../db/users';
import DialogScreen from '../DialogScreen/DialogScreen.js';
import SideBar from '../SideBar/SideBar.js';
import './ChatScreen.css';

function init() {
    // addContact('admin', 'mike');
    // addContact('admin', 'jhon');
    // addContact('admin', 'world');

    addMessage("mike", true, "text", "hello there mike?", new Date());
    addMessage("mike", false, "text", "yeah", new Date());
    addMessage("jhon", true, "text", "bla", new Date());
}

function ChatScreen(props) {
    const userContext = useUserContext()
    let { } = useRenderContext();

    const navigate = useNavigate();

    // useLayoutEffect(() => {
    //     if (userContext.curUser === undefined)
    //         return

    //     if (userContext.curUser.username === 'admin') {
    //         init();
    //     }
    // }, [])

    // TODO: find a solution for fetching contacts, 
    // now doing it here, putting in context and extracting in side bar
    // Need a way to tell this parent that side bar is loading. 

    // useEffect(()=>{
    //     reset();
    // }, [])

    if (userContext.curUser === undefined) {
        return <Navigate to="/" replace={true} />
        // return (
        //     <div className='container-lg chat-container c-shadow'>
        //         <img className='loading' src='https://media1.giphy.com/media/o0vwzuFwCGAFO/giphy.gif?cid=790b761134e48271ad5c493da81e35ff316e9569c83fa42c&rid=giphy.gif&ct=g' alt='' />;
        //     </div>
        // )
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