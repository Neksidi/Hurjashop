import  { WEB_URL } from '../../../app/config/index'
import Api from '../../../app/controllers/api'
import Modal from '../../../app/components/common/modal/'

async function updateOrderStatus(id, body) {
  const response = await Api.put(WEB_URL + `/order/update${id}`, body, true);  
  if(!response.error) {
    console.log(response);
    return response;
  } else {
    return (
      <View>
        <Modal title= "Tilauksen statuksen päivitys epäonnistui" content="Statuksen päivitys epäonnistui yritä uudelleen" visible={true}/>
      </View>
    )
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
    return (
      <View>
        <Modal title= "Tilauksen tekeminen epäonnitui" content="Tilauksen tekeminen epäonnistui" visible={true}/>
      </View>
    )
  }
}

async function getOrders(userId) {
  console.log("Getting orders for:" + userId)
  const response = await Api.get(WEB_URL + '/orders/' + userId, false);
  if(!response.error) {
      console.log(response);
      return response;
  } else {
    return (
      <View>
        <Modal title= "Tilausten hakeminen epäonnistui" content="Tilausten hakeminen epäonnistui yritä uudelleen" visible={true}/>
      </View>
    )
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
    return (
      <View>
        <Modal title= "Tilausten päivitys epäonnistui" content="Päivitys epäonnistui yritä uudelleen" visible={true}/>
      </View>
    )
  }
}

export {
  updateOrderStatus,
  createOrder,
  getOrders,
  updateOrder
}