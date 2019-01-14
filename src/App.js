/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
//import Navigation from './navigation'
import AppReducer from './redux'

import fetchMiddleware from './redux/middleware/fetchMiddleware'

const store = createStore(AppReducer, applyMiddleware(fetchMiddleware));

export default class App extends Component {
  render() {
    return (
      /*<Provider store={store}>
	  	<Navigation />
	  </Provider>
	  */
	 <View>
		 <Text>Hello World</Text>
	 </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('App', () => App);
