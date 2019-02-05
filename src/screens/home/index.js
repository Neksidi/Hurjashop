import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//TODO: change to true when loading function is working
			isLoading: false,
			data: null,
			categories: null
		};
	}

	componentWillMount() {
	}

	componentWillUnmount() {
	}

	componentDidMount() {
    }
	render() {
		return (
			<View>
                <Text>Welcome Home!</Text>
			</View>
		);
	}
}

export default 
(Index);
