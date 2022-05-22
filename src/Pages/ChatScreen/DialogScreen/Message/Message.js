import React from 'react';
import './Message.css';

function Message({ className, message }) {
    className = className.concat(' ', message.sent ? ' my-message' : ' other-message');

    let contect;
    switch ('text') {
        case 'text':
            contect = <p>{message.content}</p>
            break;
        case 'audio':
            contect = <audio src={message.content} controls />
            break
        case 'video':
            contect = <video src={message.content} controls />
            break;
        case 'img':
            contect = <img src={message.content} alt='alt text' />
            break
        default:
            <p>Unkown Type</p>
    }

    const date = new Date(message.created)
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];
    let dateStr = `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}, ${String(day).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${year}`;
    // let dateStr = message.created;

    return (
        <>
            <div className={className}>
                {contect}
                <p className='date'>{dateStr}</p>
            </div>
        </>
    )
}

export default Message;