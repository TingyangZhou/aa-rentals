// frontend/src/components/Navigation/ProfileButton.jsx

import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { IoMdMenu } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate();


  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef?.current?.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const manageSpots = ()=> {
    navigate('/spots/current')
  }

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    setShowMenu(false);
    navigate('/')

  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (

    <div className='dropdown-menu'>
      <button data-testid="user-menu-button" className='profile-button' onClick={toggleMenu}>
        <IoMdMenu/><FaUserCircle />
      </button>
      <ul data-testid='user-dropdown-menu' className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li className='user-info-list'>{`Hello, ${user.firstName}`}</li>
            <li className='user-info-list'>{user.email}</li>
            <li >
              <button
                data-testid='manage-spots-link'
                className='manage-spots-button' 
                onClick={manageSpots}>Manage Spots</button>
            </li>
            <li >
              <button onClick={logout}>Log Out</button>
            </li>
          </>
        ) : (
       
          <>
            <li>
              <OpenModalButton
                buttonText="Sign Up"
                modalComponent={<SignupFormModal />}
              />
            </li>

            <li>
              <OpenModalButton
                buttonText="Log In"
                modalComponent={<LoginFormModal />}
              />
            </li>
            
          </>
         
        )}
      </ul>
    </div>
      
   
  );
}

export default ProfileButton