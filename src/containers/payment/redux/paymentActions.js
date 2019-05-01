export const ADD_PAYMENT = 'ADD_PAYMENT'

const addPayment = payment => (
    {
        type: ADD_PAYMENT,
        payload: payment,
    }
);

export {
    addPayment,
}
