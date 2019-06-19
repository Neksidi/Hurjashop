import { WEB_URL } from '../../../app/config'
import Api from '../../../app/controllers/api'

async function getProducts(props,parent,page) {  
  var response = await Api.get(WEB_URL + '/products/'+page, false);  
  console.log(response)
  if(response){
    if(response.error) {
      // NAVIGATE parent.refs.getproducts.setButtonAction("Home", parent.props.navigation);
      parent.refs.getproducts.state.visible=true;
      parent.forceUpdate();
      return;  
    }
    else {
      props.setProducts(response);
    }
  } 
}

async function getProduct(id,parent) {
  var response = await Api.get(WEB_URL + '/product/'+id, false);  
  console.log("GETTING PRODUCTS!!!!!!!!")

  if(response){
    if(response.error) {
      // NAVIGATE parent.refs.getproducts.setButtonAction("Home", parent.props.navigation);
      parent.refs.getproducts.state.visible=true;
      parent.forceUpdate();
      return; 
    }
    else {
      return response;
    }
  } 
}

async function getProductsByCategory(props, id, parent,page) {
  var response = await Api.get(WEB_URL + '/products/'+id+'/'+page);  

  if(response){
    if(response.error) {
      // NAVIGATE parent.refs.getproductsbycategory.setButtonAction("Home", parent.props.navigation);
      parent.refs.getproductsbycategory.state.visible=true;
      parent.forceUpdate();
      return; 
    }
    else {
      props.setCategoryProducts(response);
    }
  } 
}


async function searchForProduct(text) {
  console.log("Start search");
  console.log(text);
  var body = {
    "search": text,
  }

  var response = await Api.post(WEB_URL + "/products/search", body, false);

   console.log(response);
   
  if(response){
    if(response.error) {
      console.log("Search response error");
      return;
    }
    else {
      console.log("Return search response");
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
