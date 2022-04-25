import React from 'react';
import './Message.css';

function Message(props) {
    let className = props.className.concat(' ', props.message.iSent ? ' my-message' : ' other-message');

    let contect;
    switch (props.message.type) {
        case 'text':
            contect = <p>{props.message.data}</p>
            break;
        case 'audio':
            contect = <audio src={props.message.data} controls />
            break
        case 'video':
            contect = <video src={props.message.data} controls />
            break;
        case 'img':
            contect = <img src={props.message.data} alt='alt text' />
            break
        default:
            <p>Unkown Type</p>
    }

    const date = props.message.date;
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];
    let dateStr = `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}, ${String(day).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${year}`;

    // var options = {year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minutes: 'numeric'};
    // dateStr = date.toLocaleString("en-US", options)
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