import Api from '../../../app/controllers/api'
import { AUTH_URL, WEB_URL } from '../../../app/config'
import { setSessionId, setSessionUser, removeSessionId, removeSessionUser } from '../../../app/controllers/secureStorage';
import { Alert } from 'react-native';
import {
  LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

function validate(type, parent) {
    switch (type) {
      case 'email': {
        //console.log('VALIDOI EMAIL');
        const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/;

        if(emailReg.test(parent.state.email) === true){
          parent.setState({emailValidation: true});
          console.log("true email")
          return true;
        }else {
          console.log("false email")
          //parent.setState({emailValidation: false});
          return false;
        }
      }
      case 'password': {
        console.log('VALIDOI SALIS');
        if(parent.state.password.length > 0){                 //TODO: Change this to required minimum length
          //parent.setState({passwordValidation: true});
          console.log("true password")
          return true;
        }else {
          console.log("false password")
          //parent.setState({passwordValidation: false});
          return false;
        }
      }
      case 'password_confirm': {
        console.log('VERTAA SALASANAT');
        if(parent.state.password === parent.state.password_confirm){
          //parent.setState({password_confirmValidation: true});

          console.log("true compare")
          return true;
        }else {
          console.log("false compare")
          //parent.setState({password_confirmValidation: false});
          return false;
        }
      }
      case 'firstname': {
        const firstnameReg = /^[a-zA-Z]+$/;
        if (firstnameReg.test(parent.state.firstname) === true){
          console.log("true first")
          //parent.setState({first_nameValidation: true});
          return true;
        } else {
          console.log("false first")
          //parent.setState({first_nameValidation: false});
          return false;
        }
      }
      case 'lastname': {
        const lastnameReg = /^[a-zA-Z]+$/;
        if (lastnameReg.test(parent.state.lastname) === true){
          console.log("true last")
          //parent.setState({last_nameValidation: true});
          return true;
        } else {
          console.log("false first")
          //parent.setState({last_nameValidation: false});
          return false;
        }
      }
      default:
        console.log('Jotain meni pieleen!');
      return false;
    }
}

function validateAll(parent) {
  
      console.log('VALIDATE ALL');
      var ps = parent.state;
      console.log(ps.emailValidation)
      console.log(ps.first_nameValidation)
      console.log(ps.last_nameValidation)
      console.log(ps.passwordValidation)
      console.log(ps.password_confirmValidation)
      console.log(ps.checked)
      if(ps.emailValidation && ps.first_nameValidation && ps.last_nameValidation && ps.passwordValidation && ps.password_confirmValidation && ps.checked) {
        console.log("true all")
        return true;
      } else {
        console.log("false all")
        return false;
      }
}

async function register(parent) {
  console.log("REGISTERING")
  var customer = {
    "email": parent.state.email,
    "first_name": parent.state.first_name,
    "last_name": parent.state.last_name,
    "username": parent.state.email,
    "password": parent.state.password,
  }
  console.log("Sending register request");
  var response = await Api.post(WEB_URL + "/customers", customer, false);

  console.log(response)
  if(!response.err) {
    parent.refs.register_button.success();
    parent.props.navigation.navigate('Home');
    //TODO: Launch a modal saying: "Tilisi luotiin. Voit kirjautua sisään, 
    // vahvistettuasi sähköpostisi sinulle lähettämästämme sähköpostiviestistä."
  } else {
    parent.refs.register_button.reset();
    //TODO: Show error modal. E.g. 
    //Palvelimeen ei saada tällä hetkellä yhteyttä. Tarkista Internet-yhteytesi.
  }

  //Handle database stuff on Node side. Probably not required
  // TODO:
  //If register was success call RegisterSuccess Screen
  //E.g. this.refs.register_button.success();
  // this.props.navigation.pop();
  // this.props.navigation.navigate('RegisterSuccess', {name: this.state.firstname});
  //If register failed show custom error modal and return to register screen.
  //Remember to show error messages. Esim. samalle sähköpostiosoitteelle on rekisteröity tili.
}

async function registerFb(user) {
  console.log("REGISTERING")
  console.log(user)
  var customer = {
    "email": user.email,
    "first_name": user.first_name,
    "last_name": user.last_name,
    "username": user.email,
    "id": user.id
  }
  var response = await Api.post(WEB_URL + "/customers/facebook", customer, false);

  console.log(response)

  // TODO:
  //If register was success call RegisterSuccess Screen
  //E.g. this.refs.register_button.success();
  // this.props.navigation.pop();
  // this.props.navigation.navigate('RegisterSuccess', {name: this.state.firstname});
  //If register failed show custom error modal and return to register screen.
  //Remember to show error messages. Esim. samalle sähköpostiosoitteelle on rekisteröity tili.
}

async function logInFb(access_token) {
  //FB.login(function(response) {
    // Original FB.login code
  //}, { auth_type: 'reauthorize' })

  console.log("Connecting to own Fb login");

  var body = {
    "access_token": access_token,
  }

  var response = await Api.post(AUTH_URL + "/loginfb", body, false);
  console.log(response)

  if(!response.error) {
    //Add contact & save session
    var id = response.session.sessionId;
    var username= response.session.username;
    console.log(response.user)
    console.log(response.session);
    console.log("Saving " + id + " and " + username)
    
    //Save session
    
    setSessionId(id);
    setSessionUser(username);

    return response.user.body;
  }
  else {
    //TODO: Show error modal.
    console.log("error!")
  }
}

async function logInGoogle(code, user) {
  console.log("Connecting to own Google login");
  console.log(code);

  var body = {
    "auth_code": code,
    "user": user,
  }

  var response = await Api.post(AUTH_URL + "/logingoogle", body, false);
 
  console.log(response)
  console.log(response.session);
  if(!response.error) {
    //Add contact & save session
    var id = response.session.sessionId;
    var username = response.session.username;
    console.log("Saving " + id + " and " + username)
    
    //Save session
    
    setSessionId(id);
    setSessionUser(username);
    return response.user.body;
  }
  else {
    //TODO: Show error modal.
  }
  console.log("own google login success?");
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
    const response = await Api.post(AUTH_URL + "/wordpress", body, false);
    
    console.log(response)
    if (!response.error) {
      console.log("Success")
      parent.refs.login_button.success();
      var id = response.sessionId;
      var username = response.username;
      console.log("Saving " + id + " and " + username)
      
      //Save session
      
      setSessionId(id);
      setSessionUser(username);

      await fetchUser(username, parent)
      parent.onLoginSuccess();
    } 
    else {
      parent.refs.login_button.dismiss();
      parent.setState({ correctCredentials: false });
      console.log("handleLogin fail")
    }
}

async function fetchUser(username, parent) {
    console.log("fetching user " + username)
    const response = await Api.get(WEB_URL + "/customer/email/" + username, true)
  
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
        parent.props.setLoginStatus(true)     // Todo: Possibly replace with setContactStatus?
    } else {
      // show error modal saying: "Käyttäjätietojen haussa tapahtui ongelma." and redirect to home?
      console.log("Error fetching user")
    }
    
    
}

async function logIn(props){
  console.log("Logging in")
  var response = await Api.get(AUTH_URL + "/login", true);
  console.log("Login result: ")
  console.log(response)

  if(!response.error) {
    await props.setLoginStatus(true);
  }
}

function logOutPopup(props){
  /*
  * TODO: handle logout with back-end
  */
  console.log("Logging out")
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
  console.log ("LOgging out serverside")
  var response = await Api.get(AUTH_URL + "/logout", true);

  if(!response.error) {
    console.log("clearing storage")
    props.setLoginStatus(false);
    removeSessionId();
    removeSessionUser();
    // TODO: clear contact data
  }
  else {
    console.log("Logout error")
    // TODO: show error modal: (Esim. "Ulos kirjautuminen epäonnistui")
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