// frontend/src/components/Navigation/Navigation.jsx

import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import airbnbLogo from '../../../public/images/airbnbLogo.jpg'

function Navigation({ isLoaded }) {

  const navigate = useNavigate();
  const sessionUser = useSelector(state => state.session.user);
  // console.log('sessionUser:', sessionUser)

  const buttonClassName = "create-spot-button" + (sessionUser===null ? " hidden" : "");
  
  return (
    <nav className='home-nav-bar'>
      <ul className='home'>
        <li >
          <NavLink to="/">
            <img
              src={airbnbLogo}
              alt='Airbnb Logo'
              className='airbnb-logo'
            />
          </NavLink>
        </li>
      </ul>

      <div className='button-session-links-wrapper'>
        <button 
          className={buttonClassName}
          onClick={() => navigate('/spots/new')}>
          Create a New Spot
        </button>
        
        <ul className='session-links'>
          {isLoaded && <ProfileButton user={sessionUser} />}
        </ul>
      </div>
      

    </nav>
      
  );
}

export default Navigation;