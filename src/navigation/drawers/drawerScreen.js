import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import PropTypes from 'prop-types';
import {ScrollView, Text, View, Button} from 'react-native';
import { DrawerActions } from 'react-navigation';

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
        source={require('../../assets/images/seppo.jpg')}
      />
    ),
  };

  render () {
    return (
      <View>
        <ScrollView>
          <View>
            <View>
              <Text onPress={this.navigateToScreen('Home')}>
                Home
              </Text>
            </View>
            <View>
              <Text onPress={this.navigateToScreen('Payment')}>
               Maksamaan
              </Text>
            </View>
            <View>
              <Text onPress={this.navigateToScreen('Profile')}>
              Mee profiiliin
              </Text>
              <Button
                onPress={() => this.props.navigation.goBack()}
                title="Testi - takaisin"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

DrawerScreen.propTypes = {
  navigation: PropTypes.object
};

export default DrawerScreen;