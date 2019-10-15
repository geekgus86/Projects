import { SET_USER_SESSION, SET_ERROR, CLEAR_SESSION, SET_USERS, SET_USER, SET_SCHEMA, SET_ARR_ASSETS } from "./types";

const initialState = {
  list: null,
  edit: null,
  session: null,
  error: null,
  schema: {},
  arrAssets: []
};

export function getUserSession(state) {
  return state.user.session
}

export function userReducer(state = initialState, action) {
  switch (action.type) {  
    case SET_USER_SESSION:
      return { ...state, session: action.payload, error: null }
    case SET_ERROR:
      return { ...state, error: action.payload }
    case CLEAR_SESSION:
      return { ...state, error: null, session: null }
    case SET_USERS:
      return { ...state, error: null, list: action.payload }
    case SET_USER:
      return { ...state, error: null, edit: action.payload }
    case SET_SCHEMA: {
      return { ...state, error: null, schema: action.payload }
    }
    case SET_ARR_ASSETS: {
      return { ...state, error: null, arrAssets: action.payload }
    }
    default:
      return state;
  }
}
