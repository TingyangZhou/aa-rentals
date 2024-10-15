//frontend/src/components/LandingPage/LandingPage.jsx

import { useState, useEffect } from 'react';
import * as spotsActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import SpotIndexItem from './SpotIndexItem';
import './LandingPage.css'


function LandingPage () {

    const allSpots = useSelector(state => state.spots);
    console.log('\nallSpots:', allSpots)
    const allSpotsArr = Object.values(allSpots);
    
    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(spotsActions.fetchSpots());
    },[dispatch]);

    return (
        <div>
            <ul className='spotList'>
                {allSpotsArr.map(spot => (
                    <SpotIndexItem
                        spot={spot}
                        key={spot.id}
                    />
                ))}
            </ul>

        </div>
    )

   

}

export default LandingPage;