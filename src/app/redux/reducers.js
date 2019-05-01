import { combineReducers } from 'redux';
import homeReducer from '../../containers/home/redux/homeReducer';
import cartReducer from '../../containers/cart/redux/cartReducer';
import productReducer from '../../containers/product/redux/productReducer';
import categoryReducer from '../../containers/category/redux/categoryReducer';
import userReducer from '../../containers/profile/redux/userReducer';
import orderReducer from '../../containers/orders/redux/orderReducer';
import paymentReducer from '../../containers/payment/redux/paymentReducer';

const allReducers = combineReducers({
  home: homeReducer,
  cart: cartReducer,
  products: productReducer,
  categories: categoryReducer,
  user: userReducer,
  orders: orderReducer,
  payment: paymentReducer
});

export default allReducers;
