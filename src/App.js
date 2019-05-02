import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Navigation from './navigation'
import Reducers from './app/redux/reducers'
import NavigationService from './navigation/navigators/NavigationService';


const store = createStore(Reducers);



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

AppRegistry.registerComponent('App', () => App);
