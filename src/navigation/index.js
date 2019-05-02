import React, { Component } from 'react'
import {createAppContainer} from 'react-navigation'
import MainNavigator from './navigators/mainNavigator' 


const AppContainer = createAppContainer(MainNavigator);

export default AppContainer;
