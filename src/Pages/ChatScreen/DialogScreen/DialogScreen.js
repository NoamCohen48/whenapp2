import React from 'react';
import { useChatContext } from '../../../Contexts/ChatContextProvider';
import { receiveMessages } from '../../../db/messages';
import './DialogScreen.css';
import InputBar from './InputBar/InputBar';
import Message from './Message/Message';



function DialogScreen(props) {
    let ChatContext = useChatContext();

    if (ChatContext.curChat === undefined) {
        return <img className='openImage' src='https://media3.giphy.com/media/12B39IawiNS7QI/giphy.gif?cid=790b7611ec1e7822201342c1c07e3c9b78cdc818ee32314c&rid=giphy.gif&ct=g' alt='' />;
    }

    let messages = receiveMessages(ChatContext.curChat.username)

    /*
    TODO:
    3. fetch info from db using useEffect
    */

    return (
        <>
            <div className='top-bar'>
                <div className="chat-about">
                    <img className="avatar" src={ChatContext.curChat.img} alt='avatar' />
                    <h1 className="name">{ChatContext.curChat.nickname}</h1>
                </div>
            </div>
            <div className='messages-conteiner scroll--simple'>
                {
                    messages.map(message => {
                        return <Message key={message.id} className="message" message={message} />
                    })
                }
            </div>
            <div className='bot-bar'>
                <InputBar />
            </div>
        </>
    )
}

export default DialogScreen;