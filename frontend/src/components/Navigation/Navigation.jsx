// frontend/src/components/Navigation/Navigation.jsx

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav className='home-nav-bar'>
      <ul className='home'>
        <li >
          <NavLink to="/">Home</NavLink>
        </li>
      </ul>
      
      <ul className='session-links'>
        {isLoaded && <ProfileButton user={sessionUser} />}
      </ul>
    </nav>
      
  );
}

export default Navigation;