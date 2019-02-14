import React, { Component } from 'react'
import {createStackNavigator, createDrawerNavigator, createAppContainer} from 'react-navigation'
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'
import Tab from '../tab'
import MainNavigator from '../stacks'
import DrawerScreen from '../drawers/drawerScreen' 
// 

const Drawer = createDrawerNavigator({
	Tab: { screen: Tab },
	Main: { screen: MainNavigator }
},{
	navigationOptions: {
		header: null
	},
	contentComponent: DrawerScreen,
	InitialRouteName: 'Tab'
});

/*
const StackNavigator = createStackNavigator({
    //important: key and screen name (i.e. DrawerNavigator) should be same while using the drawer navigator inside stack navigator.
    DrawerNavigator:{
        screen: DrawerNavigator
    }
});
*/

const AppContainer = createAppContainer(Drawer);

export default AppContainer;
