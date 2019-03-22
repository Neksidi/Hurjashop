import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, Button, Dimensions, ScrollView, He, IMage} from 'react-native';
import { bindActionCreators } from 'redux';

import { addContact, isLoggedIn } from '../redux/homeActions';
import Loader from '../../../app/components/common/loader/loader';
import Carousel from 'react-native-snap-carousel';
import Item from '../../../app/components/list/horizontal/item';
import { getProducts } from '../../product/controllers/requests'
import { setProducts } from '../../product/redux/productActions'
import { setNewProducts, setSaleProducts } from '../redux/homeActions';
import { getSaleProducts, getNewProducts } from '../controllers/helper'
import { app_style } from '../../../app/styles/global'
import Header from '../../../app/components/header/header'
import { styles, theme } from '../../../app/styles/global'
import CustomHeader from '../../../app/components/header/customHeader'



let { width, height } = Dimensions.get('screen');

class Home extends Component {
	constructor(props) {
		super(props);
	}

	static navigationOptions = {
		headerStyle: {
			backgroundColor: theme.color.navigation.background,
			height: theme.navigation.height,
		},
		headerTitle: <CustomHeader/>,
		headerLeft: (
			<View></View>
			//<Text style={{fontSize: 20, color:"white", right:-80}}>lolllllll</Text>
		  ),
		
	};


	componentWillMount() {
	}

	componentWillUnmount() {
	}

	componentDidMount() {
		if (!this.props.products.length) {
			getProducts(this.props);

			getNewProducts(this.props);
			getSaleProducts(this.props);

			//console.log(props.products);
			//console.log(props.saleProducts);

			/*
			if(this.props.products) {
				console.log(this.props.products);
				this.setState({
					saleProducts: getSaleProducts(this.props.products), 
					//newProducts: getNewProducts(this.props.products), 
				});
				console.log(this.state.saleProducts);
			}
			*/
		}
	}

	render() {


		let all =
		this.props.products ? (
			<ScrollView>
				<View style={app_style.sliderContainer}>
					<Text style={app_style.front_item_title}>Kaikki tuotteet</Text>
					<Carousel
						data={this.props.products}
						firstItem={(this.props.products - 1) / 2}
						keyExtractor={(item, index) => index.toString()}
						sliderWidth={width}
						itemWidth={width / 2 - 15}
						inactiveSlideOpacity={1}
						renderItem={({ item }) => (
							<Item data={item} onPress={() => this.props.navigation.navigate('Product', { item: item }) }/>
						)}
					/>
				</View>
			</ScrollView>
		) : (
			<Loader />
		);

		let sales =
		this.props.saleProducts ? (
			<ScrollView>
				<View style={app_style.sliderContainer}>
					<Text style={app_style.front_item_title}>Alennuksessa</Text>
					<Carousel
						data={this.props.saleProducts}
						firstItem={(this.props.saleProducts - 1) / 2}
						keyExtractor={(item, index) => index.toString()}
						sliderWidth={width}
						itemWidth={width / 2 - 15}
						inactiveSlideOpacity={1}
						renderItem={({ item }) => (
							<Item data={item} onPress={() => this.props.navigation.navigate('Product', { item: item }) }/>
						)}
					/>
				</View>
			</ScrollView>
		) : (
			<Loader />
		);

		let news =
		this.props.newProducts ? (
			<ScrollView>
				<View style={app_style.sliderContainer}>
						<Text style={app_style.front_item_title}>Uudet tuotteet</Text>
					<Carousel
						data={this.state.newProducts}
						firstItem={(this.state.newProducts - 1) / 2}
						keyExtractor={(item, index) => index.toString()}
						sliderWidth={width}
						itemWidth={width / 2 - 15}
						inactiveSlideOpacity={1}
						renderItem={({ item }) => (
							<Item data={item} onPress={() => this.props.navigation.navigate('Product', { item: item }) }/>
						)}
					/>
				</View>
			</ScrollView>
		) : (
			<Loader />
			
		);
			
		return (

			<View>
			

				<Header />

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
				{all}
				{sales}
				{news}
			</View>	
		);
	}
}


const mapStateToProps = (state) => {
	const { home } = state
	const products = state.products.all
	const newProducts = state.products.newProducts
	const saleProducts = state.products.saleProducts
	return { home, products, newProducts, saleProducts }
};

const mapDispatchToProps = dispatch => (
	bindActionCreators({ setProducts , setNewProducts, setSaleProducts }, dispatch));
	
export default connect(mapStateToProps, mapDispatchToProps)(Home);
