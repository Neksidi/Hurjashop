import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Navigation from './navigators'
import ShopReducer from './redux/shopreducer'

//import fetchMiddleware from './redux/middleware/fetchMiddleware'

const store = createStore(ShopReducer);

/**
 * Redux related comments like store can be enabled when redux is implemented!
 */

export default class App extends Component {
  render() {
    return (
    <Provider store={store}>
	  	<Navigation />
	  </Provider>
	  
    );
  }
}

AppRegistry.registerComponent('App', () => App);
