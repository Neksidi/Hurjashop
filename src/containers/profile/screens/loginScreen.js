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

class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      visible: false, //Password eye
      email: 'cat@cat.cat',       //Default ''
      emailValidation: true,      //Default false
      password: 'cat',//STRING    //Default ''
      passwordValidation: true,   //Default false
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

  onLoginSuccess() {
      this.refs.login_button.reset();
      console.log("Is loginscreen focused?")
      console.log(this.props.isFocused);
      this.props.navigation.navigate('Home');
  }

  //Creates the facebook login popup
  async handleFacebookLogin() {
    let { isCancelled } = await LoginManager.logInWithReadPermissions(['public_profile','email', ]);

    if ( !isCancelled ) {
      let data = await AccessToken.getCurrentAccessToken();
      let token = data.accessToken.toString();
      console.log(token);
      await this.afterFbLoginComplete(token);
    }
    else {
      //console.log('Login incomplete');
    }
  }

  //Handles the Facebook profile data after succesful login.
  async afterFbLoginComplete(token) {
    const response = await fetch(
    `https://graph.facebook.com/me?fields=id,name,first_name,last_name,address,email,picture.type(large),cover&access_token=${token}`);
    
    let result = await response.json();
    console.log("profile data")
    console.log(result)

      // use this result as per the requirement
      //this.props.isLogged(true);      // setLoginStatus
      //this.props.social.facebook.logged = true;
      //this.props.social.facebook.profilePictureURL = result.picture.data.url;
      let data = {
        id: result.id,
        email: result.email,
        first_name: result.first_name,
        last_name: result.last_name,
      }
      //this.props.addInfo(data); // addContact
      console.log(data)
      console.log("Calling registerFb")
      registerFb(data);
      this.props.navigation.navigate('Home');
  };

  async googleLogin(){
    const response = await fetch('https://hurjashop.qs.fi/?wc-api=auth&done=google');
    //let result = await response.json();
    console.log("Google login:")
    console.log(response)
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
            ref={(input) => this.passwordTextInput = input}
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
  <ButtonWithAnimatedLoader ref='login_button' title='Kirjaudu sisään' errorHandler={() => {this._handleLoginErrors()}} onAnimationFinished={() => {this.setState({isLoggingIn: false})}} onPress={() => { handleLogin(this) }} disabled={!(this.state.emailValidation && this.state.password.length > 0)}/>
</View>

<Separator text='TAI'/>

<View style={{ width: '100%', maxWidth: 400 }}>
  <ButtonDefault icon='facebook-f' text='Facebook' type="facebook" onPress={() => { this.handleFacebookLogin(); }} disabled={this.state.isLoggingIn}/>
</View>
<View style={{ width: '100%', maxWidth: 400 }}>
  <ButtonDefault icon='google' text='Google' type="facebook" onPress={() => { this.googleLogin(); }} disabled={this.state.isLoggingIn}/>
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
const map_dispatch_props = (dispatch) => ({
  addInfo: (info) => {
    dispatch(addContact(info));
  },
  isLogged: (logged) => {
    dispatch(isLoggedIn(logged))
  }
});
*/

const mapDispatchToProps = dispatch => (
	bindActionCreators({ setLoginStatus, addContact }, dispatch));

export default connect(null, mapDispatchToProps)(Login);
