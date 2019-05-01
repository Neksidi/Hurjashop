import { ADD_PAYMENT } from './paymentActions';

const INITIAL_STATE = {
    payment: [],
};
  
  const paymentReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case ADD_PAYMENT: {
        console.log("Payment reducer")
        console.log(action.payload);
        state.payment = action.payload;
        return {...state};
      }
      default:
        return state;
    }
  };
  
export default paymentReducer;