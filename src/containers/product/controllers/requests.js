import { WEB_URL } from '../../../app/config'
import Api from '../../../app/controllers/api'

export function getProducts() {
  return Api.get(WEB_URL + '/products')
    /*
    .then((result) => {
	 return result;
    })
    .catch((error) => {
        return false;
    })
*/
}