import { WEB_URL } from '../../../app/config'
import Api from '../../../app/controllers/api'

async function getProducts(props) {  
  var response = await Api.get(WEB_URL + '/products', false);  
  if(response){
    if(response.error) {
      return;  
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
      return;  
    }
    else {
      return response;
    }
  } 
}

async function getProductsByCategory(props, id) {
  var response = await Api.get(WEB_URL + '/products/'+id);  

  if(response){
    if(response.error) {
      return;  
    }
    else {
      props.setCategoryProducts(response);
    }
  } 
}


async function searchForProduct(text) {
  var body = {
    "search": text,
  }

  var response = await Api.post(WEB_URL + "/products/search", body, false);
   
  if(response){
    if(response.error) {
      return;
    }
    else {
      return response;
    }
  } 
}

export {
  getProducts,
  getProduct,
  getProductsByCategory,
  searchForProduct,
}
