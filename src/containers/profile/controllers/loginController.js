import Api from '../../../app/controllers/api'
import { AUTH_URL, WEB_URL } from '../../../app/config'
import { setSessionId, setSessionUser, removeSessionId, removeSessionUser } from '../../../app/controllers/secureStorage';
import { Alert } from 'react-native';
import {
  LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

function validate(type, parent) {
    switch (type) {
      case 'email': {
        const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/;

        if(emailReg.test(parent.state.email) === true){
          parent.setState({emailValidation: true});
          return true;
        }else {
          return false;
        }
      }
      case 'password': {
        if(parent.state.password.length > 0){                
          return true;
        }else {
          return false;
        }
      }
      case 'password_confirm': {
        if(parent.state.password === parent.state.password_confirm){
          return true;
        }else {
          return false;
        }
      }
      case 'firstname': {
        const firstnameReg = /^[a-zA-Z]+$/;
        if (firstnameReg.test(parent.state.firstname) === true){
          return true;
        } else {
          return false;
        }
      }
      case 'lastname': {
        const lastnameReg = /^[a-zA-Z]+$/;
        if (lastnameReg.test(parent.state.lastname) === true){
          return true;
        } else {
          return false;
        }
      }
      default:
      return false;
    }
}

function validateAll(parent) {
      var ps = parent.state;
      if(ps.emailValidation && ps.first_nameValidation && ps.last_nameValidation && ps.passwordValidation && ps.password_confirmValidation && ps.checked) {
        return true;
      } else {
        return false;
      }
}

async function register(parent) {
  var customer = {
    "email": parent.state.email,
    "first_name": parent.state.first_name,
    "last_name": parent.state.last_name,
    "username": parent.state.email,
    "password": parent.state.password,
  }
  var response = await Api.post(WEB_URL + "/customers", customer, false);

  if(!response.err) {
    parent.refs.register_button.success();
    parent.props.navigation.navigate('Home');

  } else {
    parent.refs.register_button.reset();
    
  }

  
}

async function registerFb(user) {
  var customer = {
    "email": user.email,
    "first_name": user.first_name,
    "last_name": user.last_name,
    "username": user.email,
    "id": user.id
  }
  var response = await Api.post(WEB_URL + "/customers/facebook", customer, false);
}

async function logInFb(access_token) {
 
  var body = {
    "access_token": access_token,
  }

  var response = await Api.post(AUTH_URL + "/loginfb", body, false);
}

async function logInGoogle(code, user) {
  var body = {
    "auth_code": code,
    "user": user,
  }

  var response = await Api.post(AUTH_URL + "/logingoogle", body, false);
  if(!response.error) {
    var id = response.session.sessionId;
    var username = response.session.username;
    
    setSessionId(id);
    setSessionUser(username);
    return response.user;
  }
  else {
  }
}


async function handleLogin(parent) {
    const body = {
        "username": parent.state.email,
        "password": parent.state.password,
    }
    const response = await Api.post(AUTH_URL + "/wordpress", body, false);
    
    if (!response.error) {
      parent.refs.login_button.success();
      var id = response.sessionId;
      var username = response.username;
      
      setSessionId(id);
      setSessionUser(username);

      await fetchUser(username, parent)
      parent.onLoginSuccess();
    } 
    else {
      parent.refs.login_button.dismiss();
      parent.setState({ correctCredentials: false });
    }
}

async function fetchUser(username, parent) {
    const response = await Api.get(WEB_URL + "/customer/email/" + username, true)
  
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
    } else {
    }
    
    
}

async function logIn(props){
  var response = await Api.get(AUTH_URL + "/login", true);

  if(!response.error) {
    await props.setLoginStatus(true);
  }
}

function logOutPopup(props){
  props.navigation.closeDrawer();
    Alert.alert(
      'Kirjaudu ulos',
      'Haluatko varmasti kirjautua ulos?',
      [
        {text: 'Peruuta', onPress:()=> props.navigation.openDrawer()},
        {text: 'Kyllä', onPress: () => logOut(props)}
      ],
      {cancellable: true}
    );
}

async function logOut(props) {
  var response = await Api.get(AUTH_URL + "/logout", true);

  if(!response.error) {
    props.setLoginStatus(false);
    removeSessionId();
    removeSessionUser();
  }
  else {
  }
}

async function afterLoginComplete(token) {
  const response = await fetch(
    `https://graph.facebook.com/me?fields=id,name,first_name,last_name,address,email,gender,picture.type(large),cover&access_token=${token}`);
  let result = await response.json();
  
  let data = {
    id: null,
    email: result.email,
    first_name: result.first_name,
    last_name: result.last_name,
    billing: {},
    shipping: {},
  }
    
};

export {
    validate,
    validateAll,
    register,
    registerFb,
    handleLogin,
    fetchUser,
    afterLoginComplete,
    logIn,
    logInFb,
    logInGoogle,
    logOut,
    logOutPopup
}