import  { PH_URL } from '../../../app/config/index'
import Api from '../../../app/controllers/api'
 
async function newCardPayment(payment) {
    const response = await Api.post(PH_URL + "/kortinlisays_ja_maksu", payment, true);
    if(!response.error) {
        console.log(response)
        return response;
    } else {
        console.log("payment error")
        console.log(response);
        //TODO: Show error modal?
    }

}

async function existingCardPayment(orderId, cardToken) {
    var body = {
        "token": cardToken, //this.state.token,
        "total": "20.00",//this.props.order.total,
        "currency": "EUR", //this.props.order.currency, 
        "id": orderId,
    }
    const response = await Api.post(PH_URL + "/maksa_tokenilla", body, true);
    if(!response.error) {
        console.log(response)
        // Set paid true?
    } else {
        //TODO: Show error modal?
    }

}



export {
    newCardPayment,
    existingCardPayment
}