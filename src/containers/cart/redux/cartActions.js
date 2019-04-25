
export const FAIL = 'FAIL'
export const READ = 'READ'
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const EMPTY_CART = 'EMPTY_CART'
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY'
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY'

const addToCart = (item, quantity) => {
  return {
    type: ADD_TO_CART,
    item: item,
    quantity: quantity,
  }
}

const increaseCartQuantity = (item) => {
    return {
      type: INCREASE_QUANTITY,
      item: item,
    }
  }

  const increaseCartQuantityWithVariations = (item) => {
    return {
      type: INCREASE_QUANTITY_WITH_VARIATIONS,
      item: item,
    }
  }

  const decreaseCartQuantity = (item) => {
    return {
      type: DECREASE_QUANTITY,
      item: item,
    }
  }
  const decreaseCartQuantityWithVariations = (item) => {
    return {
      type: DECREASE_QUANTITY_WITH_VARIATIONS,
      item: item,
    }
  }

export {
    addToCart,
    increaseCartQuantity,
    increaseCartQuantityWithVariations,
    decreaseCartQuantity,
    decreaseCartQuantityWithVariations
}