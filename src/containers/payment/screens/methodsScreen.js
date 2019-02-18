import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { bindActionCreators } from 'redux';

class Methods extends Component {
	constructor(props) {
		super(props);
	}

	static navigationOptions = {
		headerStyle: {
      backgroundColor: '#fcf',
    },
    headerTitle: "Maksutavat ja postitustavat",
    
  };


	render() {
		return (
			<View>
        <Text>Payment Methods</Text>
				
			</View>
		);
	}
}

export default (Methods);
