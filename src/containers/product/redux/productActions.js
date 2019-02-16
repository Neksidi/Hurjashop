const setProducts = animalIndex => (
  {
    type: 'SET_PRODUCTS',
    payload: animalIndex,
  }
);

export {
  setProducts
}