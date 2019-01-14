import { ADD_TO_CART, ADD_TO_CART_WITH_VARIATION, EMPTY_CART, REMOVE_FROM_CART, INCREASE_QUANTITY, INCREASE_QUANTITY_WITH_VARIATIONS, DECREASE_QUANTITY, DECREASE_QUANTITY_WITH_VARIATIONS, ADD_VARIATIONS, } from '../modules/cart/actions'
import { READ_PRODUCTS } from '../modules/products/actions'
import { ADD_CONTACT, STORE_SHIPPING, STORE_METHODS, REMOVE_USER_DATA, IS_LOGGED } from '../modules/contact/actions'
import { STORE_PAY_DATA } from '../modules/pay/actions'
import { STORE_ORDER } from '../modules/order/actions'
import {STORE_SECURE } from '../modules/secure/actions'

export const addToCart = (item, quantity) => {
  return {
    type: ADD_TO_CART,
    item: item,
    quantity, quantity,
  }
}

export const addToCartWithVariations = (item, variationId, quantity) => {
  return {
    type: ADD_TO_CART_WITH_VARIATION,
    item: item,
    variationId: variationId,
    quantity, quantity,
  }
}

export const emptyCart = () => {
  return {
    type: EMPTY_CART,
  }
}

export const removeItemFromCart = (item) => {
  return {
    type: REMOVE_FROM_CART,
    item: item,
  }
}
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
export const addContact = (contact) => {
  return {
    type: ADD_CONTACT,
    contact: contact,
  }
}
export const storePayData = (paydata) => {
  return {
    type: STORE_PAY_DATA,
    paydata: paydata,
  }
}
export const storeOrder = (order) => {
  return {
    type: STORE_ORDER,
    order: order,
  }
}
export const storeShipping = (shipping) => {
  return {
    type: STORE_SHIPPING,
    shipping: shipping,
  }
}
export const storeMethods = (methods) => {
  return {
    type: STORE_METHODS,
    methods: methods,
  }
}
export const storeSecure = (secure) => {
  return {
    type: STORE_SECURE,
    secure: secure,
  }
}
export const addVariations = (product_id, variations) => {
  return {
    type: ADD_VARIATIONS,
    product_id: product_id,
    variations: variations,
  }
}

export const removeUserData = () =>{
  return {
    type: REMOVE_USER_DATA,
  }
}

export const isLoggedIn = (logged) => {
  return {
    type: IS_LOGGED,
    logged: logged,
  }
}
