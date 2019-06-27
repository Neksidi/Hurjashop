export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDERS = 'SET_ORDERS'
export const DELETE_ORDER = 'DELETE_ORDER'

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

const deleteOrder = order => (
    {
        type: DELETE_ORDER,
        payload: order,
    }
)

export {
    addOrder,
    setOrders,
    deleteOrder,
}
