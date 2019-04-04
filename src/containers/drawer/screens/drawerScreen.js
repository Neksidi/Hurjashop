import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { ScrollView, Text, View, Button, ImageBackground, TouchableOpacity, Image, TouchableWithoutFeedback, Linking } from 'react-native';
import { DrawerActions } from 'react-navigation';
import Item from '../components/item'
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'
import { theme } from '../../../app/styles/global'
import { bindActionCreators } from 'redux';
import Categories from '../components/categories'
import UserButtons from '../components/userButtons'

class DrawerScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      categories: ['Paidat', 'Lippikset', 'Mäkiautot']      // FOR DEBUG ONLY!
    }
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
                <View style={{ width: '100%', maxHeight:220 }}>
                  <View>
                    {
                      <UserButtons navigation={this.props.navigation}/>
                    }
                  </View>
                  <View> 
                    <Categories navigation={this.props.navigation}/>
                  </View>
                  <View style={{ borderBottomWidth: 1, borderColor: '#ffffff50', paddingBottom: 10 }}>
                    <Item title='Tietoa meistä' icon='info-circle' onPress={this.navigateToScreen('Home')} />
                    <Item title='Käyttöehdot' icon='handshake-o' onPress={this.navigateToScreen('Home')} />
                    <Item title='Ota yhteyttä' icon='envelope-o' onPress={this.navigateToScreen('Home')} />
                  </View>
                </View>
              </View>
            </View>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, paddingBottom: 30 }}>
              <TouchableOpacity onPress={() => { Linking.openURL('https://www.facebook.com/hurjasolutions/') }}>
                <FAIcon name={'facebook'} color="white" size={30}></FAIcon>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { Linking.openURL('https://www.instagram.com/hurjasolutions/') }}>
                <FAIcon name={'instagram'} color="white" size={30}></FAIcon>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { Linking.openURL('https://www.linkedin.com/company/hurja/') }}>
                <FAIcon name={'linkedin'} color="white" size={30}></FAIcon>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { Linking.openURL('https://twitter.com/hurjasolutions') }}>
                <FAIcon name={'twitter'} color="white" size={30}></FAIcon>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      //</View></TouchableWithoutFeedback>

    );


  }
}

DrawerScreen.propTypes = {
  navigation: PropTypes.object
};

const mapStateToProps = (state) => {
  const contact = state.user.contact
	return { contact }
};

export default connect(mapStateToProps, null) (DrawerScreen);