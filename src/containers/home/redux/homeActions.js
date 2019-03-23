export const SET_NEWPRODUCTS = 'SET_NEWPRODUCTS'
export const SET_SALEPRODUCTS = 'SET_SALEPRODUCTS'


const setSaleProducts = product => (
  {
    type: SET_NEWPRODUCTS,
    payload: product,
  }
);

const setNewProducts = product => (
  {
    type: SET_SALEPRODUCTS,
    payload: product,
  }
);


export {
  setSaleProducts,
  setNewProducts,
}