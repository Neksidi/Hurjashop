import  { POSTI_URL } from '../../../app/config/index'
import Api from '../../../app/controllers/api'
 
async function getPickUps(postcode) {
    const response = await Api.get(POSTI_URL + '/' + postcode + '/closest', true);
    if(!response.error) {
        return response;
    } else {
    }

}

export {
    getPickUps
}