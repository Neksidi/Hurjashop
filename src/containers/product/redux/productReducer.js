import { READ_PRODUCTS, SET_PRODUCTS, SET_PRODUCT } from './productActions';

const INITIAL_STATE = {
    all: [],
    products: []
};
  
  const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case SET_PRODUCT: {
        let { all } = state;
        all = action.payload;
        let newState = { all };
        return newState;
      }
      case SET_PRODUCTS: {
        let { all } = state;
        all = action.payload;
        let newState = { all };
        return newState;
      }
      case READ_PRODUCTS: {
        state.products = action.products;
        return { ...state };
      }
      default:
        return state;
    }
  };
  
export default productReducer;