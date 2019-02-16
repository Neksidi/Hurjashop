const INITIAL_STATE = {
    all: [
    ]
  };
  
  const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'SET_PRODUCTS': {
        let { all } = state;
        all = action.payload;
        let newState = { all };
        return newState;
      }
      default:
        return state;
    }
  };
  
  export default productReducer;
  