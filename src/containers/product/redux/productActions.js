import {INCREASE_QUANTITY, INCREASE_QUANTITY_WITH_VARIATIONS, DECREASE_QUANTITY, DECREASE_QUANTITY_WITH_VARIATIONS } from '../../cart/redux/cartActions'

export const SET_PRODUCTS = 'SET_PRODUCTS'
export const SET_PRODUCT = 'SET_PRODUCT'
export const READ_PRODUCTS = 'READ_PRODUCTS'

const setProduct = productIndex => (
  {
    type: SET_PRODUCT,
    payload: productIndex,
  }
);

const setProducts = animalIndex => (
  {
    type: SET_PRODUCT,
    payload: animalIndex,
  }
);

const readProducts = (products) => {
    return {
      type: READ_PRODUCTS,
      products: products,
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
  setProducts,
  setProduct,
  readProducts,
  increaseCartQuantity,
  increaseCartQuantityWithVariations,
  decreaseCartQuantity,
  decreaseCartQuantityWithVariations
}
