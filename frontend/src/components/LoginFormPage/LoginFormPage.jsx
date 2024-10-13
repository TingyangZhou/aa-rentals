// frontend/src/components/LoginFormPage/LoginFormPage.jsx

import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    let errorObj = {};
    if (!credential.trim()) {
        errorObj.credential = 'Username or email cannot be empty';
    }
    
    if (!password.trimEnd()) {
        errorObj.password = 'Password cannot be empty';
    }

    setErrors(errorObj);
    if(Object.keys(errorObj).length !==0 ) {
        setErrors(errorObj);
        return;
    }
    
    
    return dispatch(sessionActions.login({ credential, password })).catch(
        async (res) => {
          const data = await res.json();
          if (data?.errors) setErrors(data.errors);
        }
      );
  };


  return (
    <>

    
      <form className='loginForm' onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <div className='credential'>
            <label>
            Username or Email
            <br></br>
            <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}

            />
            </label>
            {errors.credential && <p style={{ color: 'red', fontStyle: 'italic' }}>{errors.credential}</p>}
        </div>

        <div className='password'>
            <label>
            Password
            <br></br>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}

            />
            </label>
            {errors.password && <p style={{ color: 'red', fontStyle: 'italic' }}>{errors.password}</p>}
            {errors && <p>{errors.message}</p>}
        </div>
        
        <button type="submit">Log In</button>
      </form>
    </>
  );
}

export default LoginFormPage;