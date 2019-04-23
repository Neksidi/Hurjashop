export const SET_CATEGORIES = 'SET_CATEGORIES'

const setCategories = categories => (
  {
    type: SET_CATEGORIES,
    payload: categories,
  }
);

export {
  setCategories,
}