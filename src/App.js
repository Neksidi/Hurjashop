import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, StatusBar} from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Navigation from './navigation'
import Reducers from './app/redux/reducers'
import NavigationService from './navigation/navigators/NavigationService';

//import fetchMiddleware from './redux/middleware/fetchMiddleware'

const store = createStore(Reducers);

/**
 * Redux related comments like store can be enabled when redux is implemented!
 */

export default class App extends Component {
  render() {
    return (
      <View>
      <StatusBar backgroundColor="blue" barStyle="light-content">
        <Provider store={store}>
          <Navigation 
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        </Provider>
      </StatusBar>
      </View>

	  
    );
  }
}

AppRegistry.registerComponent('App', () => App);
