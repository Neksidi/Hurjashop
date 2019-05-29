import { SET_CATEGORIES } from './categoryActions';

const INITIAL_STATE = {
  all: [],
};

const categoryReducer = (state = INITIAL_STATE, action) => {
  console.log("category action: ",action.type)
  switch (action.type) {
    case SET_CATEGORIES: {
      let { all } = state;
      all = action.payload;
      let newState = { all };
      return newState;
    }

    default:
      return state;
  }
};

export default categoryReducer;