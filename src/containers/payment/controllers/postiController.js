import  { POSTI_URL } from '../../../app/config/index'
import Api from '../../../app/controllers/api'
 
async function getPickUps(postcode) {
    const response = await Api.get(POSTI_URL + '/' + postcode + '/closest', true);
    if(!response.error) {
        console.log(response);
        return response;
    } else {
        //TODO: Show error modal?
    }

}

export {
    getPickUps
}