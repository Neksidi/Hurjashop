import { combineReducers } from 'redux'
import animalReducer from '../../containers/tutorial/redux/tutorialReducer'
import homeReducer from '../../containers/home/redux/homeReducer'
import productReducer from '../../containers/product/redux/productReducer'
import userReducer from '../../containers/profile/redux/userReducer';

const allReducers = combineReducers({
  animals: animalReducer,
  home: homeReducer,
  products: productReducer,
  user: userReducer,
});

export default allReducers;
