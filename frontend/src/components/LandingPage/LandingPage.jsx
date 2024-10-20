//frontend/src/components/LandingPage/LandingPage.jsx

import { useEffect } from 'react';
import * as spotsActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import SpotIndexItem from './SpotIndexItem';
import './LandingPage.css'


function LandingPage () {

    const allSpots = useSelector(state => state.spots);
    const allSpotsArr = Object.values(allSpots).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    
    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(spotsActions.fetchSpots());
    },[dispatch]);

    return (
        <div className='page-container'>
            <ul data-testid='spots-list' className='spotList'>
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