import { combineReducers } from 'redux'

const INITIAL_STATE = {
  current: [],
  possible: [
    'Lippis',
    'Mäkiauto',
  ],
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      const {
        current,
        possible,
      } = state;

      const addedProduct = possible.splice(action.payload, 1);

      current.push(addedProduct);

      const newState = { current, possible };
      return newState;
    default:
      return state;
  }
};

const ShopReducer = combineReducers({
  products: productReducer,
});
export default ShopReducer;
