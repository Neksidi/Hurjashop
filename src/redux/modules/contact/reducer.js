/**
*
* Reducers
*
* http://redux.js.org/docs/basics/Reducers.html
*
* Actions describe the fact that something happened, but don't specify
* how the application's state changes in response. This is the job of reducers.
*
* The reducer is a pure function that takes the previous state and an action, and returns the next state.
* '' (previousState, action) => newState ''
*
* Things you should never do inside a reducer:
*
*  - Mutate its arguments;
*  - Perform side effects like API calls and routing transitions;
*  - Call non-pure functions, e.g. Date.now() or Math.random().
*
*/
import {
  ADD_CONTACT,
  STORE_SHIPPING,
  STORE_METHODS,
  REMOVE_USER_DATA,
  IS_LOGGED,
} from './actions'; // from ./types

const initial_state = { isLogged: false, social: {facebook: {logged: false, profilePictureURL: null}, google: false,}, contact: [], shipping: null, methods: null,};

export default function reducer(state = initial_state, action) {
  switch (action.type) {
    case ADD_CONTACT:
      state.contact = action.contact;
      console.log(state.contact);
      return { ...state }
      break;
    case STORE_SHIPPING:
      state.shipping = action.shipping;
      console.log(state.shipping);
      return { ...state }
      break;
    case STORE_METHODS:
      state.methods = action.methods;
      console.log(state.methods);
      return { ...state }
      break;
    case REMOVE_USER_DATA:
      state.contact = [];
      return  { ...state }
      break;
    case IS_LOGGED:
      state.isLogged = action.logged;
      return { ...state }
      break;
    default:
      return {
        ...state,
        refreshing: true
      };
  }
}
