import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';


class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//TODO: change to true when loading function is working
			isLoading: false,
			data: null,
			categories: null
		};
    }

    render() {
		return (
			<View>
                <Text>Shopping cart</Text>
			</View>
		);
	}
}

export default 
/*connect(
	map_state_props,
	map_dispach_props
)
*/(Cart);
