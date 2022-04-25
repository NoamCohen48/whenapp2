import React from 'react';
import { useChatContext } from '../../../Contexts/ChatContextProvider';
import { receiveMessages } from '../../../db/messages';
import { findPerson } from '../../../db/users';


function SideBarItem(props) {
    let ChatContext = useChatContext();

    let person = findPerson({ username: props.username })[0];

    function selectChat(event) {
        ChatContext.setCurChat(person);
    }

    let messages = receiveMessages(person.username)

    var lastMessage = messages[messages.length - 1];

    let lastMessageText;
    let dateStr;

    if (lastMessage === undefined) {
        lastMessageText = '';
        dateStr = '';
    }
    else {
        switch (lastMessage.type) {
            case 'text':
                lastMessageText = <p><i className="bi bi-chat-left-dots"></i>{lastMessage.data}</p>;
                break;
            case 'audio':
                lastMessageText = <p><i className="bi bi-file-earmark-music"></i>audio</p>;
                break
            case 'video':
                lastMessageText = <p><i className="bi bi-file-earmark-play"></i>video</p>;
                break;
            case 'img':
                lastMessageText = <p><i className="bi bi-file-image"></i>image</p>;
                break
            default:
                lastMessageText = <p><i className="bi bi-question-circle-fill"></i>unkown</p>;
        }

        const date = lastMessage.date;
        const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
        const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];
        dateStr = `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}, ${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
    }

    /*
    TODO:
    1. create the item and set on click
    2. fix design
    */

    return (
        <div className='contact-item' onClick={selectChat}>
            <img src={person.img} alt='' />
            <div className='item-text'>
                <p>{person.nickname}</p>
                <div className='bottom-text'>
                    {lastMessageText}
                    <p>{dateStr}</p>
                </div>
            </div>
        </div>
    )
}

export default SideBarItem;