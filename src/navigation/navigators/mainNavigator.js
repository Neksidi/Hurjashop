import React, { Component } from 'react'
import {createStackNavigator, createDrawerNavigator, createAppContainer} from 'react-navigation'
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'
import Tab from '../navigators/tab'
import PaymentStack from '../navigators/stacks/paymentStack'
import DrawerScreen from '../../containers/drawer/screens/drawerScreen' 
// 

const MainNavigator = createDrawerNavigator({
	Tab: { screen: Tab },
	PaymentProcess: { screen: PaymentStack }
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



export default MainNavigator;
