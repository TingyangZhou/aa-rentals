import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          
          if (data?.errors) {
            setErrors(data.errors);
          }
          
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <>
      
      <form class='signupForm' onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      
      
      <label>
          First Name
          <input
            className='signupInput'
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
   
          />
        </label>
        {errors.firstName && <p className='hint'>{errors.firstName}</p>}
        <label>
          Last Name
          <input
            className='signupInput'
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
       
          />
        </label>
        {errors.lastName && <p className='hint'>{errors.lastName}</p>}
        <br></br>
        


        <label>
          Email
          <input
            className='signupInput'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
       
          />
        </label>
        {errors.email && <p className='hint'>{errors.email}</p>}
        <label>
          Username
          <input
            className='signupInput'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
      
          />
        </label>
        {errors.username && <p className='hint'>{errors.username}</p>}
        <br></br>
        

       
        <label>
          Password
          <input
            className='signupInput'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
      
          />
        </label>
        {errors.password && <p className='hint'>{errors.password}</p>}

        <label>
          Confirm Password
          <input
             className='signupInput'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
    
          />
        </label>
        {errors.confirmPassword && <p className='hint'>{errors.confirmPassword}</p>}

        <br></br>
        <button className='signupSubmitButton' type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;