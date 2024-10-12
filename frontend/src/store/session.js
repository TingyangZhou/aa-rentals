//frontend/src/store/session.js
import { csrfFetch } from './csrf'

/** Action Type Constants: */
const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";


/**  Action Creators: */
const setUser = (user) => {
    return {
      type: SET_USER,
      payload: user
    };
  };

const removeUser = () => {
    return {
      type: REMOVE_USER
    };
  };


/** Thunk Action Creators: */
// Login
export const login = (user) => async(dispatch) => {
    const { credential, password } = user;
    const res = await csrfFetch(
        '/api/session',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                credential,
                password
            })
        }
    ); //end of csrfFetch
  
      const data = await res.json();
    dispatch(setUser(data.user));
    return res;
  
}


// Reducer

const sessionReducer = (state = {user: null}, action) => {
    switch (action.type) {
        case SET_USER: 
            return {...state, user: action.payload};
        case REMOVE_USER:
            return {...state, user: null};
        default: 
            return state;
    }
}

export default sessionReducer;