import React, { Component } from 'react'
import {createAppContainer} from 'react-navigation'
import MainNavigator from './navigators/mainNavigator' 

/*
 * Navigation redux stuff is added here if needed
 *
 */

const AppContainer = createAppContainer(MainNavigator);

export default AppContainer;
