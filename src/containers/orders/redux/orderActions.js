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

const deleteOrder = () => (
    {
        type: DELETE_ORDER,
    }
)

export {
    addOrder,
    setOrders,
    deleteOrder,
}
