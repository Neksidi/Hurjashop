export const SET_PRODUCTS = 'SET_PRODUCTS'
export const SET_PRODUCT = 'SET_PRODUCT'
export const SET_CATEGORY_PRODUCTS = 'SET_CATEGORY_PRODUCTS'

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

const setCategoryProducts = categoryProducts => (
  {
    type: SET_CATEGORY_PRODUCTS,
    payload: categoryProducts,
  }
);

export {
  setProducts,
  setProduct,
  setCategoryProducts
}
