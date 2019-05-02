import { SET_PRODUCTS, SET_PRODUCT, SET_CATEGORY_PRODUCTS, SET_VARIATIONS } from './productActions';

const INITIAL_STATE = {
    all: [],
    single: [],
    categoryProducts: [],
    variations: [],
};
  
  const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case SET_PRODUCT: {
        state.single = action.payload;
        return {...state};
      }
      case SET_PRODUCTS: {
        state.all = action.payload;
        return {...state};
      }

      case SET_CATEGORY_PRODUCTS: {
        state.categoryProducts = action.payload;
        return {...state};
      }

      case SET_VARIATIONS: {
        state.variations = action.payload;
        return {...state};
      }

      default:
        return state;
    }
  };
  
export default productReducer;