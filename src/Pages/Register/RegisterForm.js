import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../Contexts/UserContextProvider';
import { thisServer } from '../../Utils/Globals';
import './RegisterForm.css';

function RegisterForm(props) {
    const { userEntered } = useUserContext()

    const usernameInput = useRef();
    const passwordInput = useRef();
    const confirmPasswordInput = useRef();
    const nicknameInput = useRef();
    const uploudButton = useRef();
    const avaterInput = useRef();

    const [errorText, setErrorText] = useState('')
    const [file, setFile] = useState("/resources/emptyAvatar.jpg");

    const navigate = useNavigate();

    const register = async (event) => {
        event.preventDefault();

        let username = usernameInput.current.value
        let password = passwordInput.current.value
        let confirmPassword = confirmPasswordInput.current.value
        let nickname = nicknameInput.current.value


        if (password !== confirmPassword) {
            setErrorText("Passwords are not the same")
            return;
        }

        if (file === "/resources/emptyAvatar.jpg") {
            setErrorText("pls upload an image")
            return;
        }

        // TODO: do it async from db
        try {
            const response = await axios.post(
                `https://${thisServer}/api/register`,
                { username, password },
                { withCredentials: true }
            )

            await userEntered(username)
            navigate("/Chat")
        }
        catch (e) {
            setErrorText(e.response.data.message)
        }
    }

    function UploudImage(event) {
        uploudButton.current.click(event);
    }

    function handleChange(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <>
            <div className="container-lg register-container c-shadow" >
                <div className='logo-right'>
                    <img src='/resources/Logo.png' alt='logo' />
                    <h1>WhenApp</h1>
                </div>

                <div>
                    <form onSubmit={register} className=''>
                        <input type="text" className="form-control" placeholder="User Name" required ref={usernameInput} pattern="^[a-zA-Z0-9]*$"
                            title="Must contain only numbers and letters" />
                        <input type="text" className="form-control" placeholder="Nickname" required ref={nicknameInput} pattern="^[a-zA-Z0-9]*$"
                            title="Must contain only numbers and letters" />
                        <input type="password" className="form-control" placeholder="Password" required ref={passwordInput} pattern="^(?!.* )(?=.*\d)(?=.*[A-Z]).{8,}$"
                            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" />
                        <input type="password" className="form-control" placeholder="Confirm Password" required ref={confirmPasswordInput} />

                        <div className="avatar" ref={avaterInput} onClick={UploudImage}>
                            <img src={file} className="rounded-3 img-fluid"
                                alt="Avatar" />
                        </div>
                        <input className="file-upload hidden" type="file" accept="image/*" ref={uploudButton} onChange={handleChange}></input>
                        <button type="submit" className="btn btn-primary btn-lg rounded-pill c-shadow">Register</button>
                        <p className='error'>{errorText}</p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RegisterForm;
