import {INCREASE_QUANTITY, INCREASE_QUANTITY_WITH_VARIATIONS, DECREASE_QUANTITY, DECREASE_QUANTITY_WITH_VARIATIONS } from '../modules/cart/redux/cartActions'

export const readProducts = (products) => {
    return {
      type: READ_PRODUCTS,
      products: products,
    }
  }

  export const increaseCartQuantity = (item) => {
    return {
      type: INCREASE_QUANTITY,
      item: item,
    }
  }
  export const increaseCartQuantityWithVariations = (item) => {
    return {
      type: INCREASE_QUANTITY_WITH_VARIATIONS,
      item: item,
    }
  }
  export const decreaseCartQuantity = (item) => {
    return {
      type: DECREASE_QUANTITY,
      item: item,
    }
  }
  export const decreaseCartQuantityWithVariations = (item) => {
    return {
      type: DECREASE_QUANTITY_WITH_VARIATIONS,
      item: item,
    }
  }

  export const READ_PRODUCTS = 'READ_PRODUCTS'