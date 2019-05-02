//REDUX
import { connect } from 'react-redux'

//REACT
import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ImageBackground, Keyboard, ScrollView } from 'react-native';

import Separator from '../components/separator'
import ButtonDefault from '../components/defaultLoginButton'
import ButtonWithAnimatedLoader from '../components/animatedLoginButton'
//Vector icons
import FeatherIcon from 'react-native-vector-icons/dist/Feather'

import { styles } from '../styles/loginStyles'
import { validate, handleLogin, fetchUser, registerFb } from '../controllers/loginController'
import { setLoginStatus, addContact } from '../redux/userActions'
import { bindActionCreators } from 'redux';
//Facebook login
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk';

import { logInFb, logInGoogle } from '../../../containers/profile/controllers/loginController'
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

GoogleSignin.configure({
  //scopes: ['email, profile'], // what API you want to access on behalf of the user, default is email and profile
  webClientId: '264627578878-g6tek0beqeer45074rgeqs21mciv096e.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
  accountName: '', // [Android] specifies an account name on the device that should be used
  //iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      visible: false, //Password eye
      email: '',      
      emailValidation: false,    
      password: '',
      passwordValidation: false,
      isLoggingIn: false,
      correctCredentials: null,
      displayErrorMessage: false,
    }
  }
  //Header
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    }
  };

  _handleLoginOnSubmitEditing(){
    if(this.state.emailValidation && this.state.password.length > 0){
      this.refs.login_button.animateIn();
    }
  }
  
  //Display login errors
  _handleLoginErrors(){
    this.setState({displayErrorMessage: true})
  }

  onLoginSuccess() {
      this.refs.login_button.reset();
      this.props.navigation.navigate('Home');
  }

  //Creates the facebook login popup
  async handleFacebookLogin() {
    let { isCancelled } = await LoginManager.logInWithReadPermissions(['public_profile','email', ]);

    if ( !isCancelled ) {
      let data = await AccessToken.getCurrentAccessToken();
      let token = data.accessToken.toString();
      await this.afterFbLoginComplete(token);
    }
    else {
    }
  }

  //Handles the Facebook profile data after succesful login.
  async afterFbLoginComplete(token) {

    await logInFb(token);

      this.props.navigation.navigate('Home');
  };

  googleIsSignedIn = async () => {
    return await GoogleSignin.isSignedIn();
  };

  googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      var user = await logInGoogle(userInfo.serverAuthCode, userInfo.user);
      this.props.setLoginStatus(true);
      await this.props.addContact(user);
      this.props.navigation.navigate('Home');

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  googleSignOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
    }
  };

  googleRevokeAccess = async () => {
    try {
      await GoogleSignin.revokeAccess();
    } catch (error) {
    }
  };

  googleGetCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
  };

  googleSilentLogin = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      return userInfo;
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
      } else {
      }
    }
  };

  async componentDidMount() {
    var login = await this.googleSilentLogin();
    var logged = await this.googleIsSignedIn();
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
      <ScrollView>
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
                        validate('email', this);
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
                    value={this.state.password}
                    ref={(input) => { this.passwordTextInput = input; }}
                    blurOnSubmit={false}
                    onSubmitEditing={() =>{
                      Keyboard.dismiss();
                      validate('password', this);
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
                <ButtonWithAnimatedLoader 
                  ref='login_button' 
                  title='Kirjaudu sisään' 
                  errorHandler={() => {this._handleLoginErrors()}} 
                  onAnimationFinished={() => {this.setState({isLoggingIn: false})}} 
                  onPress={() => { handleLogin(this) }} 
                  disabled={!(this.state.emailValidation && this.state.password.length > 0)}/>
              </View>

              <Separator text='TAI'/>

              <View style={{ width: '100%', maxWidth: 400, height: 60 }}>
                <ButtonDefault icon='facebook-f' text='Facebook' type="facebook" onPress={() => { this.handleFacebookLogin(); }} disabled={this.state.isLoggingIn}/>
              </View>

              {
              <GoogleSigninButton
                style={{ width: '100%', maxWidth: 400, height: 60 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={this.googleSignIn}
                disabled={this.state.isSigninInProgress} />
                }

              <View style={{ marginTop: 10, maxWidth: 400, alignSelf: 'center'}}>
                <Text onPress={() => { this.props.navigation.navigate('Register') }} style={{ color: '#fff' }}>Puuttuuko sinulta HurjaShop tili?</Text>
              </View>

            </View>
          </View>
        </ImageBackground>
      </ScrollView>
);
}
}




const mapDispatchToProps = dispatch => (
	bindActionCreators({ setLoginStatus, addContact }, dispatch));

export default connect(null, mapDispatchToProps)(Login);
