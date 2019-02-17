//REDUX
import { connect } from 'react-redux'
//import { AUTH_URL, WEB_URL, DB_URL } from '../../redux/actiontypes'
//import { addContact, isLoggedIn } from '../../redux/actioncreators';
//REACT
import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ImageBackground, Keyboard } from 'react-native';
//Custom components
//import { CustomBackButton } from '../../navigation/options/Items'
import Separator from '../components/separator'
//import Loader from '../../components/common/Loader'
import ButtonDefault from '../components/defaultLoginButton'
import ButtonWithAnimatedLoader from '../components/animatedLoginButton'
//Vector icons
import FeatherIcon from 'react-native-vector-icons/dist/Feather'
//Ext methods
//Styles
//import { theme } from '../../../app/styles/global'
import { styles } from '../styles/loginStyles'
import { validate, handleLogin, fetchUser } from '../controllers/loginController'
//Facebook login
/*import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk';
*/

class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      visible: false, //Password eye
      email: '', //STRING
      emailValidation: null, //BOOL
      password: '',//STRING
      passwordValidation: null,//BOOL
      isLoggingIn: false,//BOOL
      correctCredentials: null,//BOOL
      displayErrorMessage: false,//BOOL
    }
  }
  //Header
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    }
  };
  //Validate textinputs
  //Handle login
  /*loginHandler() {
    console.log('Logging in');
    Keyboard.dismiss();
    this.setState({ isLoggingIn: true })
    return fetch(AUTH_URL + "/wordpress", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          "username": this.state.email,
          "password": this.state.password,
        })


      }).then((response) => {
        if (response.status == 201) {
          this.refs.login_button.success();
          response.json().then((responseJson) =>{
            this.fetchUser(responseJson)
          })
        } else {
          this.refs.login_button.dismiss();
          this.setState({
            correctCredentials: false,
          });

        }

      })
      .catch((error) => {
        console.error(error);
      })
    }*/

    /*fetchUser(user) {
      return fetch(WEB_URL + "/customer/email/" + user, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          //TODO: Auth
        },

      }).then((response) => response.json())
      .then((responseJson) => {
        let contactData = {
          id: responseJson.id,
          email: responseJson.email,
          first_name: responseJson.first_name,
          last_name: responseJson.last_name,
          billing: responseJson.billing,
          shipping: responseJson.shipping,
        }
        this.props.addInfo(contactData)
        this.props.isLogged(true)
        if (responseJson.billing.address_1 === undefined) {
          this.props.navigation.navigate('Home');
        } else {
          this.props.navigation.navigate('Home');
        }

      })
      .catch((error) => {
        console.error(error);
      })
    }*/

    async newLoginLogic() {
        const userEmail = await hadleLogin(email, password);
        console.log(userEmail)

        const userData = await fetchUser(userEmail);
        
        if(userData) {
            //this.props.addInfo(contactData)
        }
        
        //this.props.isLogged(true)
        if (userData.billing.address_1 === undefined) {
          this.props.navigation.navigate('Home');
        } else {
          this.props.navigation.navigate('Home');
        }
    }
    /*
    async afterLoginComplete(token) {
      const response = await fetch(
        `https://graph.facebook.com/me?fields=id,name,first_name,last_name,address,email,gender,picture.type(large),cover&access_token=${token}`);
        let result = await response.json();

        // use this result as per the requirement
        this.props.isLogged(true);
        this.props.social.facebook.logged = true;
        this.props.social.facebook.profilePictureURL = result.picture.data.url;
        let data = {
          id: null,
          email: result.email,
          first_name: result.first_name,
          last_name: result.last_name,
          billing: {},
          shipping: {},
        }
        //this.props.addInfo(data);
        this.props.navigation.navigate('Home');
      };
      */
      /*
      async _fbAuth() {
        let { isCancelled } = await LoginManager.logInWithReadPermissions(['public_profile','email', ]);

        if ( !isCancelled ) {
          let data = await AccessToken.getCurrentAccessToken();
          let token = data.accessToken.toString();
          console.log(token);
          await this.afterLoginComplete(token);
        }
        else {
          //console.log('Login incomplete');
        }

      }

      handleFacebookLogin(){
        this._fbAuth();
      }

      handleLoginButtonPress(){
        this.loginHandler();
      }
      //Start login button animation onsubmitediting
      _handleLoginOnSubmitEditing(){
        if(this.state.emailValidation && this.state.password.length > 0){
          this.refs.login_button.animateIn();
        }
      }
      //Display login errors
      _handleLoginErrors(){
        this.setState({displayErrorMessage: true})
      }
      */
      _handleLoginOnSubmitEditing() {
          /*
          if(this.props.reduxState && this.props.reduxState) {
            this.refs.login_button.animateIn();
          }
          */
      }

      render() {
        let visibleIcon = this.state.visible ? ('eye-off') : ('eye');
        let invalidCredentials = (
          <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 8, borderWidth: 1, borderColor: '#fff', padding: 5,}}>
            <FeatherIcon name='alert-triangle' size={20} color={'#fff'} />
            <Text style={{color: '#fff', marginLeft: 10,}}>Antamasi salasana ei vastaa antamaasi sähköpostia!</Text>
          </View>
        );

    return (
      <ImageBackground source={require('../../../assets/images/bg_gradientV2.png')} style={{flex: 1, paddingTop: 40,}} resizeMode='cover' >
      <TouchableOpacity style={styles.customBackButton} onPress={() => this.props.navigation.navigate("Home")}>
        <FeatherIcon name='chevron-left' size={25} color='#fff' />
      </TouchableOpacity>
      <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../../assets/images/hurja_shop_logo.png')} style={styles.logo} resizeMode='contain' />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Kirjaudu sisään</Text>
        {this.state.correctCredentials == false && this.state.displayErrorMessage && invalidCredentials}
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Sähköposti</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                underlineColorAndroid='transparent'
                selectionColor={'#fff'}
                onChangeText={(email) => this.setState({email: email})}
                value={this.state.email}
                returnKeyType='next'
                keyboardType='email-address'
                blurOnSubmit={false}
                onSubmitEditing={() => {
                  this.passwordTextInput.focus();
                  validate('email', this.state.email, this.state.password);
                }}/>
            </View>
          </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Salasana</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            underlineColorAndroid='transparent'
            autoCorrect={false}
            autoCapitalize='none'
            selectionColor={'#fff'}
            secureTextEntry={!this.state.visible}
            onChangeText={(password) => this.setState({password: password})}
            ref={(input) => this.passwordTextInput = input}
            blurOnSubmit={false}
            onSubmitEditing={() =>{
              Keyboard.dismiss();
              validate('password', this.state.email, this.state.password);
              this._handleLoginOnSubmitEditing();
            }}
          />
          <TouchableOpacity style={styles.visibilityButton} onPress={() => this.setState({visible: !this.state.visible})}>
            <FeatherIcon name={visibleIcon} size={20} color='#fff' />
        </TouchableOpacity>
      </View>
    </View>

<View style={{alignSelf: 'center'}}>
  <Text onPress={() => { this.props.navigation.navigate('ForgotPassword') }} style={{ color: '#fff', maxWidth: 400,}}>Unohtuiko salasana?</Text>
</View>

<View style={styles.submitButtonContainer}>
  <ButtonWithAnimatedLoader ref='login_button' title='Kirjaudu sisään' errorHandler={() => {this._handleLoginErrors()}} onAnimationFinished={() => {this.setState({isLoggingIn: false})}} onPress={() => {this.handleLoginButtonPress()}} disabled={!(this.state.emailValidation && this.state.password.length > 0)}/>
</View>

<Separator text='TAI'/>

<View style={{ width: '100%', maxWidth: 400 }}>
  <ButtonDefault icon='facebook-f' text='Facebook' type="facebook" onPress={() => { this.handleFacebookLogin(); }} disabled={this.state.isLoggingIn}/>
</View>
<View style={{ marginTop: 10, maxWidth: 400, alignSelf: 'center'}}>
  <Text onPress={() => { this.props.navigation.navigate('Register') }} style={{ color: '#fff' }}>Puuttuuko sinulta HurjaShop tili?</Text>
</View>

</View>
</View>
</ImageBackground>
);
}
}

/*
const map_state_props = (state) => {
  return {
    contact: state.contact_reducer.contact,
    logged: state.contact_reducer.isLogged,
    social: state.contact_reducer.social,
  }
}
*/

/*
const map_dispatch_props = (dispatch) => ({
  addInfo: (info) => {
    dispatch(addContact(info));
  },
  isLogged: (logged) => {
    dispatch(isLoggedIn(logged))
  }
});
*/

export default //connect(map_state_props, map_dispatch_props)
(Login);
