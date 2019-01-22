import React, { Component } from 'react'
import Example1Stack from '../Stacks/Stack1/'
import Example2Stack from '../Stacks/Stack2'
import Example3Stack from '../Stacks/Stack3/'
import {createBottomTabNavigator} from 'react-navigation'
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'

const icon_size = 20;

var Tab = createBottomTabNavigator({
	Search: {
		screen: Example1Stack,
		navigationOptions: () => ({
			secure: false, 
			tabBarIcon: ({tintColor}) => (
				<FAIcon name='home' color={tintColor} size={icon_size} />
			),
			tabBarLabel: trans('navigation.search'),
		})

	},
	Home: {
		screen: Example2Stack,
		navigationOptions: () => ({
			secure: false,
			tabBarIcon: ({tintColor}) => (
				<FAIcon name='home' color={tintColor} size={icon_size} />
			),
			tabBarLabel: trans('navigation.home'),
		})
	},
	Profile: {
		screen: Example3Stack,
		navigationOptions: () => ({
			secure: false,
			tabBarIcon: ({tintColor}) => (
				<FAIcon name='home' color={tintColor} size={icon_size} />
			),
			tabBarLabel: trans('navigation.profile'),
		})
	}
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
		activeTintColor: theme.color.highlight.main,
		indicatorStyle: {
			backgroundColor: theme.color.bg.main
		},
		style: {
			paddingTop: 5,
	  		backgroundColor: theme.color.bg.main
		}
	},
	animationEnabled: true,
	tabBarPosition: 'bottom'
})

export default Tab