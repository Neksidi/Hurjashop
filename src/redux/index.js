import { combineReducers } from 'redux'
// Navigator
//import MainNavigator from '../navigation/navigators'
// Reducers
import cart_reducer from './modules/cart/reducer'
import products_reducer from './modules/products/reducer'
import contact_reducer from './modules/contact/reducer'
import paydata_reducer from './modules/pay/reducer'
import order_reducer from './modules/order/reducer'
import secure_reducer from './modules/secure/reducer'

import createSensitiveStorage from "redux-persist-sensitive-storage";
import { persistReducer } from 'redux-persist'


// Environment variable
/*const initial_nav_state = MainNavigator.router.getStateForAction(
  MainNavigator.router.getActionForPathAndParams('DrawerNavigator')
);*/

/*function nav(state = initial_nav_state, action) {
  var nextState;
  switch (action.type) {
    default:
      //nextState = MainNavigator.router.getStateForAction(action, state);
      break;
  }
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}*/


const sensitiveStorage = createSensitiveStorage({
  keychainService: "myKeychain",
  sharedPreferencesName: "mySharedPrefs",
  encrypt: false
});

const tokenPersistConfig = {
  key: 'token',
  storage: sensitiveStorage
};




const AppReducer = combineReducers({

  // 'System'
  //nav,

  // Custom 'Models'
  cart_reducer,
  products_reducer,
  contact_reducer,
  paydata_reducer,
  order_reducer,
  token: persistReducer(tokenPersistConfig, secure_reducer),

});
export default AppReducer;
