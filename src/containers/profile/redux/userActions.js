export const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS'
export const ADD_CONTACT = 'ADD_CONTACT'
export const ADD_SHIPPING = 'ADD_SHIPPING'
export const ADD_METHODS = 'ADD_METHODS'

const setLoginStatus = status => (
  {
    type: SET_LOGIN_STATUS,
    payload: status,
  }
);

const addContact = contact => (
  {
    type: ADD_CONTACT,
    payload: contact,
  }
);

const addShipping = shipping => (
  {
    type: ADD_SHIPPING,
    payload: shipping,
  }
);

const addMethods = methods => (
  {
    type: ADD_METHODS,
    payload: methods,
  }
);



export {
  setLoginStatus,
  addContact,
  addShipping,
  addMethods
}
