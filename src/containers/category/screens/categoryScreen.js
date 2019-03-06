import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { bindActionCreators } from 'redux';
import { theme } from '../../../app/styles/global'
//import CustomHeader from '../../../app/components/header/customHeader'
class Category extends Component {
	constructor(props) {
		super(props);
	}

	static navigationOptions = {
		headerStyle: {
      backgroundColor: theme.color.navigation.background,
    },
    headerTitle: "Kategoria", //<CustomHeader/>
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
        <Text>Products by category</Text>
				<Button 
					title="Tuotesivulle"
					onPress={() =>
						this.props.navigation.navigate('Product')
					}
				/>
			</View>
		);
	}
}

export default (Category);
