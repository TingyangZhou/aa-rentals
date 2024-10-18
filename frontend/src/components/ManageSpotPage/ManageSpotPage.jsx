import { useEffect, useState } from 'react';
import * as spotsActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import './ManageSpotPage.css'

import SpotIndexItem from './SpotIndexItem.jsx'

function ManageSpotPage(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const spots = useSelector(state => state.spots)
    const spotsArr = Object.values(spots);
    const sessionUser = useSelector(state => state.session.user)
    // console.log('sessionUser:', sessionUser);

    const spotsByCurrentUser = spotsArr.filter(spot => spot.ownerId === sessionUser.id)

    useEffect(() => {
      dispatch(spotsActions.fetchUserSpots());
      }, [dispatch]);

      // console.log('spotsByCurrentUser:', spotsByCurrentUser);
      
    const hasSpot = (spotsByCurrentUser.length !== 0);
      
     
    return (
      <>
        <h1 className='manage-spots-title'>Manage Spots</h1>
        {!hasSpot ? 
          <button 
            className='create-spot'
            onClick={() => navigate('/spots/new')}
          >
            Create a New Spot
          </button> :
          <div>
            <ul className='spotList'>
              {spotsByCurrentUser?.map(spot => (
                <SpotIndexItem
                  spot={spot}
                  key={spot.id}
                />
              ))}
            </ul>
          </div>
        }
      </>
    )
    
}

export default ManageSpotPage;