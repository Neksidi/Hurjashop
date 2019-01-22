import React, { Component } from 'react'
import { View } from 'react-native'
// React navigation
import { createStackNavigator, createSwitchNavigator, createMaterialTopTabNavigator } from 'react-navigation'
// Screens
import SearchScreen from '../../../screens/search'
import Screen2 from '../../../screens/profile/someRandomName.js'
import ProfileScreen from '../../../screens/profile'

// Custom component(s)
//Aika haastavaa tehdä custom tab näin alkuun, voi kokeilla myöhemmin: import CustomTabBar from '../../../components/common/navigation/custom/TabBar'
//Tähän tapaan esimerkiksi omat tyylit komponenteille import { theme, container } from '../../../styles/Global'

const TabNav = createMaterialTopTabNavigator({
  Search: {
    screen: SearchScreen,
    navigationOptions: () => ({
      tabBarLabel: 'Search',
    })
  },
  Test: {
    screen: Screen2,
    navigationOptions: () => ({
      tabBarLabel: 'Test',
    })
  },
  ShoppingCart: {
    screen: Screen2,
    navigationOptions: () => ({
      tabBarLabel: 'Profiili',
    })
  },
}, {
  lazy: false,
  showLabel: true,
  backBehavior: true,
  swipeEnabled: false,
  tabBarPosition: 'top',
  animationEnabled: true,
  //tabBarComponent: CustomTabBar,
})

const Stack = createStackNavigator({
    Tab: { screen: TabNav, navigationOptions: { header: null } },
    Profile: { screen: ProfileScreen },
}, {
	initialRouteName: 'Tab'
})

Stack.navigationOptions = ({ navigation }) => {
  return {
    tabBarVisible: navigation.state.index === 0,
	}
}

export default Stack