import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, Dimensions, TouchableOpacity, ImageBackground, Button } from 'react-native';
import { newCardPayment, existingCardPayment } from '../controllers/paymentController'


class Payment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//TODO: change to true when loading function is working
			isLoading: false,
			data: null,
			categories: null,
			isPaid: false,
			isCancelled: false,
			isLoading: false,
			token: "asd"
		};
    }

    render() {
		return (
			<View>
                <Text>Pay pls</Text>
				<Button
				title="New card"
				onPress={() => { newCardPayment(1234, "Test order") }}
				>
				</Button>
				<Button
				title="Existing card"
				onPress={() => { existingCardPayment(1234, this.state.token) }}
				>
				</Button>
			</View>
		);
	}
}

export default 
/*connect(
	map_state_props,
	map_dispach_props
)
*/(Payment);
