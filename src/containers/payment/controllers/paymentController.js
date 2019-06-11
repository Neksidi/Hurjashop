import  { PH_URL } from '../../../app/config/index'
import Api from '../../../app/controllers/api'
 
async function newCardPayment(par) {
    const response = await Api.post(PH_URL + "/kortinlisays_ja_maksu", par.props.payment, true);
    if(!response.error) {
        console.log("SUCCESS!!!")
        console.log(response)
        return response;
    } else {
        console.log("payment error")
        console.log(response);
        par.refs.modal.setTitle("Kortin syöttämisessä ongelma");
        par.refs.modal.setContent("Kortin syöttämisessä ongelma yritä uudelleen");
        par.refs.modal.show();
    }

}

async function existingCardPayment(orderId, cardToken) {
    var body = {
        "token": cardToken, //this.state.token,
        "total": this.props.order.total,//this.props.order.total,
        "currency": this.props.order.currency, //this.props.order.currency, 
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