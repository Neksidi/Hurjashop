export const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS'
export const ADD_CONTACT = 'ADD_CONTACT'

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




export {
  setLoginStatus,
  addContact
}
