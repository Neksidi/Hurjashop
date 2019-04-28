export const ADD_ORDER = 'SET_PRODUCTS'
export const SET_ORDERS = 'ALL'

const addOrder = order => (
  {
    type: ADD_ORDER,
    payload: order,
  }
);

const setOrders = orders => (
    {
        type: SET_ORDERS,
        payload: orders,
    }
)

export {
    addOrder,
    setOrders
}
