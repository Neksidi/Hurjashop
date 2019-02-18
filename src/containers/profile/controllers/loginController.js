import Api from '../../../app/controllers/api'
import { AUTH_URL, WEB_URL } from '../../../app/config'

function validate(type, parent) {
    switch (type) {
      case 'email':
      console.log('VALIDOI EMAIL');
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/;

      if(reg.test(parent.state.email) === true){
        parent.setState({emailValidation: true});
        //this.setState({emailValidation: true});        REDUX
        console.log("true")
        return true;
      }else {
        console.log("false")
        parent.setState({emailValidation: false});
        //this.setState({emailValidation: false});        REDUX
        return false;
      }
      case 'password':
      console.log('VALIDOI SALIS');
      if(parent.state.password.length > 0){
        parent.setState({passwordValidation: true});
        //this.setState({passwordValidation: true});        REDUX
        console.log("true")
        return true;
      }else {
        console.log("false")
        parent.setState({passwordValidation: false});
        //this.setState({passwordValidation: false});        REDUX
      }
      default:
      console.log('Jotain meni pahasti pieleen!');
      return false;
    }
}

async function handleLogin(parent) {
    console.log('Logging in');
    console.log(parent)
    //Keyboard.dismiss();                           loginScreeniin?
    //this.setState({ isLoggingIn: true })          loginScreeniin?

    const body = {
        "username": parent.state.email,
        "password": parent.state.password,
    }
    console.log(body)
    const response = await Api.post(AUTH_URL + "/wordpress", body);
    
    console.log(response)
    console.log("MIKSI")
    if (!response.error) {
      console.log("Success")
      parent.refs.login_button.success();
      const session = {
        sessionId: response.sessionId,
        sessionUser: response.username
      }

      //TODO: save session
      fetchUser(session, parent)
    } 
    else {
      parent.refs.login_button.dismiss();
      parent.setState({ correctCredentials: false });
      console.log("handleLogin fail")
    }
}

async function fetchUser(session, parent) {
    console.log("fetching user")
    const response = await Api.get(WEB_URL + "/customer/email/" + session.sessionUser)
  
    console.log(response)
    if(!response.error) {

        let contactData = {
            id: response.id,
            email: response.email,
            first_name: response.first_name,
            last_name: response.last_name,
            billing: response.billing,
            shipping: response.shipping,
        }
        parent.props.addContact(contactData)
        parent.props.setLoginStatus(true)
        parent.props.navigation.navigate('Home');
    } else {
      // show error modal saying: "Käyttäjätietojen haussa tapahtui ongelma." and redirect to home?
      console.log("Error fetching user")
    }
    
    
}

async function afterLoginComplete(token) {
  console.log("after Login complete")
  const response = await fetch(
    `https://graph.facebook.com/me?fields=id,name,first_name,last_name,address,email,gender,picture.type(large),cover&access_token=${token}`);
  let result = await response.json();
  // use this result as per the requirement
  //this.props.setLoginStatus(true);                      REDUX
  //this.props.social.facebook.logged = true;                           REDUX
  //this.props.social.facebook.profilePictureURL = result.picture.data.url;                     REDUX
  let data = {
    id: null,
    email: result.email,
    first_name: result.first_name,
    last_name: result.last_name,
    billing: {},
    shipping: {},
  }
    //this.props.addContact(data);                       //REDUX
    //this.props.navigation.navigate('Home');
};

export {
    validate,
    handleLogin,
    fetchUser,
    afterLoginComplete
}