import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Navigation from './navigation'
import Reducers from './app/redux/reducers'
import NavigationService from './navigation/navigators/NavigationService';
import {name as appName} from '../app.json';
//import fetchMiddleware from './redux/middleware/fetchMiddleware'

const store = createStore(Reducers);

/**
 * Redux related comments like store can be enabled when redux is implemented!
 */

export default class App extends Component {
  render() {
    return (
    <Provider store={store}>
      <Navigation 
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
	  </Provider>
	  
    );
  }
}

AppRegistry.registerComponent(appName, () => App);
