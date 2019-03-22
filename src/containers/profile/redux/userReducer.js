import { SET_LOGIN_STATUS, ADD_CONTACT } from './userActions';

const INITIAL_STATE = {
  loggedIn: false,
  contact: []
};
  
  const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case SET_LOGIN_STATUS: {
        let { loggedIn, contact } = state;
        loggedIn = action.payload;
        console.log("LoggedIn: " + loggedIn)
        let newState = { loggedIn, contact };
        return newState;
      }
      case ADD_CONTACT: {
        let { loggedIn, contact } = state;
        contact = action.payload;
        let newState = { loggedIn, contact };
        return newState;
      }
      default:
        return state;
    }
  };
  
export default userReducer;