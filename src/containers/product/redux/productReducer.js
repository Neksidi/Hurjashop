import { SET_PRODUCTS, SET_PRODUCT } from './productActions';

const INITIAL_STATE = {
    all: [],
    single: []
};
  
  const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case SET_PRODUCT: {
        let { single } = state;
        all = action.payload;
        let newState = { single };
        return newState;
      }
      case SET_PRODUCTS: {
        let { all } = state;
        all = action.payload;
        let newState = { all };
        return newState;
      }
      default:
        return state;
    }
  };
  
export default productReducer;