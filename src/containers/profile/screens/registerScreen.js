import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, TextInput, Keyboard, ScrollView } from 'react-native';

import FeatherIcon from 'react-native-vector-icons/dist/Feather'
import ButtonWithAnimatedLoader from '../components/animatedLoginButton'
import { validate, validateAll, register } from '../controllers/loginController'
import { CheckBox } from 'react-native-elements'

export default class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      first_name: 'kissa',
      first_nameValidation: false,
      last_name: 'kissa',
      last_nameValidation: false,
      email: 'kissa@hurja.fi',
      emailValidation: false,
      password: 'kissakissa123',//STRING
      passwordValidation: false,
      password_confirm: 'kissakissa123',//STRING
      password_confirmValidation: false,//BOOL
      checked: false,
      isFilled: true, //
      visiblePassword: false,
      visibleConfirmation: false
    }
  }

  //Header
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    }
  };

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState)
    console.log(this.state)
    if (prevState.first_name !== this.state.first_name) {
      console.log("different first bool")
      this.setState({ first_nameValidation: validate("firstname", this) })
    }
    if (prevState.last_name !== this.state.last_name) {
      console.log("different last bool") 
      this.setState({ last_nameValidation: validate("lastname", this) })
    }
    if (prevState.email !== this.state.email) {
      console.log("different email bool")
      this.setState({ emailValidation: validate("email", this) })
    }
    if (prevState.password !== this.state.password) {
      console.log("different password bool")
      this.setState({ passwordValidation: validate("password", this) })
    }
    if (prevState.password_confirm !== this.state.password_confirm) {
      console.log("different confirm bool")
      this.setState({ password_confirmValidation: validate("password_confirm", this) })
    }
    if (this.state.isFilled != validateAll(this)) {
      console.log("different filled bool " + this.state.isFilled)
      console.log("Setting filled to " + !this.state.isFilled)
      this.setState({ isFilled: !this.state.isFilled })
    }
  }

  render() {

    let visiblePasswordIcon = this.state.visiblePassword ? ('eye-off') : ('eye');
    let visibleConfirmationIcon = this.state.visibleConfirmation ? ('eye-off') : ('eye');

    var text1 = "Olen lukenut ja hyväksyn kaikki "
    var text2 = "käyttöehdot"
    var text3 = "."

    return (
      <ImageBackground source={require('../../../assets/images/bg_gradientV2.png')} style={{ flex: 1, padding: 20, }}>
        <TouchableOpacity style={styles.customBackButton} onPress={() => this.props.navigation.goBack()}>
          <FeatherIcon name='chevron-left' size={25} color='#fff' />
        </TouchableOpacity>

        <View style={styles.contentContainer}>
          <ScrollView style={{ width: '100%' }}>
            <View style={styles.logoContainer}>
              <Image source={require('../../../assets/images/hurja_shop_logo.png')} style={styles.logo} resizeMode='contain' />
            </View>

            <View style={styles.formContainer}>

              <Text style={styles.formTitle}>Rekisteröidy</Text>
              {/*this.state.correctCredentials == false && this.state.displayErrorMessage && invalidCredentials*/}
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Etunimi</Text>
                <View style={styles.textInputContainer}>
                  <TextInput
                    style={styles.textInput}
                    underlineColorAndroid='transparent'
                    selectionColor={'#fff'}
                    onChangeText={(first_name) => this.setState({ first_name: first_name })}
                    value={this.state.first_name}
                    returnKeyType='next'
                    keyboardType='email-address'
                    blurOnSubmit={false}
                    onSubmitEditing={() => {
                      this.lastNameTextInput.focus();
                      validate('firstname', this);
                    }} />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Sukunimi</Text>
                <View style={styles.textInputContainer}>
                  <TextInput
                    style={styles.textInput}
                    underlineColorAndroid='transparent'
                    selectionColor={'#fff'}
                    onChangeText={(last_name) => this.setState({ last_name: last_name })}
                    value={this.state.last_name}
                    returnKeyType='next'
                    keyboardType='email-address'
                    blurOnSubmit={false}
                    ref={(input) => { this.lastNameTextInput = input; }}
                    onSubmitEditing={() => {
                      this.emailTextInput.focus();
                      validate('lastname', this);
                    }} />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Sähköposti</Text>
                <View style={styles.textInputContainer}>
                  <TextInput
                    style={styles.textInput}
                    underlineColorAndroid='transparent'
                    selectionColor={'#fff'}
                    onChangeText={(email) => this.setState({ email: email })}
                    value={this.state.email}
                    returnKeyType='next'
                    keyboardType='email-address'
                    blurOnSubmit={false}
                    ref={(input) => { this.emailTextInput = input; }}
                    onSubmitEditing={() => {
                      this.passwordTextInput.focus();
                      validate('email', this);
                    }} />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Salasana</Text>
                <View style={styles.textInputContainer}>
                  <TextInput
                    style={styles.textInput}
                    underlineColorAndroid='transparent'
                    returnKeyType='next'
                    autoCorrect={false}
                    autoCapitalize='none'
                    selectionColor={'#fff'}
                    secureTextEntry={!this.state.visiblePassword}
                    onChangeText={(password) => this.setState({ password: password })}
                    blurOnSubmit={false}
                    ref={(input) => { this.passwordTextInput = input; }}
                    onSubmitEditing={() => {
                      this.passwordConfirmTextInput.focus();
                      validate('password', this);
                    }}
                  />
                  <TouchableOpacity style={styles.visibilityButton} onPress={() => this.setState({ visiblePassword: !this.state.visiblePassword })}>
                    <FeatherIcon name={visiblePasswordIcon} size={20} color='#fff' />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Salasanan varmistus</Text>
                <View style={styles.textInputContainer}>
                  <TextInput
                    style={styles.textInput}
                    underlineColorAndroid='transparent'
                    autoCorrect={false}
                    autoCapitalize='none'
                    selectionColor={'#fff'}
                    secureTextEntry={!this.state.visibleConfirmation}
                    onChangeText={(password_confirm) => this.setState({ password_confirm: password_confirm })}
                    blurOnSubmit={false}
                    ref={(input) => { this.passwordConfirmTextInput = input; }}
                    onSubmitEditing={() => {
                      Keyboard.dismiss();
                      validate('password_confirm', this);
                      //this._handleLoginOnSubmitEditing();
                    }}
                  />
                  <TouchableOpacity style={styles.visibilityButton} onPress={() => this.setState({ visibleConfirmation: !this.state.visibleConfirmation })}>
                    <FeatherIcon name={visibleConfirmationIcon} size={20} color='#fff' />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={[styles.checkBox,{ width: '100%', marginVertical: 10, justifyContent:'flex-start' }]}>
                
                <CheckBox checked={this.state.checked} 
                onPress={() => { this.state.checked ? (this.setState({ checked: false })) : (this.setState({ checked: true })); }}
                title={<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>

                  <Text style={{ marginLeft: 5}}>{text1} 
                  <Text style={{ color: 'blue' }} onPress={() => this.props.navigation.navigate('Terms')}>{text2}</Text> 
                  {text3}
                  </Text>
                </View>}
                
                />

              
              </View>

              <View style={styles.submitButtonContainer}>
                <ButtonWithAnimatedLoader 
                  ref='register_button' 
                  title='Rekisteröidy' 
                  errorHandler={() => { console.log("Error handle") }} 
                  onPress={() => { register(this) }} 
                  disabled={!this.state.isFilled} />
              </View>

            </View>
          </ScrollView>
        </View>

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  customBackButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    paddingBottom: 30,
    alignSelf: "center"
  },
  logo: {
    width: 90,
    height: 90,
  },
  formContainer: {
    alignItems: 'flex-start',
    width: '100%',
    position: 'relative'
  },
  formTitle: {
    fontFamily: 'BarlowCondensed-Regular',
    fontSize: 35,
    color: '#fff',
    alignSelf: 'center',
    marginBottom: 10,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
    maxWidth: 400,
  },
  inputTitle: {
    color: '#fff',
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#fff',
  },
  textInput: {
    color: '#fff',
    flex: 1,
  },
  submitButtonContainer: {
    width: '100%',
    marginTop: 20,
    maxWidth: 400,
  },
});
