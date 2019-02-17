export const SET_PRODUCTS = 'SET_PRODUCTS'

const setProducts = animalIndex => (
  {
    type: SET_PRODUCTS,
    payload: animalIndex,
  }
);

export {
  setProducts,
}
