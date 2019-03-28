import  { PH_URL } from '../../../app/config/index'
import Api from '../../../app/controllers/api'
 
async function newCardPayment(orderId, orderKey) {
    var body = {
        "total": "20.00",//this.props.order.total,
        "currency": "EUR", //this.props.order.currency, 
        "id": orderId,
        "order_key": orderKey,
        "first_name": "Seppo",  //this.props.contact.firstname
        "last_name": "Esimerkki",    //this.props.contact.lastname
        "lang": "FI"
    }
    const response = await Api.post(PH_URL + "/kortinlisays_ja_maksu", body, true);
    if(!response.error) {
        console.log(response)
    } else {
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