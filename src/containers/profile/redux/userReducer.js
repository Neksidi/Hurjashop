import { SET_LOGIN_STATUS, ADD_CONTACT, ADD_SHIPPING, ADD_METHODS } from './userActions';

const INITIAL_STATE = {
  loggedIn: false,
  contact: [],
  shipping: [],
  methods: [],  //Payment & Shipping methods
};
  
  const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case SET_LOGIN_STATUS: {
        state.loggedIn = action.payload;
        return {...state};
      }
      case ADD_CONTACT: {
        state.contact = action.payload;
        return {...state};
      }
      case ADD_SHIPPING: {
        state.shipping = action.payload;
        return {...state};
      }
      case ADD_METHODS: {
        state.methods = action.payload;
        return {...state};
      }
      default:
        return state;
    }
  };
  
export default userReducer;