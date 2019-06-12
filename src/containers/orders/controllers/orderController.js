import  { WEB_URL } from '../../../app/config/index'
import Api from '../../../app/controllers/api'


async function updateOrderStatus(id, body,parent) {
  const response = await Api.put(WEB_URL + `/order/update${id}`, body, true);  
  if(!response.error) {
    console.log(response);
    return response;
  } else {
    // NAVIGATION parent.refs.updateorderstatus.setButtonAction("Home", parent.props.navigation);
    parent.refs.updateorderstatus.state.visible=true;
    parent.forceUpdate();
  }
}
 
async function createOrder(order,parent) {
  console.log("Attempting to create new order:")
  console.log(order);
  const response = await Api.post(WEB_URL + '/orders', order, false);
  if(!response.error) {
      console.log(response);
      return response.body;
  } else {
    // NAVIGATION parent.refs.createorder.setButtonAction("Home", parent.props.navigation);
    parent.refs.createorder.state.visible=true;
    parent.forceUpdate();
  }
}

async function getOrders(userId,parent) {
  console.log("Getting orders for:" + userId)
  const response = await Api.get(WEB_URL + '/orders/' + userId, false);
  if(!response.error) {
      console.log(response);
      return response;
  } else {
      // NAVIGATION parent.refs.getorders.setButtonAction("Home", parent.props.navigation);
      parent.refs.getorders.state.visible=true;
      parent.forceUpdate();
  }
}
 
async function updateOrder(newOrder, order,parent) {
  console.log("Attempting to update order:")
  console.log(order);
  const response = await Api.put(WEB_URL + '/order/update/'+newOrder.id, order, false);
  if(!response.error) {
      console.log("Updateorder response: ",response);
      return response;
  } else {
      // NAVIGATION parent.refs.updateorder.setButtonAction("Home", parent.props.navigation);
      parent.refs.updateorder.state.visible=true;
      parent.forceUpdate();
  }
}

export {
  updateOrderStatus,
  createOrder,
  getOrders,
  updateOrder
}