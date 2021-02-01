import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import {Link, withRouter} from 'react-router-dom';

import { API } from '../api-service';
import {RegisterUser} from '../components/user_register';

function Auth(){

    document.title = 'Login';

    const [username, setUsername] = useState('');
    
    const [password, setPassword] = useState('');

    const isDisabled = username.length===0||password.length===0;

    const [token, setToken] = useCookies(['token']);

    const [userID, setUserID] = useCookies(['id']);

    const loginClicked = () => {
        API.loginUser({username, password})
        .then(resp => setToken('token', resp.token))
        .catch(error => console.log(error))

        API.loginUser({username, password})
        .then(resp => setUserID('id', resp.id))
        .catch(error => console.log(error))
    }

    useEffect( () => {
        if (token['token']==='undefined'){
            alert('Wrong username or password.')
            setToken('token', '')
            setUsername('')
            setPassword('')
        }
        else{
            if(token['token']) window.location.href = '/tasks';
        }
    }, [token])

    return (
        <div className='login-body'>
            <div className='container-fluid'>
                <div className='row justify-content-center'>
                    <div className='col-12 col-sm-6 col-md-3'>
                    <form className='form-container'>
                        <h4 className='text-center fw-bold fst-italic'>Login</h4>
                        <div class="form-group">
                            <input type="email" class="form-control" id="username" aria-describedby="emailHelp" placeholder='Enter username'
                            value={username} onChange={evnt => setUsername(evnt.target.value)}/>
                        </div>
                        
                        <div class="form-group">
                            <input type="password" class="form-control" id="password" placeholder='Enter password' 
                            value={password} onChange={evnt => setPassword(evnt.target.value)}/>
                        </div>
  
                        <button disabled={isDisabled} type="submit" class="btn btn-primary btn-block" onClick={loginClicked}>Submit</button>

                        <p className='p-login-register'>Don't have an account? Register <Link to="/register-user">here</Link>.</p>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {Auth};