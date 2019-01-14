/**
*
* Reducers
*
* http://redux.js.org/docs/basics/Reducers.html
*
* Actions describe the fact that something happened, but don't specify
* how the application's state changes in response. This is the job of reducers.
*
* The reducer is a pure function that takes the previous state and an action, and returns the next state.
* '' (previousState, action) => newState ''
*
* Things you should never do inside a reducer:
*
*  - Mutate its arguments;
*  - Perform side effects like API calls and routing transitions;
*  - Call non-pure functions, e.g. Date.now() or Math.random().
*
*/
import {
  FAIL,
  READ,
  ADD_TO_CART,
  ADD_TO_CART_WITH_VARIATION,
  REMOVE_FROM_CART,
  EMPTY_CART,
  NEW_ORDER,
  INCREASE_QUANTITY,
  INCREASE_QUANTITY_WITH_VARIATIONS,
  DECREASE_QUANTITY,
  DECREASE_QUANTITY_WITH_VARIATIONS,
  ADD_VARIATIONS,
} from './actions'; // from ./types

const initial_state = { cart: [], products:  [], variations: [], refreshing: false };

export default function reducer(state = initial_state, action) {
  switch (action.type) {
    case READ:
      return { ...state, refreshing: true };
      break;
    case FAIL:
      return { ...state, refreshing: false }
      break;
    case ADD_TO_CART:
      //If product is already in the cart add 1 to quantity
      //else add new product to cart
      for (i in state.cart) {
        if (state.cart[i].product_id == action.item.id) {
          state.cart[i].quantity += action.quantity;
          return { ...state }
          break;
        }
      }
      state.cart.push({ product_id: action.item.id, quantity: action.quantity });
      return { ...state }
      break;
    case ADD_TO_CART_WITH_VARIATION:
      //If product is already in the cart add 1 to quantity
      //else add new product to cart
      for (i in state.cart) {
        if (state.cart[i].product_id == action.item.id && state.cart[i].variation_id == action.variationId) {
          state.cart[i].quantity += action.quantity;
          return { ...state }
          break;
        }
      }
      state.cart.push({ product_id: action.item.id, variation_id: action.variationId, quantity: action.quantity });
      return { ...state }
      break;
    case EMPTY_CART:
      state.cart = [];
      return { ...state }
      break;
    case REMOVE_FROM_CART:
      //Check if deleted item is in cart -> remove it

      if(action.item.variation_id){
        for(i in state.cart){
          if(state.cart[i].product_id == action.item.product_id && state.cart[i].variation_id == action.item.variation_id){
            state.cart.splice(i, 1);
            return { ...state }
            break;
          }
        }
      }else {
        for (i in state.cart) {
          if (state.cart[i].product_id == action.item.product_id) {
            state.cart.splice(i, 1);
            return { ...state }
            break;
          }
        }
      }
      return { ...state }
      break;
    case INCREASE_QUANTITY:
      for (i in state.cart) {
        if (state.cart[i].product_id == action.item.product_id) {
          state.cart[i].quantity++;
          return { ...state }
          break;
        }
      }
      return { ...state }
      break;
    case INCREASE_QUANTITY_WITH_VARIATIONS:
      //LISÄYS
      for(i in state.cart){
        if(state.cart[i].product_id == action.item.product_id && state.cart[i].variation_id == action.item.variation_id){
          state.cart[i].quantity++;
          return { ...state }
          break;
        }
      }
      return { ...state }
      break;
    case DECREASE_QUANTITY:
      for (i in state.cart) {
        if (state.cart[i].product_id == action.item.product_id) {
          state.cart[i].quantity--;
          return { ...state }
          break;
        }
      }
      return { ...state }
      break;
    case DECREASE_QUANTITY_WITH_VARIATIONS:
      //POSTIO
      for(i in state.cart){
        if(state.cart[i].product_id == action.item.product_id && state.cart[i].variation_id == action.item.variation_id){
          state.cart[i].quantity--;
          return { ...state }
          break;
        }
      }
      return { ...state }
      break;
    case ADD_VARIATIONS:
      for(i in state.variations){
        if(state.variations[i].product_id == action.product_id){
          return { ...state }
          break;
        }
      }
      state.variations.push({product_id: action.product_id, variations: action.variations})
      return { ...state }
      break;
    default:
      return {
        ...state,
        refreshing: true
      };
  }
}
