// frontend/src/components/Navigation/Navigation.jsx

import { NavLink, Link, useNavigate } from 'react-router-dom';
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
       
      <NavLink to="/">
        <img data-testid='logo'
          src={airbnbLogo}
          alt='Airbnb Logo'
          className='airbnb-logo'
        />
      </NavLink>  

      <div className='button-session-links-wrapper'>
        <Link to='/spots/new'>
            <button 
            data-testid='create-new-spot-button'
            className={buttonClassName}>
            Create a New Spot
          </button>
        </Link>
        
        
        <ul className='session-links'>
          {isLoaded && <ProfileButton user={sessionUser} />}
        </ul>
      </div>
      

    </nav>
      
  );
}

export default Navigation;