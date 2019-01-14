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
    STORE_SECURE,
  } from './actions'; // from ./types
  
  const initial_state = {secure : null };
  
  export default function reducer(state = initial_state, action) {
    switch (action.type) {
      case STORE_SECURE:
        state.secure = action.secure;
        console.log("Secure")
        console.log(state.secure);
        return { ...state }
        break;
      default:
        return {
          ...state,
          refreshing: true
        };
    }
  }
  