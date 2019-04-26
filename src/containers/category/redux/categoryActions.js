export const SET_CATEGORIES = 'SET_CATEGORIES'
export const SET_CURRENT_CATEGORIES = 'SET_CURRENT_CATEGORIES'

const setCategories = categories => (
  {
    type: SET_CATEGORIES,
    payload: categories,
  }
);

export {
  setCategories,
}