import { WEB_URL } from '../../../app/config'
import Api from '../../../app/controllers/api'

async function getProducts(props) {  
  var response = await Api.get(WEB_URL + '/products', false);  
  console.log(response)
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

async function getProductsByCategory(props, id) {
  var response = await Api.get(WEB_URL + '/products/'+id);  

  if(response){
    if(response.error) {
      return;  //TODO: return modal with the custom error msg or don't return the error at all.
    }
    else {
      props.setCategoryProducts(response);
    }
  } 
}


async function searchForProduct(state, id) {
  //TODO

  if(response){
    if(response.error) {
      return;
    }
    else {
      state.setState({searchResult : response});

    }
  } 
}

export {
  getProducts,
  getProduct,
  getProductsByCategory,
  searchForProduct,
}
