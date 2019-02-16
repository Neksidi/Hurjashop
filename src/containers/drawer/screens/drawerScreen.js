import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { ScrollView, Text, View, Button, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { DrawerActions } from 'react-navigation';
import Item from '../Item'
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'
import { theme } from '../../../app/styles/global'


class DrawerScreen extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer())
  }

  static navigationOptions = {
    drawerLabel: 'Profile',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../../../assets/images/seppo.jpg')}
      />
    ),
  };

  renderLinks() {
    return (
      <View style={{ borderBottomWidth: 1, borderColor: '#ffffff50', paddingBottom: 10 }}>
        <Item title='Kirjaudu sisään' icon='sign-in' onPress={this.navigateToScreen('Home')} />
        <Item title='Rekisteröidy' icon='user-plus' onPress={this.navigateToScreen('Home')} />
        <Item title='Tietoa meistä' icon='info-circle' onPress={this.navigateToScreen('Home')} />
        <Item title='Käyttöehdot' icon='handshake-o' onPress={this.navigateToScreen('Home')} />
        <Item title='Ota yhteyttä' icon='envelope-o' onPress={this.navigateToScreen('Home')} />
      </View>
    );
  }
  render() {

    return (
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
              <View style={{ width: '100%' }}>{this.renderLinks()}</View>
            </View>

          </View>
        </ImageBackground>
      </View>

    );


  }
}

DrawerScreen.propTypes = {
  navigation: PropTypes.object
};

export default DrawerScreen;