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
        <div className='login-body'>
            <div className='container-fluid'>
                <div className='row justify-content-center'>
                    <div className='col-12 col-sm-6 col-md-3'>
                    <form className='form-container'>
                        
                        <h4 className='text-center fw-bold fst-italic'>Register</h4>
                        
                        <div class="form-group">
                            <input id='UserName' type='text' className="form-control" placeholder='Enter Username' value={username} 
                            onChange={evnt => setUsername(evnt.target.value)}/>
                        </div>
                        
                        <div class="form-group">
                            <input type="password" class="form-control" id="password" placeholder='Enter password' 
                            value={password} onChange={evnt => setPassword(evnt.target.value)}/>
                        </div>

                        <div class="form-group">
                            <input type="password" class="form-control" id="password_reEnter" placeholder='Re-enter Password' 
                            value={password} onChange={evnt => setPassword(evnt.target.value)}/>
                        </div>
  
                        <button disabled={isDisabled} type="submit" class="btn btn-primary btn-block" onClick={registerClicked}>Register</button>

                        <p className='p-login-register'>Already have an account? Login <Link to="/">here</Link>.</p> 
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {RegisterUser};