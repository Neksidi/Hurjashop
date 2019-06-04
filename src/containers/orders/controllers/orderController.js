import  { WEB_URL } from '../../../app/config/index'
import Api from '../../../app/controllers/api'

async function updateOrderStatus(id, body) {
  const response = await Api.put(WEB_URL + `/order/update${id}`, body, true);  
  if(!response.error) {
    console.log(response);
    return response;
  } else {
    //TODO: Show error modal?
  }
}
 
async function createOrder(order) {
  console.log("Attempting to create new order:")
  console.log(order);
  const response = await Api.post(WEB_URL + '/orders', order, false);
  if(!response.error) {
      console.log(response);
      return response.body;
  } else {
      //TODO: Show error modal?
  }
}

async function getOrders(userId) {
  console.log("Getting orders for:" + userId)
  const response = await Api.get(WEB_URL + '/orders/' + userId, false);
  if(!response.error) {
      console.log(response);
      return response;
  } else {
      //TODO: Show error modal?
  }
}
 
async function updateOrder(newOrder, order) {
  console.log("Attempting to update order:")
  console.log(order);
  const response = await Api.put(WEB_URL + '/order/update/'+newOrder.id, order, false);
  if(!response.error) {
      console.log("Updateorder response: ",response);
      return response;
  } else {
      //TODO: Show error modal?
  }
}

export {
  updateOrderStatus,
  createOrder,
  getOrders,
  updateOrder
}