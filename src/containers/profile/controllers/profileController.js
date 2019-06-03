import Api from '../../../app/controllers/api'
import { AUTH_URL, WEB_URL } from '../../../app/config'

async function updateUser(user,id) {

  console.log("updateUser",user);
  console.log(id)
  //fetch(WEB_URL + '/customer/update/ ' + this.props.contact.id,

  var response = await Api.put(WEB_URL + "/customer/update/"+id, user ,true);
  console.log("Response: ",response)

  return response;
}

export{
  updateUser,
}