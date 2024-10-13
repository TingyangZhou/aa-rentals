// frontend/src/components/Navigation/Navigation.jsx

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css'
import { useEffect } from 'react';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  


  const sessionLinks = sessionUser ? (
    <li>
      <ProfileButton user={sessionUser} />
    </li>
  ) : (
    <>
      <li>
        <NavLink to="/login">Log In</NavLink>
      </li>
      <li>
        <NavLink to="/signup">Sign Up</NavLink>
      </li>
    </>
  );

  return (
    <nav className='navigation'>
        <ul>
        <li>
            <NavLink to="/">Home</NavLink>
        </li>
        {isLoaded && (
            <div className="session-links">
                {sessionLinks}
            </div>)}
        </ul>
    </nav>
    
  );
}

export default Navigation;