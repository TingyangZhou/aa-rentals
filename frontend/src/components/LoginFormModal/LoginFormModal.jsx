// frontend/src/components/LoginFormModal/LoginFormModal.jsx

import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
 
  
  const handleCredentialChange = (e) => {
    const newCredential = e.target.value;
    setCredential(newCredential)
    if (newCredential.length < 4) {
      setErrors({ credential: 'Username must be at least 4 characters' });
    } else{
      setErrors({ credential: '' });
    }
  }

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword )
    if (newPassword.length < 6){
      setErrors({ password: 'Password must be at least 6 characters '})
    }else {
      setErrors({ password: ''});
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
        else if(data?.message){
          setErrors({message: "The provided credentials were invalid"});
        }
      });
  };

  const handleDemoLogin = () => {
    const user = {
      credential:'Demo-lition',
      password:'password'
    };
    return dispatch(sessionActions.login(user)).then(closeModal)
  }


  return (
    <>
   
    <form className='loginForm' onSubmit={handleSubmit}>
      <h1>Log In</h1>

      <div className='credential'>
      {errors && <p className='hint'>{errors.message}</p>}
          <label>
          Username or Email
          <input
              className='loginInput'
              type="text"
              value={credential}
              onChange={handleCredentialChange}
          />
          </label>
          {errors.credential && <p className='hint'>{errors.credential}</p>}
      </div>

      <div className='password'>
          <label>
          Password
          <input
              className='loginInput'
              type="password"
              value={password}
              onChange={handlePasswordChange}

          />
          </label>
          {errors.password && <p className='hint'>{errors.password}</p>}
          
      </div>
      
      <button 
      className='loginSubmitButton' 
      type="submit"
      disabled={credential.length < 4 || password.length < 6}
      >Log In</button>

      <label onClick={handleDemoLogin}
        className='demo-login' 
      >Log in as Demo User</label>


    </form>
  </>
  );
}

export default LoginFormModal;