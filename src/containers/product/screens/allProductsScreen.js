import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { bindActionCreators } from 'redux';
import { getProducts } from '../controllers/requests'

class AllProducts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true
		}
	}

	static navigationOptions = {
		headerStyle: {
      backgroundColor: '#fcf',
    },
    headerTitle: "Kaikki tuotteet",
    headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
				color="green"
      />
    ),
  };

	componentWillMount() {
		var products = getProducts();
		console.log(products)
	}

	componentWillUnmount() {
	}

	componentDidMount() {
	}

	render() {
		if(this.state.isLoading){
			return (
				<View>
        <Text>Loading</Text>
			</View>
			)
		}
		else {
			return (
				<View>
					<Text>All products</Text>
				</View>
			);
		}
	}
}

export default (AllProducts);
