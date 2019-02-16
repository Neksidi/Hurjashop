import { combineReducers } from 'redux'
import animalReducer from '../../containers/tutorial/redux/tutorialReducer'
import productReducer from '../../containers/home/redux/homeReducer'

const allReducers = combineReducers({
  animals: animalReducer,
  products: productReducer,
  product: productReducer,
});

export default allReducers;
