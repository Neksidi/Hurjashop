const INITIAL_STATE = {
  current: [],
  possible: [
    'Lippis',
    'Mäkiauto',
  ],
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      const {current, possible} = state;

      const addedProduct = action.payload;

      current.push(addedProduct);

      const newState = { current, possible };
      return newState;
    default:
      return state;
  }
};

export default productReducer;