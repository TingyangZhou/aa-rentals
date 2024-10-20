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


  // Real-time validation for input changes
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    if (e.target.value.length === 0) {
      setErrors((prevErrors) => ({ ...prevErrors, firstName: "First Name is required" }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, firstName: "" }));
    }
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    if (e.target.value.length === 0) {
      setErrors((prevErrors) => ({ ...prevErrors, lastName: "Last Name is required" }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, lastName: "" }));
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value.length === 0) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "Email is required" }));
    } if (!(e.target.value).includes('@')) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "Invalid email" }));
    }
    else {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (e.target.value.length < 4) {
      setErrors((prevErrors) => ({ ...prevErrors, username: "Username must be at least 4 characters" }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, username: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 6) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "Password must be at least 6 characters" }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "Passwords do not match" }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
    }
  };

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
          password,
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
      confirmPassword: "Confirm Password field must be the same as the Password field",
    });
  };

  return (
    <>
      <form data-testid='sign-up-form' className="signupForm" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>

        <label>
          First Name
          <input
            data-testid='first-name-input'
            className="signupInput"
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
            required
          />
        </label>
        {errors.firstName && <p className="hint">{errors.firstName}</p>}

        <label>
          Last Name
          <input
            data-testid='last-name-input'
            className="signupInput"
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
            required
          />
        </label>
        {errors.lastName && <p className="hint">{errors.lastName}</p>}

        <label>
          Email
          <input
            data-testid='email-input'
            className="signupInput"
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </label>
        {errors.email && <p data-testid='email-error-message' className="hint">{errors.email}</p>}

        <label>
          Username
          <input
            data-testid='username-input'
            className="signupInput"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </label>
        {errors.username && <p data-testid='username-error-message' className="hint">{errors.username}</p>}

        <label>
          Password
          <input
            data-testid='password-input'
            className="signupInput"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </label>
        {errors.password && <p className="hint">{errors.password}</p>}

        <label>
          Confirm Password
          <input
            data-testid='confirm-password-input'
            className="signupInput"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </label>
        {errors.confirmPassword && <p className="hint">{errors.confirmPassword}</p>}

        <button
          data-testid='form-sign-up-button'
          className="signupSubmitButton"
          type="submit"
          disabled={
            firstName.length === 0 ||
            lastName.length === 0 ||
            email.length === 0 ||
            username.length < 4 ||
            password.length < 6
          }
        >
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupFormModal;
