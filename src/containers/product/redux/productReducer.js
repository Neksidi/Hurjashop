import {
    READ_PRODUCTS,
   } from './productActions';
   
   const initial_state = { products: [], };
   
   export default function reducer(state = initial_state, action) {
    switch (action.type) {
       case READ_PRODUCTS:
         state.products = action.products;
         return { ...state };
         break;
       default:
        return {
          ...state,
          refreshing: true
        };
    }
   }