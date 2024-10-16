/** Action Type Constants: */
const LOAD_SPOTS = "spots/LOAD_SPOTS";
const SHOW_SPOT ="spots/SHOW_SPOT";



/**  Action Creators: */
const loadSpots = (spots) => {
    return {
      type: LOAD_SPOTS,
      payload: spots
    };
  };

  const showSpot = (spot) => {
    return {
      type: SHOW_SPOT,
      payload: spot
    }
  }


  /** Thunk Action Creators: */

  //fetch all the spots
  export const fetchSpots=() => async(dispatch) => {
    const res = await fetch('/api/spots');
    const spots = await res.json();
    dispatch(loadSpots(spots.Spots)); //this should give an array

    return res;
  }

  //Fetch single spot
  export const fetchSingleSpot = (spotId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/spots/${spotId}`);

        if (!res.ok) {
            const error = await res.json(); 
            throw error;
        }

        const spot = await res.json();
        dispatch(showSpot(spot));
        return res;
    } catch (error) {
        console.log('\nfetchError:', error)
        throw error; // rethrow the error to handle it later
    }
};



  /** Reducer: */

  const spotsReducer = (state = {}, action) => {
    switch (action.type) {
        case(LOAD_SPOTS): {
          let spots = {...state};
          action.payload.forEach((spot) => spots[spot.id] = spot);
          return spots;
            
        }
        case(SHOW_SPOT):{
          let spot = action.payload;
          return {...state, [spot.id]:spot}
        }
        default:
            return state;
    }
  }

  export default spotsReducer;