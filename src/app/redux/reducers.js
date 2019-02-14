import { combineReducers } from 'redux'
import animalReducer from '../../containers/tutorial/redux/tutorialReducer'
import productReducer from '../../containers/home/redux/productReducer'

const allReducers = combineReducers({
  animals: animalReducer,
  products: productReducer,
});

export default allReducers;
