import React, { useEffect, useRef } from 'react';
import { useChatContext } from '../../../../Contexts/ChatContextProvider';
import { useRenderContext } from '../../../../Contexts/RenderContextProvider';
import { addMessage } from '../../../../db/messages.js';
import useRecorder from '../../../../Hooks/RecorderHook';
import './InputBar.css';

function InputBar(props) {
    let chatContext = useChatContext();

    let inputText = useRef();

    const uploudButtonImg = useRef();
    const uploudButtonVideo = useRef();
    const recorderBtn = useRef();

    let { forceUpdate } = useRenderContext();
    let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();

    function onKeyPress(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    }

    function sendMessage() {
        let text = inputText.current.value;

        if (text === '') {
            return;
        }

        addMessage(chatContext.curChat.username, true, 'text', text, new Date());
        forceUpdate()

        inputText.current.value = ''
    }

    function handleChangeImg(event) {
        let file = URL.createObjectURL(event.target.files[0]);
        addMessage(chatContext.curChat.username, true, 'img', file, new Date());
        uploudButtonImg.current.value = null;
        forceUpdate()
        // props.update();
    }

    useEffect(() => {
        if (audioURL === '') {
            return;
        }

        addMessage(chatContext.curChat.username, true, 'audio', audioURL, new Date());
        forceUpdate()
    }, [audioURL])

    function handleChangeVideo(event) {
        let file = URL.createObjectURL(event.target.files[0]);
        addMessage(chatContext.curChat.username, true, 'video', file, new Date());
        uploudButtonVideo.current.value = null;
        forceUpdate()
    }

    function micClick() {
        if (isRecording) {
            stopRecording();
        }
        else {
            startRecording()
        }
    }

    return (
        <>
            <i className="bi bi-image buttom" onClick={(event) => { uploudButtonImg.current.click(event) }}></i>
            <i className="bi bi-camera-video" onClick={(event) => { uploudButtonVideo.current.click(event) }}></i>
            <div className={`recorder text-center ${isRecording ? ' recording' : ''}`} ref={recorderBtn} onClick={micClick}>
                <i className="bi bi-mic" disabled={isRecording} ></i>
                <i className="bi bi-record-fill" disabled={!isRecording}></i>
            </div>
            
            <div className="input-group">
                <input type="text" className="form-control input" onKeyDown={onKeyPress} placeholder="Enter Message" aria-label="Recipient's username" aria-describedby="basic-addon2" ref={inputText} />
                <span className="input-group-text buttom" id="basic-addon2" onClick={sendMessage}><i className="bi bi-send"></i></span>
            </div>

            <input className="file-upload hidden" type="file" accept="image/*" ref={uploudButtonImg} onChange={handleChangeImg}></input>
            <input className="file-upload hidden" type="file" accept="video/*" ref={uploudButtonVideo} onChange={handleChangeVideo}></input>

        </>
    )
}

export default InputBar;