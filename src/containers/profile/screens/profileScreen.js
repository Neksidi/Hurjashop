import { connect } from 'react-redux'
import React, { Component } from 'react'
import { View, StyleSheet, Text, Button, ScrollView, ActivityIndicator, TouchableOpacity, Image, ImageBackground } from 'react-native';
//import { Logo, Drawer, Cart, CustomBackButton } from '../../navigation/options/Items'
// Global styles
import { theme } from '../../../app/styles/global'
import { FormInput } from 'react-native-elements'
import ButtonDefault from '../components/defaultLoginButton'
import Toast from '../toast'
import { WEB_URL, DB_URL } from '../../../app/config/index'
import { HeaderBackButton } from 'react-navigation';


class Index extends Component {
  constructor(props) {
    super(props)
    this.state={
      disabled: true,
      country: '',
      address: '',
      city: '',
      postcode: '',
      isFilled: false,
      email_validated: false,
      data: null,
      response: null,
      isUpdating: false,
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Text style={{flex:1, textAlign: 'center', fontFamily: 'BarlowCondensed-Medium', color: '#fff', fontSize: 32,}}>Profiili</Text>,
      headerRight: (<View></View>),
      headerTintColor: '#FFF',
      headerLeft: (<HeaderBackButton onPress={() => { navigation.navigate('Home') }} />),
      headerStyle: {
        backgroundColor: theme.color.navigation.background,
        height: theme.navigation.height,
      },

    }
  };





  updateUser(){
    let newData = {
      shipping: {
        first_name: this.props.contact.first_name,
        last_name: this.props.contact.last_name,
        address_1: this.state.address,
        city: this.state.city,
        postcode: this.state.postcode,
        country: this.state.country,
      },
      billing: {
        first_name: this.props.contact.first_name,
        last_name: this.props.contact.last_name,
        address_1: this.state.address,
        city: this.state.city,
        postcode: this.state.postcode,
        country: this.state.country,
      }
    }


    fetch(WEB_URL + '/customer/update/' + this.props.contact.id, {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    })
    .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                response: responseJson,
            }, function () {
                if (responseJson != 400) {
                  this.props.contact.shipping.address_1 = this.state.address;
                  this.props.contact.shipping.city = this.state.city;
                  this.props.contact.shipping.postcode = this.state.postcode;
                  this.props.contact.shipping.country = this.state.country;
                  this.setState({isUpdating: false})
                  this.refs.toast.show('Käyttäjän tiedot päivitetty');
                }
            });
        })
        .catch((error) => {
            console.error(error);
        });


  }
	componentDidUpdate(){
		if(!(this.state.address == undefined || this.state.postcode == undefined || this.state.city == undefined || this.state.country == undefined)){
			if(!this.state.isFilled && this.state.address != "" && this.state.postcode != "" && this.state.city != "" && this.state.country != ""){
				this.setState({isFilled: true});
			}else if(this.state.isFilled && (this.state.address == "" || this.state.postcode == "" || this.state.city == "" || this.state.country == "")){
				this.setState({isFilled: false});
			}
		}
	}




  render() {

    let profilePic = this.props.social.facebook.logged ? (<Image source={{uri: this.props.social.facebook.profilePictureURL}} style={styles.profilepic} /> ) : (<Image style={styles.profilepic} source={require('../../../assets/images/seppo.jpg')} />);

    return(
      <ScrollView style={{backgroundColor: theme.color.hurja.main}}>
        <View style={styles.container}>
        <Toast ref='toast' position='BOTTOM' positionOffset={100} onPress={() => this.props.navigation.navigate('Home')}/>

        <ImageBackground source={require('../../../assets/images/header_tmp2.jpg')} style={{height: 300, width: '100%'}} resizeMode='cover'>
            <View style={styles.innerContainer}>
            <View style={styles.profilepicWrap}>
              {profilePic}
            </View>
              <Text style={styles.pacifico}>- Terve {this.props.contact.first_name}! -</Text>
            </View>
          </ImageBackground>

        <View style={[styles.bar, styles.barBottom]}>
        <TouchableOpacity style={[styles.barItem, styles.barseparator]} onPress={() =>{this.props.navigation.navigate('Orders')}}>
          <Text style={styles.barTop}>Omat tilaukset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.barItem]} onPress={() => this.setState({disabled: !this.state.disabled})}>
          <Text style={styles.barTop}>Muokkaa tietoja</Text>
        </TouchableOpacity>
       </View>

       <View style={styles.formContainer}>
       <Text style={{fontFamily: 'BarlowCondensed-Medium', color: '#fff', fontSize: 23}}>Lähiosoite:</Text>
       <View style={styles.inputContainer}>
            <FormInput editable={!this.state.disabled} placeholder={this.props.contact.shipping.address_1} autoCapitalize='words' inputStyle={styles.input} onChangeText={(address) => this.setState({address})} underlineColorAndroid='transparent' blurOnSubmit={true}/>
          </View>
          <Text style={{fontFamily: 'BarlowCondensed-Medium', color: '#fff', fontSize: 23}}>Kaupunki:</Text>
          <View style={styles.inputContainer}>
            <FormInput editable={!this.state.disabled} placeholder={this.props.contact.shipping.city} autoCapitalize='words' inputStyle={styles.input} onChangeText={(city) => this.setState({city})} underlineColorAndroid='transparent' returnKeyType={'next'}  blurOnSubmit={true} />
          </View>
          <Text style={{fontFamily: 'BarlowCondensed-Medium', color: '#fff', fontSize: 23}}>Maa:</Text>
          <View style={styles.inputContainer}>
            <FormInput editable={!this.state.disabled} placeholder={this.props.contact.shipping.country} autoCapitalize='none' inputStyle={styles.input} onChangeText={(country) => this.setState({country})} underlineColorAndroid='transparent' returnKeyType={'next'} blurOnSubmit={true} />
          </View>
          <Text style={{fontFamily: 'BarlowCondensed-Medium', color: '#fff', fontSize: 23}}>Postinumero:</Text>
          <View style={styles.inputContainer}>
            <FormInput editable={!this.state.disabled} placeholder={this.props.contact.shipping.postcode} autoCapitalize='none'  inputStyle={styles.input} onChangeText={(postcode) => this.setState({postcode})} underlineColorAndroid='transparent' returnKeyType={'next'} blurOnSubmit={true} />
          </View>

          <View style={{width: 300, marginTop: 10}}>

            <ButtonDefault disabled={!this.state.isFilled} text="Päivitä tiedot" type="success" onPress={() => {this.updateUser()}}  />
          </View>
       </View>


      </View>
      </ScrollView>


    );

  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: 'rgba(233, 70, 65, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pacifico: {
    fontFamily: 'Pacifico-Regular',
    color: '#fff',
    fontSize: 28,
  },
  profilepicWrap: {
    width: 180,
    height: 180,
    borderRadius: 100,
    borderColor: 'rgba(0,0,0,0)',
    borderWidth: 16,
},
profilepic: {
  flex: 1,
  width: null,
  alignSelf: 'stretch',
  borderRadius: 100,
  borderColor: '#fff',
  borderWidth: 4
},
bar: {
  borderTopColor: '#fff',
  borderTopWidth: 4,
  backgroundColor: '#e94641',
  flexDirection: 'row'
},
barseparator: {
  borderRightWidth: 4,
  borderColor: '#fff',
},
barItem: {
  flex: 1,
  padding: 18,
  alignItems: 'center'
},
barTop: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
  fontStyle: 'italic'
},
barBottom: {
  borderBottomWidth: 4,
  borderColor: '#fff'
},
inputContainer: {
  width: '100%',
  backgroundColor: '#fff',
  borderRadius: 4,
  marginVertical: 10,
  maxWidth: 300,
},

});


let mapStateToProps = (state) => {
  return {
    contact: state.contact_reducer.contact,
    social: state.contact_reducer.social,
  }
};


export default connect(mapStateToProps)(Index);
