import React, { Component } from 'react'
import {createStackNavigator, createDrawerNavigator, createAppContainer} from 'react-navigation'
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'
import Tab from '../navigators/tab'
import PaymentStack from '../navigators/stacks/paymentStack'
import LoginStack from '../navigators/stacks/loginStack'
import infoStack from '../navigators/stacks/infoStack'
import DrawerScreen from '../../containers/drawer/screens/drawerScreen' 
import CustomHeader from '../../app/components/header/customHeader'
// 

const MainNavigator = createDrawerNavigator({
	Tab: { screen: Tab },
	PaymentProcess: { screen: PaymentStack },
	LoginProcess: { screen: LoginStack },
	Info: { screen: infoStack },
},{
	defaultNavigationOptions: {
		headerTitle: <CustomHeader/>,
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
