import  { POSTI_URL } from '../../../app/config/index'
import Api from '../../../app/controllers/api'
 
async function getPickUps(postcode,parent) {
    const response = await Api.get(POSTI_URL + '/' + postcode + '/closest', true);
    if(!response.error) {
        console.log(response);
        return response;
    } else {
        // NAVIGATE parent.refs.getpickups.setButtonAction("Home", parent.props.navigation);
        parent.refs.getpickups.state.visible=true;
        parent.forceUpdate();
    }

}

export {
    getPickUps
}