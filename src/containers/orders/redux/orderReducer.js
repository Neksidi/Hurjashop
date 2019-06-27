import { ADD_ORDER, SET_ORDERS, DELETE_ORDER } from './orderActions';

const INITIAL_STATE = {
    all: [],          //All orders 
    new: [],         //Newly created order
    order: [],
};
  
  const orderReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case ADD_ORDER: {
        state.order = action.payload;
        console.log("wtf")
        return {...state};
      }
      case SET_ORDERS: {
        state.all = action.payload;
        console.log("why you?")
        console.log(state.all)
        return {...state};
      }
      case DELETE_ORDER: {
        state.order = []
        console.log("INSIDE DELETE_ORDER")
        return {...state};
      }
      default:
        return state;
    }
  };
  
export default orderReducer;