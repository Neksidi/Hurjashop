
import { WEB_URL } from '../../../app/config'
import Api from '../../../app/controllers/api'

async function getCategories(props) {
    var response = await Api.get(WEB_URL + '/categories', false);  
  
    if(response){
      if(response.error) {
        return; 
      }
      else {
        props.setCategories(response);
      }
    } 
}

  export {
    getCategories,

  }
  