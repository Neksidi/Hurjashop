import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { bindActionCreators } from 'redux';
import { setProducts } from '../redux/productActions'
import getProducts from '../controllers/requests'

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
	}

	componentWillUnmount() {
	}

	async componentDidMount() {
		if(!this.props.products.length > 0) {
			const products = await getProducts();
			console.log(products)
			this.props.setProducts(products)
		}
	}

	render() {
		//console.log(this.props.products)				//	Debug fetched products by uncommenting this										
		
		if(!this.props.products){
			return (
				<View>
        	<Text>Loading animation here</Text>
				</View>
			)
		}
		else {
			return (
				<View>
					<Text>Tuotteet</Text>
					{
						this.props.products.map((product, index) => {
							return <Text key={product.id}>{product.name}</Text>
						})
					}
				</View>
			);
		}
	}
}

const mapStateToProps = (state) => {
	const products = state.products.all
	return { products }
};

const mapDispatchToProps = dispatch => (
	bindActionCreators({ setProducts }, dispatch));

export default connect(mapStateToProps, mapDispatchToProps) (AllProducts);
