import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  EMPTY_CART,
  NEW_ORDER,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
} from './cartActions';


  const INITIAL_STATE = { 
    cart: [],
  };

  
  const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case ADD_TO_CART:
        //If product is already in the cart add 1 to quantity
        //else add new product to cart
        for (i in state.cart) {
          if (state.cart[i].item.id == action.item.id) {
            state.cart[i].quantity += action.quantity;
            return { ...state }
            break;
          }
        }
        state.cart.push({ item: action.item, quantity: action.quantity });

        return { ...state }
        break;
      case EMPTY_CART:
        state.cart = [];
        return { ...state }
        break;
      case REMOVE_FROM_CART:
        //Check if deleted item is in cart -> remove it

        for (i in state.cart) {
          if (state.cart[i].item.id == action.item.id) {
            state.cart.splice(i, 1);
            return { ...state }
            break;
          }
        }
        
        return { ...state }
        break;
      case INCREASE_QUANTITY:
        for (i in state.cart) {
          if (state.cart[i].item.id == action.item.id) {
            state.cart[i].quantity++;
            return { ...state }
            break;
          }
        }
        return { ...state }
        break;
      case DECREASE_QUANTITY:
        for (i in state.cart) {
          if (state.cart[i].item.id == action.item.id) {
            state.cart[i].quantity--;
            return { ...state }
            break;
          }
        }
        return { ...state }
        break;
      default:
        return {
          ...state,
        };
    }
  };

export default cartReducer;