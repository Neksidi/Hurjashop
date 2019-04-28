import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  EMPTY_CART,
  NEW_ORDER,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  PREPARE_ORDER_CART,
} from './cartActions';


  const INITIAL_STATE = { 
    cart: [],
    orderCart: [],    //Cart to use when creating orders (id + quantity only)
  };

  
  const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case ADD_TO_CART:
        //If product is already in the cart add 1 to quantity
        //else add new product to cart
        for (i in state.cart) {
          if (state.cart[i].id == action.item.id) {
            state.cart[i].quantity += action.quantity;
            return { ...state }
          }
        }
        action.item.quantity = action.quantity;
        state.cart.push( action.item );

        return { ...state }

      case EMPTY_CART:
        state.cart = [];
        return { ...state }

      case REMOVE_FROM_CART:

        for (i in state.cart) {
          if (state.cart[i].id == action.item.id) {
            state.cart.splice(i, 1);
            return { ...state }
          }
        }
        return { ...state }

      case PREPARE_ORDER_CART:
        //If product is already in the cart add 1 to quantity
        //else add new product to cart
        for (i in state.cart) {
            state.orderCart.push( 
              {
                'product_id': state.cart[i].id,
                'quantity': state.cart[i].quantity
              } 
            );
        }
        return { ...state }

      case INCREASE_QUANTITY:
        for (i in state.cart) {
          if (state.cart[i].id == action.item.id) {
            state.cart[i].quantity++;
            return { ...state }
          }
        }
        return { ...state }
      case DECREASE_QUANTITY:
        for (i in state.cart) {
          if (state.cart[i].id == action.item.id) {
            state.cart[i].quantity--;
            return { ...state }
          }
        }
        return { ...state }

      default:
        return {
          ...state,
        };
    }
  };

export default cartReducer;