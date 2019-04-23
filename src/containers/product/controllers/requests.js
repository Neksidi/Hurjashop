import { WEB_URL } from '../../../app/config'
import Api from '../../../app/controllers/api'

async function getProducts(props) {  
  var response = await Api.get(WEB_URL + '/products');  

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
  var response = await Api.get(WEB_URL + '/product/'+id);  

  if(response){
    if(response.error) {
      return;  //TODO: return modal with the custom error msg or don't return the error at all.
    }
    else {
      return response;
    }
  } 
}

async function getProductsByCategory(props, category) {
  var response = await Api.get(WEB_URL + '/products/'+category);  

  if(response){
    if(response.error) {
      return;  //TODO: return modal with the custom error msg or don't return the error at all.
    }
    else {
      props.setCategories(response);
    }
  } 
}

export {
  getProducts,
  getProduct,
}
