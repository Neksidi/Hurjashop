/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';
//import { createStore, applyMiddleware } from 'redux'
//import { Provider } from 'react-redux'
import Navigation from './navigators'
//import AppReducer from './redux'

//import fetchMiddleware from './redux/middleware/fetchMiddleware'

//const store = createStore(AppReducer, applyMiddleware(fetchMiddleware));

/**
 * Redux related comments like store can be enabled when redux is implemented!
 */

export default class App extends Component {
  render() {
    return (
    //<Provider store={store}>
	  	<Navigation />
	  //</Provider>
	  
    );
  }
}

AppRegistry.registerComponent('App', () => App);
