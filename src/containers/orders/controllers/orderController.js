import  { WEB_URL } from '../../../app/config/index'
import Api from '../../../app/controllers/api'

async function updateOrderStatus(id, body) {
  const response = await Api.put(WEB_URL + `/order/update${id}`, body, true);  
  if(!response.error) {
    return response;
  } else {
  }
}
 
async function createOrder(order) {
  const response = await Api.post(WEB_URL + '/orders', order, false);
  if(!response.error) {
      return response.body;
  } else {
  }
}

async function getOrders(userId) {
  const response = await Api.get(WEB_URL + '/orders/' + userId, false);
  if(!response.error) {
      return response;
  } else {
  }
}

export {
  updateOrderStatus,
  createOrder,
  getOrders
}