export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDERS = 'SET_ORDERS'

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
    setOrders,
}
