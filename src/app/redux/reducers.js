import { combineReducers } from 'redux'
import animalReducer from '../../containers/tutorial/redux/tutorialReducer'
import homeReducer from '../../containers/home/redux/homeReducer'
import productReducer from '../../containers/product/redux/productReducer'
import categoryReducer from '../../containers/category/redux/categoryReducer'
import userReducer from '../../containers/profile/redux/userReducer';

const allReducers = combineReducers({
  animals: animalReducer,
  home: homeReducer,
  products: productReducer,
  categories: categoryReducer,
  user: userReducer,
});

export default allReducers;
