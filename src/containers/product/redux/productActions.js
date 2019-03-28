export const SET_PRODUCTS = 'SET_PRODUCTS'
export const SET_PRODUCT = 'SET_PRODUCT'

const setProduct = productIndex => (
  {
    type: SET_PRODUCT,
    payload: productIndex,
  }
);

const setProducts = products => (
  {
    type: SET_PRODUCTS,
    payload: products,
  }
);

export {
  setProducts,
  setProduct,
}
