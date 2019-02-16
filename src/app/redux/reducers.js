import { combineReducers } from 'redux'
import animalReducer from '../../containers/tutorial/redux/tutorialReducer'
import homeReducer from '../../containers/home/redux/homeReducer'
import productReducer from '../../containers/product/redux/productReducer'

const allReducers = combineReducers({
  animals: animalReducer,
  home: homeReducer,
  products: productReducer
});

export default allReducers;
