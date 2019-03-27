import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, Button, Dimensions, ScrollView, He, Image, FlatList, TouchableHighlight } from 'react-native';
import { bindActionCreators } from 'redux';

import Loader from '../../../app/components/common/loader/loader';
import Carousel from 'react-native-snap-carousel';
import Item from '../../../app/components/list/horizontal/item';
import { getCategories } from '../../category/controller/requests'
import { setCategories } from '../../category/redux/categoryActions'

import { getProducts } from '../../product/controllers/requests'
import { setProducts } from '../../product/redux/productActions'

import { getSaleProducts, getNewProducts } from '../controllers/helper'
import { app_style } from '../../../app/styles/global'
import Header from '../../../app/components/header/header'
import { theme, grid } from '../../../app/styles/global'
import CustomHeader from '../../../app/components/header/customHeader'

let { width, height } = Dimensions.get('screen');

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			saleProducts: [],
			newProducts: [],
		  }
	}

	static navigationOptions = {
		headerStyle: {
			backgroundColor: theme.color.navigation.background,
			height: theme.navigation.height,
		},
		headerTitle: <CustomHeader/>,
		headerLeft: (
			<View></View> //needed to justify logo in center
		
		  ),
		
	};


	componentWillMount() {
	}

	componentWillUnmount() {
	}

	componentDidMount() {
		if (!this.props.products.length) {
			getProducts(this.props);		
		}

		if(!this.props.categories.length) {
			getCategories(this.props);
		}
	}

	componentDidUpdate() {
		if(this.props.products.length) {
			if(!this.state.saleProducts.length || !this.state.newProducts.length) {
				this.setState(
					{
						saleProducts : getSaleProducts(this.props.products), 
						newProducts : getNewProducts(this.props.products),
					}
				);
			}
		}
		console.log("start");
		console.log(this.props.categories);
		console.log("end");
	}

	renderItem = ({item, index}) => {
		if (item.empty === true) {
		  return <View style={[grid.item, grid.itemInvisible]} />;
		}
		return (
		  	<TouchableHighlight underlayColor = {theme.color.hurja.dark} onPress={() => this.props.navigation.navigate('Category', { item: item })} style={[grid.item, {backgroundColor:theme.color.hurja.main, height: Dimensions.get('window').width / 2}]}>
				<Text style={grid.itemText}>{item.name}</Text>
			</TouchableHighlight>
		);
	}

	formatRow = (data, numColumns) => {
		const numberOfFullRows = Math.floor(data.length / numColumns);
		let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
		while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
		  data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
		  numberOfElementsLastRow++;
		}
		return data;
	}

	render() {

		let all =
		this.props.products ? (
			
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
		) : (
			<Loader />
		);

		let sales =
		this.state.saleProducts ? (
			<Carousel
				data={this.state.saleProducts}
				firstItem={(this.state.saleProducts - 1) / 2}
				keyExtractor={(item, index) => index.toString()}
				sliderWidth={width}
				itemWidth={width / 2 - 15}
				inactiveSlideOpacity={1}
				renderItem={({ item }) => (
					<Item data={item} onPress={() => this.props.navigation.navigate('Product', { item: item }) }/>
				)}
			/>
		) : (
			<Loader />
		);

		let news =
		this.state.newProducts ? (
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

		) : (
			<Loader />
		);

		
		  
		

		let productCategories = 
		this.props.categories ? (
			/*
			  <FlatList
       
				data={ this.props.categories }
				renderItem={({item}) => 
				
					<View onPress={() => this.props.navigation.navigate('Category', { item: item })} style={{flex:1, flexDirection: 'row', width:'100%', alignSelf: 'center'}}>
						<Image source = {{ uri: item.image.src }} style={theme.imageView} />
						<Text style={theme.textView}>{item.name}</Text>
					</View>
				}

				keyExtractor={(item, index) => index.toString()}
				*/
				<FlatList 
					data={this.formatRow(this.props.categories, 2)}
					style={grid.container}
					renderItem={this.renderItem}
					numColumns={2}
				/>

		) : (
			<Loader />
		);
		
		return (

			<View>
			
				<ScrollView>
				<Header />
				{ /*
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
				*/}
				
						<View style={app_style.sliderContainer}>
							<Text style={app_style.front_item_title}>Kaikki tuotteet</Text>
							{all}
						</View>

						<View style={app_style.sliderContainer}>
							<Text style={app_style.front_item_title}>Alennustuotteet</Text>
							{sales}
						</View>

						<View style={app_style.sliderContainer}>
							<Text style={app_style.front_item_title}>Uudet tuotteet</Text>
							{news}
						</View>

						<View style={app_style.sliderContainer}>
							<Text style={app_style.front_item_title}>Tuote kategoriat</Text>
							{productCategories}
						</View>
				</ScrollView>

			</View>	
		);
	}
}


const mapStateToProps = (state) => {
	const { home } = state
	const products = state.products.all
	const categories = state.categories.all;
	return { home, products , categories }
};

const mapDispatchToProps = dispatch => (
	bindActionCreators({ setProducts, setCategories }, dispatch));
	
export default connect(mapStateToProps, mapDispatchToProps)(Home);
