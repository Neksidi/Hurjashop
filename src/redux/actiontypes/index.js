import { ADD_TO_CART, REMOVE_FROM_CART } from '../modules/cart/actions'

export const ADD_TO_CART_ACTION ={
  type: ADD_TO_CART,
}

export const REMOVE_FROM_CART_ACTION ={
  type: REMOVE_FROM_CART,
  text: 'Decreace counter by one'
}

export const WEB_URL = "http://api.hurjashop.qs.fi:8082/api";
export const PH_URL = "http://api.hurjashop.qs.fi:8082/ph";
export const AUTH_URL = "http://api.hurjashop.qs.fi:8082/auth";
export const DB_URL = "http://api.hurjashop.qs.fi:8082/base";
export const POSTI_URL = "http://api.hurjashop.qs.fi:8082/posti";
export const MAIL_URL = "http://api.hurjashop.qs.fi:8082/mail";

//export const WEB_URL = "http://localhost:8082/api";
//export const PH_URL = "http://localhost:8082/ph";
//export const AUTH_URL = "http://localhost:8082/auth";
//export const DB_URL = "http://localhost:8082/base";
//export const POSTI_URL = "http://localhost:8082/posti";
//export const MAIL_URL = "http://localhost:8082/mail";
