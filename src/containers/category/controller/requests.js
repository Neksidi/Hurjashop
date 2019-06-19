
import { WEB_URL } from '../../../app/config'
import Api from '../../../app/controllers/api'

async function getCategories(props,parent) {
    var response = await Api.get(WEB_URL + '/categories/', false);  
  
    if(response,parent){
      if(response.error) {
        // NAVIGATE parent.refs.getcategories.setButtonAction("Home", parent.props.navigation);
        parent.refs.getcategories.state.visible=true;
        parent.forceUpdate();
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
  