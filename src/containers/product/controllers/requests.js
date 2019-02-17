import { WEB_URL } from '../../../app/config'
import Api from '../../../app/controllers/api'

async function getProducts() {
  var response = await Api.get(WEB_URL + '/products');  

  if(response){
    console.log(response)
    if(response.error)
      return response.error;  //TODO: return modal with the custom error msg or don't return the error at all.
    return response
  } 
}

async function getProduct(id) {
  var response = await Api.get(WEB_URL + '/products/'+id+"/variations");  

  if(response){
    if(response.error)
      return response.error;  //TODO: return modal with the custom error msg or don't return the error at all.
    return response
  } 
}

export {
  getProducts,
  getProduct,
}