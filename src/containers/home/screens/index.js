import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { bindActionCreators } from 'redux';
import { addProduct } from '../redux/productActions'

class Home extends Component {
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
                <Text>Welcome Home!</Text>
				{
          			this.props.products.possible.map((product, index) => {
									const button = <Button
              				key={ product }
              				title={  product  }
              				onPress={() =>
												this.props.addProduct("Uusi " + product)
              				}
            			/>
						return button;
						})
				}
				{
					this.props.products.current.map((product, index) => {
						return <Text key={ product }>
							{product} { index }
						</Text>
					})
				}
				<Button 
					title="Avaa Drawer"
					onPress={() =>
						this.props.navigation.toggleDrawer()
					}
				/>
				<Button 
					title="Mainiin"
					onPress={() =>
						this.props.navigation.navigate('Main')
					}
				/>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	const { products } = state
	return { products }
};

const mapDispatchToProps = dispatch => (
	bindActionCreators({ addProduct }, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Home);
