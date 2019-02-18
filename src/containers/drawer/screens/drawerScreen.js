import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { ScrollView, Text, View, Button, ImageBackground, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';
import { DrawerActions } from 'react-navigation';
import Item from '../components/item'
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'
import { theme } from '../../../app/styles/global'
import { renderUserLinks, renderAuthLinks, logOut } from '../controllers/drawerController'
import { setLoginStatus } from '../../profile/redux/userActions'
import { bindActionCreators } from 'redux';

class DrawerScreen extends Component {
  constructor(props){
    super(props);
  };
  
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer())
  }

  static navigationOptions = {
    drawerLabel: 'Profile',
  };
  
  render() {
    return (
      /*<TouchableWithoutFeedback
        onPress={() => alert("Close Drawer")}
        style={{ width: "100%", backgroundColor: "blue"}}
      >*/
        <View style={{ flex: 1, backgroundColor: theme.color.hurja.main }}>
          <ImageBackground source={require('../../../assets/images/bg_gradientV2.png')} style={{ flex: 1, justifyContent: 'space-between' }}>
            <View style={{ width: '100%' }}>
              <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
                <Image source={require('../../../assets/images/hurja_shop_logo.png')} style={{ width: 75, height: 75, }} resizeMode='contain' />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                  }}
                  onPress={() => this.props.navigation.closeDrawer()}>
                  <FAIcon name='times' size={25} color='#fff' />
                </TouchableOpacity>
                <View style={{ width: '100%' }}>
                  <View>
                    {
                      this.props.isLoggedIn ? (
                        renderUserLinks(this.props)
                      ) : (
                        renderAuthLinks(this.props)
                      )
                    }
                  </View>
                  <View style={{ borderBottomWidth: 1, borderColor: '#ffffff50', paddingBottom: 10 }}>
                    <Item title='Tietoa meistä' icon='info-circle' onPress={this.navigateToScreen('Home')} />
                    <Item title='Käyttöehdot' icon='handshake-o' onPress={this.navigateToScreen('Home')} />
                    <Item title='Ota yhteyttä' icon='envelope-o' onPress={this.navigateToScreen('Home')} />
                  </View>
                </View>
              </View>

            </View>
          </ImageBackground>
        </View>
      //</TouchableWithoutFeedback>

    );


  }
}

DrawerScreen.propTypes = {
  navigation: PropTypes.object
};

const mapDispatchToProps = dispatch => (
	bindActionCreators({ setLoginStatus }, dispatch));

const mapStateToProps = (state) => {
  const  isLoggedIn  = state.user.loggedIn
  const contact = state.user.contact
	return { isLoggedIn, contact }
};

export default connect(mapStateToProps, mapDispatchToProps) (DrawerScreen);