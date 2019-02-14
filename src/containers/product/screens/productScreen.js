import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { bindActionCreators } from 'redux';

class Product extends Component {
	constructor(props) {
		super(props);
	}

	static navigationOptions = {
		headerStyle: {
      backgroundColor: '#fcf',
    },
    headerTitle: "Koti",
    headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
				color="green"
      />
    ),
  };

	componentWillMount() {
	}

	componentWillUnmount() {
	}

	componentDidMount() {
	}

	render() {
		return (
			<View>
                <Text>Single product</Text>
			</View>
		);
	}
}

export default (Product);
