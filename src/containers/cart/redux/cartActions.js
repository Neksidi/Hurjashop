export const FAIL = 'FAIL'
export const READ = 'READ'
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const EMPTY_CART = 'EMPTY_CART'
export const PREPARE_ORDER_CART = 'PREPARE_ORDER_CART'
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY'
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY'


const parseCart = () => {
  return {
    type: PREPARE_ORDER_CART,
  }
}

const emptyCart = () => {
  return {
    type: EMPTY_CART,
  }
}

const addToCart = (item, quantity) => {
  return {
    type: ADD_TO_CART,
    item: item,
    quantity: quantity,
  }
}

const removeFromCart = (item) => {
  return {
    type: REMOVE_FROM_CART,
    item: item,
  }
}


const increaseCartQuantity = (item) => {
    return {
      type: INCREASE_QUANTITY,
      item: item,
    }
  }

  const decreaseCartQuantity = (item) => {
    return {
      type: DECREASE_QUANTITY,
      item: item,
    }
  }

export {
    emptyCart,
    addToCart,
    removeFromCart,
    parseCart,
    increaseCartQuantity,
    decreaseCartQuantity,
}