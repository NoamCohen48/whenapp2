import React from 'react';
import { useChatContext } from '../../../Contexts/ChatContextProvider';
import './DialogScreen.css';
import InputBar from './InputBar/InputBar';
import Message from './Message/Message';

function DialogScreen(props) {
    const { chatWith, messages } = useChatContext();

    if (chatWith === undefined) {
        return <img className='openImage' src='https://media3.giphy.com/media/12B39IawiNS7QI/giphy.gif?cid=790b7611ec1e7822201342c1c07e3c9b78cdc818ee32314c&rid=giphy.gif&ct=g' alt='' />;
    }

    return (
        <>
            <div className='top-bar'>
                <div className="chat-about">
                    <img className="avatar" src={chatWith.img} alt='avatar' />
                    <h1 className="name">{chatWith.name}</h1>
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