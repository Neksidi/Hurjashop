import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, Button, Dimensions, ScrollView} from 'react-native';
import { bindActionCreators } from 'redux';
import { addProduct } from '../redux/homeActions'
import { readProducts, addContact, isLoggedIn } from '../redux/homeActions';
import Loader from '../../../app/components/common/loader/loader';
import Carousel from 'react-native-snap-carousel';
import { WEB_URL} from '../../../app/redux/actionTypes';
import Item from '../../../app/components/list/horizontal/item';
import getProducts from '../../product/controllers/requests'
import { setProducts } from '../../product/redux/productActions'

let { width, height } = Dimensions.get('screen');

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

	async componentDidMount() {
		if(!this.props.products.length) {
			const products = await getProducts();
			this.props.setProducts(products)		
		}
	}

	render() {


		let output =
		this.props.products ? (

			
			/*<Carousel
				data={this.props.products}
				firstItem={(this.props.products.length - 1) / 2}
				keyExtractor={(item, index) => index.toString()}
				sliderWidth={width}
				itemWidth={width / 2 - 15}
				inactiveSlideOpacity={1}
				renderItem={({ item }) => (
					<Item data={item} onPress={() => this.props.navigation.navigate('Product', { item: item }) }/>
				)}
			/>*/
			<View>
				<Text>Tuotteet</Text>
				{
					this.props.products.map((product, index) => {
						return <Text key={product.id}>{product.name}</Text>
					})
				}
			</View>
			
		) : (
			<Loader />
		);

		let test = 
		this.props.products ? (
			<Text>True!</Text>
		) : (
			<Text>False!</Text>
		);
			
		
		
		return (
			<View>
				<Button 
					title="Kaikki tuotteet"
					onPress={() =>
						this.props.navigation.navigate('AllProducts')
					}
				/>
				<Button 
					title="Tutoriaaliin"
					onPress={() =>
						this.props.navigation.navigate('Tutorial')
					}
				/>
				<Button 
					title="Kategoriaan"
					onPress={() =>
						this.props.navigation.navigate('Category')
					}
				/>
				
				{output}
				{test}

			</View>
		);
		
		
	}
}


const mapStateToProps = (state) => {
	const { home } = state
	const products = state.products.all
	return { home, products}
};

const mapDispatchToProps = dispatch => (
	bindActionCreators({ readProducts, setProducts }, dispatch));
	
export default connect(mapStateToProps, mapDispatchToProps)(Home);
