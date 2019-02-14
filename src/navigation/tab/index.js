import React, { Component } from 'react'
import HomeScreen from '../../containers/home/screens'
import SearchScreen from '../../containers/search/screens'
import ProfileScreen from '../../containers/profile/screens'
import {createBottomTabNavigator} from 'react-navigation'
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'
import { theme } from '../../app/styles/Global'
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
		inactiveTintColor: '#FFFFFF',
		style: {
			paddingTop: 5,
			backgroundColor:'#e80d0d'
		}
	},
	animationEnabled: true,
	tabBarPosition: 'bottom'
})

export default Tab;
