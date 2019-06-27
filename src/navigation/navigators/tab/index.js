import React, { Component } from 'react'
import HomeStack from '../stacks/homeTabStack'
import SearchStack from '../stacks/searchTabStack'
import ProfileStack from '../stacks/profileTabStack'
import {createBottomTabNavigator} from 'react-navigation'
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'
import { theme } from '../../../app/styles/global'
import CustomTabBar from '../../../app/components/tab/customTabBar'
import CustomProfileTabButton from '../../../app/components/tab/customProfileTabButton'

const icon_size = 20;

const Tab = createBottomTabNavigator({
	Profile: {
		screen: ProfileStack,
		navigationOptions: () => ({
			secure: false,
			tabBarIcon: <CustomProfileTabButton />,
			//tabBarLabel: "Oma tili",
			showLabel: false
		})
	},
	Homeroute: {
		screen: HomeStack,
		navigationOptions: () => ({
			secure: false,
			tabBarIcon: ({tintColor}) => (
				<FAIcon name='home' color={tintColor} size={icon_size} />
			),
		})
	},
	Search: {
		screen: SearchStack,
		navigationOptions: () => ({
			secure: false, 
			tabBarIcon: ({tintColor}) => (
				<FAIcon name='home' color={tintColor} size={icon_size} />
			),
			tabBarLabel: "Haku",
		})
	},
}, {
	tabBarComponent: CustomTabBar,
	lazy: true,
	initialRouteName: 'Homeroute',
	/*navigationOptions: ({navigation}) => {
		return {
			header: null
		}
	},*/
	tabBarOptions: {
		showIcon: true,
		showLabel: false,
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
