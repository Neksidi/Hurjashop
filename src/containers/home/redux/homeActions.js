export const READ_PRODUCTS = 'READ_PRODUCTS'


export const addProduct = product => (
    {
      type: 'ADD_PRODUCT',
      payload: product,
    }
  );

export const readProducts = (products) => {
  return {
    type: READ_PRODUCTS,
    products: products,
  }
}
