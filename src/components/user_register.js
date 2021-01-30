import React, {useState} from 'react';
import {API} from '../api-service';
import {Link} from 'react-router-dom';
import {auth} from '../components/auth';

function RegisterUser(){

    document.title = 'Register User';

    const [username, setUsername] = useState('');
    
    const [password, setPassword] = useState('');

    const [passwordReEnter, setPasswordReEnter] = useState('');

    const isDisabled = username.length===0||password.length===0 || passwordReEnter.length===0;

    const passwordCheck = () =>{
        return (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password))
    }

    const passwordReEnterCheck = () =>{
        return (password.length===passwordReEnter.length)
    }

    const registerClicked = () => {
        API.registerUser({username, password})
        .catch(error => console.log(error))
        alert('New user registered. Now, login with the same credentials.')
        window.location.href = '/'
    }

    return (
        <div className='App'>
            <header className='App-header'>
                <h1>Register</h1>
                <div class="mb-3">
                    <input id='UserName' type='text' className="form-control" placeholder='Enter Username' value={username} 
                        onChange={evnt => setUsername(evnt.target.value)}/>
                </div>
                <div class="mb-3">
                    <input id='password' type='password' className="form-control" placeholder='Enter Password' value={password} 
                        onChange={evnt => setPassword(evnt.target.value)}/>
                </div>

                <div class="mb-3">
                    <input id='password_reEnter' type='password' className="form-control" placeholder='Re-enter Password' value={passwordReEnter} 
                        onChange={evnt => setPasswordReEnter(evnt.target.value)}/>
                </div>

                <button disabled={isDisabled} className='btn btn-outline-primary Login-items' 
                onClick={registerClicked}>Create Account</button>

                <p className='p-login-register'>Already have an account? Login <Link to="/">here</Link>.</p> 
            </header>
        </div>
    )
}

export {RegisterUser};