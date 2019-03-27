import { WEB_URL } from '../../../app/config'
import Api from '../../../app/controllers/api'

async function getProducts(props) {  
<<<<<<< HEAD
  var response = await Api.get(WEB_URL + '/products', false);  
  console.log(response)
=======
  var response = await Api.get(WEB_URL + '/products');  

>>>>>>> aa7c35b9c30063faf28fa5c82d09995fd01490e9
  if(response){
    if(response.error) {
      return;  //TODO: return modal with the custom error msg or don't return the error at all.
    }
    else {
      props.setProducts(response);
    }
  } 
}

async function getProduct(id) {
  var response = await Api.get(WEB_URL + '/product/'+id, false);  

  if(response){
    if(response.error) {
      return;  //TODO: return modal with the custom error msg or don't return the error at all.
    }
    else {
      return response;
    }
  } 
}

export {
  getProducts,
  getProduct,
}
