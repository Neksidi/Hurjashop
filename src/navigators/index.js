import React, { Component } from 'react'
import HomeScreen from '../screens/home'
import SearchScreen from '../screens/search'
import ProfileScreen from '../screens/profile'
import {createStackNavigator, createDrawerNavigator, createAppContainer} from 'react-navigation'
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'
import DrawerScreen from './Drawers/DrawerScreen';
import Tab from './Tab'

const DrawerNavigator = createDrawerNavigator({
	Home: {
		screen: Tab
	}
},{
	InitialRouteName: 'Home',
	contentComponent: DrawerScreen,
	drawerWidth: 300
});

const StackNavigator = createStackNavigator({
    //important: key and screen name (i.e. DrawerNavigator) should be same while using the drawer navigator inside stack navigator.
    DrawerNavigator:{
        screen: DrawerNavigator
    }
});

const AppContainer = createAppContainer(StackNavigator);

export default AppContainer;
