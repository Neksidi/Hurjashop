import React, { Component } from 'react'
import HomeScreen from '../../screens/home'
import SearchScreen from '../../screens/search'
import ProfileScreen from '../../screens/profile'
import {createBottomTabNavigator} from 'react-navigation'
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'

const icon_size = 20;

const Tab = createBottomTabNavigator({
	Profile: {
		screen: ProfileScreen,
		navigationOptions: () => ({
			secure: false,
			tabBarIcon: ({tintColor}) => (
				<FAIcon name='home' color={tintColor} size={icon_size} />
			),
			tabBarLabel: "Oma tili",
		})
	},
	Home: {
		screen: HomeScreen,
		navigationOptions: () => ({
			secure: false,
			tabBarIcon: ({tintColor}) => (
				<FAIcon name='home' color={tintColor} size={icon_size} />
			),
		})
	},
	Search: {
		screen: SearchScreen,
		navigationOptions: () => ({
			secure: false, 
			tabBarIcon: ({tintColor}) => (
				<FAIcon name='home' color={tintColor} size={icon_size} />
			),
			tabBarLabel: "Haku",
		})

	},
}, {
	lazy: true,
	initialRouteName: 'Home',
	navigationOptions: ({navigation}) => {
		return {
			header: null
		}
	},
	tabBarOptions: {
		showIcon: true,
		showLabel: true,
		upperCaseLabel: false,
		labelStyle: {
			fontSize: 15
		},
		inactiveTintColor: '#222',
		style: {
			paddingTop: 5,
		}
	},
	animationEnabled: true,
	tabBarPosition: 'bottom'
})

export default Tab;
