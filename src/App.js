import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, StatusBar} from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Navigation from './navigation'
import Reducers from './app/redux/reducers'
import NavigationService from './navigation/navigators/NavigationService';
import SplashScreen from 'react-native-splash-screen';

//import fetchMiddleware from './redux/middleware/fetchMiddleware'

const store = createStore(Reducers);

/**
 * Redux related comments like store can be enabled when redux is implemented!
 */

export default class App extends Component {
  componentDidMount(){
    console.log("DidMount")
    SplashScreen.hide();
  }
  render() {
    return (
      <StatusBar backgroundColor="blue" barStyle="light-content">
        <Provider store={store}>
          <Navigation 
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        </Provider>
      </StatusBar>  
    );
  }
}

AppRegistry.registerComponent('App', () => App);
