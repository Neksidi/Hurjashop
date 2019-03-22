import { SET_NEWPRODUCTS, SET_SALEPRODUCTS } from './homeActions';

const INITIAL_STATE = {
  newp: [],
  salep: [],
};

const homeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_NEWPRODUCTS: {
      let { newp, salep } = state;
      newp = action.payload;
      let newState = { newp, salep };
      return newState;
    }
    case SET_SALEPRODUCTS: {
      let { newp, salep } = state;
      sale = action.payload;
      let newState = { newp, salep };
      return newState;
    }
    default:
      return state;
  }
};

export default homeReducer;


