import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../Contexts/UserContextProvider';
import { findPerson } from '../../db/users.js';
import { server } from '../../Utils/Globals';
import './LoginForm.css';

function LoginForm(props) {
    const usernameInput = useRef();
    const passwordInput = useRef();
    const [errorText, setErrorText] = useState('');

    const navigate = useNavigate();
    const userContext = useUserContext()

    const login = async (event) => {
        event.preventDefault();

        let username = usernameInput.current.value;
        let password = passwordInput.current.value;

        // TODO: do it async from db
        const response = await axios.post(
            `${server}/api/login`,
            { username, password },
            { withCredentials: true }
        )

        if (response.status !== 200) {
            // show error
            setErrorText("Username and Password combination is incorrect")
            //errorText.current.style.visibility = "visible";
            return;
        }

        await userContext.userEntered(username)
        navigate("/Chat")
    }

    // TODO: add icons near input

    return (
        <>
            <div className="container-lg login-container c-shadow" >
                <div className='logo-center'>
                    <img src='/resources/Logo.png' alt='logo' />
                    <h1>WhenApp</h1>
                </div>

                <div>
                    <form onSubmit={login} className=''>
                        <div className="form-floating">
                            <input type="text" className="form-control rounded-pill c-shadow" id="inputUsername" placeholder=" " ref={usernameInput} required />
                            <label htmlFor="inputUsername">User Name</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control rounded-pill c-shadow " id="inputPassword" placeholder=" " ref={passwordInput} required />
                            <label htmlFor="inputPassword">Password</label>
                        </div>
                        <p ref={errorText} className='error'>{errorText}</p>
                        <button type="submit" className="btn btn-primary btn-lg rounded-pill c-shadow">LOGIN</button>
                    </form>
                    <p>To Register Press <Link to="register" className='link-light'>Here</Link></p>
                </div>
            </div>
        </>
    )
}

export default LoginForm;