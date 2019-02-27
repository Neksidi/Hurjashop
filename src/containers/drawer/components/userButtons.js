import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { ScrollView, Text, View, Button, ImageBackground, TouchableOpacity, Image, TouchableWithoutFeedback, Linking } from 'react-native';
import { DrawerActions } from 'react-navigation';
import Item from '../components/item'
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'
import { theme } from '../../../app/styles/global'
import { logOut } from '../controllers/drawerController'
import { setLoginStatus } from '../../profile/redux/userActions'
import { bindActionCreators } from 'redux';
import { app_style } from '../../../app/styles/global'

class UserButtons extends Component {
  constructor(props){
    super(props);
  };

  render() {
    return (      
            <View style={{ width: '100%' }}>  
                {
                    this.props.isLoggedIn ? (
                        <View style={{ borderBottomWidth: 1, borderColor: '#ffffff50', paddingBottom: 10}}>
                            <Text style={app_style.drawer_contact}>Hei {this.props.contact.first_name} {this.props.contact.last_name}!</Text>
                            <Item title='Profiili' icon='user-o' onPress={() => this.props.navigation.navigate('Profile')}/>
                            <Item title='Omat tilaukset' icon='list-alt' onPress={() => this.props.navigation.navigate('Orders')}/>
                            <Item title='Kirjaudu ulos' icon='sign-out' onPress={() => logOut(this.props)}/>
                        </View>
                    ) : (
                        <View style={{ borderBottomWidth: 1, borderColor: '#ffffff50', paddingBottom: 10}}>
                            <Item title='Kirjaudu sisään' icon='sign-in' onPress={() => this.props.navigation.navigate('Login')}/>
                            <Item title='Rekisteröidy' icon='user-plus' onPress={() => this.props.navigation.navigate('Register')}/>
                      </View>
                    )
                }
            </View>
    );
  }
}
/*  Get categories
const mapStateToProps = (state) => {
 
};
*/
const mapDispatchToProps = dispatch => (
	bindActionCreators({ setLoginStatus }, dispatch));

const mapStateToProps = (state) => {
  const  isLoggedIn  = state.user.loggedIn
  const contact = state.user.contact
	return { isLoggedIn, contact }
};

export default connect(mapStateToProps, mapDispatchToProps) (UserButtons);
  
  
  