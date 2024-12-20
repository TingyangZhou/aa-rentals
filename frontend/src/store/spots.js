import { csrfFetch } from "./csrf";

/** Action Type Constants: */
const LOAD_SPOTS = "spots/LOAD_SPOTS";
const SHOW_SPOT = "spots/SHOW_SPOT";
const UPDATE_SPOT = 'spots/UPDATE_SPOT'
const ADD_IMAGE = 'images/ADD_IMAGE'
const SHOW_USER_SPOTS = 'spots/SHOW_USER_SPOTS'
const REMOVE_SPOT = 'spots/REMOVE_SPOT'



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

  const showUserSpots = (spot) =>{
    return {
      type:SHOW_USER_SPOTS,
      payload: spot
    }
  }

  
  const updateSpot = (spot) => {
    return {
      type: UPDATE_SPOT,
      payload: spot
    }
  }

  const addImage = (image) =>{
    return {
      type: ADD_IMAGE,
      payload: image
    }
  }


  const removeSpot = (spotId) =>{
    return {
      type:REMOVE_SPOT,
      payload:spotId
    }
  }
 


  /** Thunk Action Creators: */

  //fetch all the spots
  export const fetchSpots=() => async(dispatch) => {
    const res = await fetch('/api/spots',);
    const spots = await res.json();
    dispatch(loadSpots(spots.Spots)); //this should give an array

    return res;
  }

  //Fetch single spot
  export const fetchSingleSpot = (spotId) => async (dispatch) => {

        const res = await fetch(`/api/spots/${spotId}`);

        if (!res.ok) {
            const error = await res.json(); 
            throw error;
        }

        const spot = await res.json();
        dispatch(showSpot(spot));
        return res;
    
};


// create a new Spot
export const writeSpot = data => async dispatch => {
  try{
    // console.log('fetchingSpot!!!')
    const res = await csrfFetch(`/api/spots`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }); //end fetch
    const newSpot = await res.json(); 
    dispatch(updateSpot(newSpot)); 
    // console.log('newSpot:', newSpot);
    return newSpot;
    
  } catch(res){  
    const data = await res.json();
    const error = data.errors;
    // console.log('res error:', error)
    throw error; 
  }
  
  
};


// Edit a spot

export const editSpot = (data, spotId) => async dispatch => {
  try{
    // console.log('fetchingSpot!!!')
    const res = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }); //end fetch
    const updatedSpot = await res.json(); 
    dispatch(updateSpot(updatedSpot)); 
    // console.log('updatedSpot:', updatedSpot);
      
  } catch(res){  
    const error = await res.json();
    // console.log('res error:', error)
    throw error; 
  }
  
};


// Delete a spot
export const deleteSpot =(spotId) => async(dispatch) =>{

    const res = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'DELETE'
    });
    const data = res.json();
    dispatch(removeSpot(spotId));
    return data;

}




// create a spotImage
export const createSpotImage = (spotId, imageUrl) => async(dispatch) => {
  try{
    // console.log('fetchingImage!!!')
    const res = await csrfFetch(`/api/spots/${spotId}/images`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({url:imageUrl, preview:true})
    });
    const newImage = await res.json();
    dispatch(addImage(newImage));
    // console.log('newImage:', newImage);
    return newImage;
  }catch(res) {
    const error = await res.json();
    throw error;
  }
}

//fetch spots owned by current user

export const fetchUserSpots = () => async(dispatch) =>{
  const res = await fetch('/api/spots/current');
  const spots = await res.json();
  dispatch(showUserSpots(spots.Spots));

  return spots;  
}



  /** Reducers: */

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
        case(UPDATE_SPOT):{
          let spot = action.payload;
          return {...state, [spot.id]:spot}
        }
        case(SHOW_USER_SPOTS):{
          let spots = {...state};
          action.payload.forEach((spot) => spots[spot.id] = spot);
          return spots;

        }
        case(REMOVE_SPOT):{
          let newState = {...state};
          delete newState[action.payload];
          return newState;
        }
        
        default:
            return state;
    }
  }

  const imagesReducer = (state = {}, action) => {
    switch (action.type) {
      case(ADD_IMAGE):{
        let image = action.payload;
        return {...state, [image.id]:image};
      }
      
      default:
        return state;
}
}

  export {spotsReducer, imagesReducer};