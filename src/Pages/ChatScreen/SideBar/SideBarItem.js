import React from 'react';
import { useChatContext } from '../../../Contexts/ChatContextProvider';
import { receiveMessages } from '../../../db/messages';
import { findPerson } from '../../../db/users';


function SideBarItem({contact}) {
    const { chatWith, messages, addMessage, changeCurrentChat } = useChatContext();

    function selectChat(event) {
        chatWith(contact);
    }

    let lastMessage;
    let dateStr;

    if (chatWith.last === null || chatWith.lastdate === null) {
        lastMessage = '';
        dateStr = '';
    }
    else {
        switch ('text') {
            case 'text':
                lastMessage = <p><i className="bi bi-chat-left-dots"></i>{lastMessage.last}</p>;
                break;
            case 'audio':
                lastMessage = <p><i className="bi bi-file-earmark-music"></i>audio</p>;
                break
            case 'video':
                lastMessage = <p><i className="bi bi-file-earmark-play"></i>video</p>;
                break;
            case 'img':
                lastMessage = <p><i className="bi bi-file-image"></i>image</p>;
                break
            default:
                lastMessage = <p><i className="bi bi-question-circle-fill"></i>unkown</p>;
        }
        const date = chatWith.lastdate
        const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()]
        const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()]
        dateStr = `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}, ${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`
    }

    /*
    TODO:
    1. create the item and set on click
    2. fix design
    */

    return (
        <div className='contact-item' onClick={selectChat}>
            <img src={contact.img} alt='' />
            <div className='item-text'>
                <p>{contact.name}</p>
                <div className='bottom-text'>
                    {lastMessage}
                    <p>{dateStr}</p>
                </div>
            </div>
        </div>
    )
}

export default SideBarItem;