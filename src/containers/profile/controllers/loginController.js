import Api from '../../../app/controllers/api'
import { AUTH_URL, WEB_URL } from '../../../app/config'

function validate(type, email, password) {
    switch (type) {
      case 'email':
      console.log('VALIDOI EMAIL');
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/;

      if(reg.test(email) === true){
        //this.setState({emailValidation: true});        REDUX
        return true;
      }else {
        //this.setState({emailValidation: false});        REDUX
        return false;
      }
      case 'password':
      console.log('VALIDOI SALIS');
      if(password.length > 0){
        //this.setState({passwordValidation: true});        REDUX
        return true;
      }else {
        return false;
        //this.setState({passwordValidation: false});        REDUX
      }
      default:
      console.log('Jotain meni pahasti pieleen!');
      return false;
    }
}

async function handleLogin(email, password) {
    console.log('Logging in');
    //Keyboard.dismiss();                           loginScreeniin?
    //this.setState({ isLoggingIn: true })          loginScreeniin?

    const body = {
        "username": email,
        "password": password,
    }
    const response = await Api.post(AUTH_URL + "/wordpress", body)
    
    console.log(response)
    if (response.status == 201) {
      //this.refs.login_button.success();     loginScreeniin?
      //this.fetchUser(responseJson)
    } 
    else {
      //this.refs.login_button.dismiss();     loginScreeniin?
      /*this.setState({                       loginScreeniin?
        correctCredentials: false,
      });   */
    }
}

async function fetchUser(user) {
    const response = await Api.get(WEB_URL + "/customer/email/" + user)
  
    console.log(response)
    if(response) {

        let contactData = {
            id: response.id,
            email: response.email,
            first_name: response.first_name,
            last_name: response.last_name,
            billing: response.billing,
            shipping: response.shipping,
        }

        return contactData;
    }
    

  /*
    this.props.addInfo(contactData)
    this.props.isLogged(true)
    if (responseJson.billing.address_1 === undefined) {
      this.props.navigation.navigate('Home');
    } else {
      this.props.navigation.navigate('Home');
    }
    */
}

async function afterLoginComplete(token) {
    const response = await fetch(
      `https://graph.facebook.com/me?fields=id,name,first_name,last_name,address,email,gender,picture.type(large),cover&access_token=${token}`);
      let result = await response.json();

      // use this result as per the requirement
      //this.props.isLogged(true);                      REDUX
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
      //this.props.addInfo(data);                       //REDUX
      //this.props.navigation.navigate('Home');
    };

export {
    validate,
    handleLogin,
    fetchUser,
    afterLoginComplete
}