import React from 'react'
import {createStackNavigator, createDrawerNavigator, createAppContainer} from 'react-navigation'
import { createBundleRenderer } from 'react-navigation'
import HomeScreen from '../../containers/home/screens'
import PaymentScreen from '../../containers/payment/screens'
import ProfileScreen from '../../containers/profile/screens'
import DrawerScreen from '../drawers/drawerScreen'


const Drawer = createDrawerNavigator({
  Home: {
    screen: HomeScreen,
  },
  Profile: {
    screen: ProfileScreen,
  },
  Payment: PaymentScreen
}, {
  navigationOptions: {   
    header: null            
  },
  contentComponent: DrawerScreen        
});

export default Drawer