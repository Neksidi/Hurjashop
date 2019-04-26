import { SET_PRODUCTS, SET_PRODUCT, SET_CATEGORY_PRODUCTS } from './productActions';

const INITIAL_STATE = {
    all: [],
    single: [],
    categoryProducts: [],
};
  
  const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case SET_PRODUCT: {
        let { all, single, categoryProducts } = state;
        single = action.payload;
        let newState = { all, single, categoryProducts };
        return newState;
      }
      case SET_PRODUCTS: {
        let { all, single, categoryProducts } = state;
        all = action.payload;
        let newState = { all, single, categoryProducts };
        return newState;
      }

      case SET_CATEGORY_PRODUCTS: {
        let { all, single, categoryProducts } = state;
        categoryProducts = action.payload;
        let newState = { all, single, categoryProducts };
        return newState;
      }


      default:
        return state;
    }
  };
  
export default productReducer;