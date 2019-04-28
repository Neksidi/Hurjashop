import { ADD_ORDER, SET_ORDERS } from './orderActions';

const INITIAL_STATE = {
    all: [],          //All orders 
    new: []         //Newly created order
};
  
  const orderReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case ADD_ORDER: {
        state.new = action.payload;
        return {...state};
      }
      case SET_ORDERS: {
        state.all = action.payload;
        return {...state};
      }
      default:
        return state;
    }
  };
  
export default orderReducer;