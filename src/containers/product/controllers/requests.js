import { WEB_URL } from '../../../app/config'
import Api from '../../../app/controllers/api'

async function getProducts(props) {  
  var response = await Api.get(WEB_URL + '/products');  
  if(response){
    if(response.error) {
      return;  //TODO: return modal with the custom error msg or don't return the error at all.
    }
    else {
      props.setProducts(response)
    }
  } 
}

async function getProduct(props, id) {
  var response = await Api.get(WEB_URL + '/products/'+id+"/variations");  

  if(response){
    if(response.error) {
      return;  //TODO: return modal with the custom error msg or don't return the error at all.
    }
    else {
      props.setProduct(response)
    }
  } 
}

export {
  getProducts,
  getProduct,
}
