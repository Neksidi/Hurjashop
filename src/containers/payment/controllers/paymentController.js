import  { PH_URL } from '../../../app/config/index'
import Api from '../../../app/controllers/api'
 
async function newCardPayment(payment) {
    const response = await Api.post(PH_URL + "/kortinlisays_ja_maksu", payment, true);
    if(!response.error) {
        return response;
    } else {
    }

}

async function existingCardPayment(orderId, cardToken) {
    var body = {
        "token": cardToken, 
        "total": "20.00",
        "currency": "EUR", 
        "id": orderId,
    }
    const response = await Api.post(PH_URL + "/maksa_tokenilla", body, true);
    if(!response.error) {
    } else {
    }

}



export {
    newCardPayment,
    existingCardPayment
}