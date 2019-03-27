
import { WEB_URL } from '../../../app/config'
import Api from '../../../app/controllers/api'

async function getCategories(props) {
    var response = await Api.get(WEB_URL + '/categories');  
  
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
    getCategories,
  }
  