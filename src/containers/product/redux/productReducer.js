import { SET_PRODUCTS, SET_PRODUCT } from './productActions';

const INITIAL_STATE = {
    all: [],
    single: []
};
  
  const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case SET_PRODUCT: {
        let { all, single } = state;
        single = action.payload;
        let newState = { all, single };
        return newState;
      }
      case SET_PRODUCTS: {
        let { all, single } = state;
        all = action.payload;
        let newState = { all, single };
        return newState;
      }
      default:
        return state;
    }
  };
  
export default productReducer;