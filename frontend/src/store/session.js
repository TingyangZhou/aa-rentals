// frontend/src/store/session.js

import { csrfFetch } from './csrf';

/** Action Type Constants: */

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
// const RESTORE_USER = 'session/restoreUser';


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

//login thunk
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password
    })
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};


//restore user thunk
export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

// Signup thunk

export const signup = (user) => async (dispatch) => {

  const { username, firstName, lastName, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      firstName,
      lastName,
      email,
      password
    })
  });

  
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};


// Logout thunk

export const logout = ()=> async(dispatch) => {
  const res = await csrfFetch('/api/session', 
    {method: 'DELETE'});

  dispatch(removeUser());
  return res;
}


/** Reducer */
const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;