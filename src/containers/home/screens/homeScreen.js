import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, Button, Dimensions, ScrollView, He, Image, ImageBackground,  FlatList, TouchableHighlight } from 'react-native';
import { bindActionCreators } from 'redux';

import { Loader } from '../../../app/components/common/loader/loader';
import Carousel from 'react-native-snap-carousel';
import Item from '../../../app/components/list/horizontal/item';
import { getCategories } from '../../category/controller/requests'
import { setCategories } from '../../category/redux/categoryActions'

import { getProducts } from '../../product/controllers/requests'
import { setProducts } from '../../product/redux/productActions'

import { getSaleProducts, getNewProducts } from '../controllers/helper'
import Header from '../../../app/components/header/header'
import { app_style, theme, grid, styles, primaryGradientColors , boxHeight, boxWidth, textBoxHeight } from '../../../app/styles/global'
import CustomHeader from '../../../app/components/header/customHeader'
import LinearGradient from 'react-native-linear-gradient';
//import { setLoginStatus } from '../../../containers/profile/redux/userActions'		//TODO: Remove this Debug

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allProducts: [],
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
		//this.props.setLoginStatus(true);		//TODO: REMOVE THIS DEBUG
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
	}

	renderItem = ({item, index}) => {

		if (item.empty === true) {
			return <View style={[grid.item, grid.itemInvisible]} />;
		  }
		  return (
			  <TouchableHighlight underlayColor="#ffffff00" key={index} onPress={() => this.props.navigation.navigate('Category', { category: item })} style={[grid.item, {height : boxHeight, backgroundColor: theme.color.bg.main}]}>
				<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height : boxHeight}}>
						<Image style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: boxWidth, height: boxHeight, resizeMode: 'cover'}} source={{uri: item.image.src}} />
				</View>
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

	renderPrice(item){
		const priceStyle = {
		  fontFamily: 'BarlowCondensed-Regular',
		  fontSize: 18,
		}
	
		if(item.attributes.length > 0){
	
		  let prices = item.price_html.replace(/<[^>]*>?/gm, '').split(' ');
		  for(i in prices){
			prices[i] = prices[i].replace('&nbsp;&euro;', '');
		  }
	
		  if(prices.length === 2){
			return(
			  <View style={{ flexDirection: 'row'}}><Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontSize: 20}}>
				{ this.priceToString(prices[0]) }€ </Text><Text style={ priceStyle }> {this.priceToString(prices[1])}€ </Text></View>
			);
		  }
		}
		if(item.sale_price != ''){
		  return <View style={{ flexDirection: 'row'}}><Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontSize: 20}}>
			{ this.priceToString(item.regular_price) }€ </Text><Text style={ priceStyle }>{this.priceToString(item.sale_price)}€ </Text></View>
		} else {
		  return <Text style={ priceStyle }>{this.priceToString(item.price)}€</Text>
		}
	  }
	
	  priceToString(price) {
		return parseFloat(price).toFixed(2).toString().replace('.', ',');
	  }

	render() {

		let all =
		this.props.products ? (
			this.props.products.map((item, i) => {
				return (
					<TouchableHighlight underlayColor="#ffffff00" key={i} onPress={() => this.props.navigation.navigate('Product', { item: item })} style={[grid.item, {height : boxHeight + textBoxHeight}]}>
					<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
						<View style={{height : boxHeight}}>
							<Image style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: boxWidth, height: boxHeight, resizeMode: 'cover'}} source={{uri: item.images[0].src}} />
						</View>
						<View style={{height:textBoxHeight, flex:1}}>
							<Text style={{ fontFamily: 'BarlowCondensed-Bold', fontSize: 20, }}>{ item.name }</Text>
							{this.renderPrice(item)}
						</View>
					</View>
				</TouchableHighlight>
				)
			})
		) : (
			<Loader />
		);

		let sales =
		this.state.saleProducts ? (
			this.state.saleProducts.map((item, i) => {
				return (
					<TouchableHighlight underlayColor="#ffffff00" key={i} onPress={() => this.props.navigation.navigate('Product', { item: item })} style={[grid.item, {height : boxHeight + textBoxHeight}]}>
					<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
						<View style={{height : boxHeight}}>
							<Image style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: boxWidth, height: boxHeight, resizeMode: 'cover'}} source={{uri: item.images[0].src}} />
						</View>
						<View style={{height:textBoxHeight, flex:1}}>
							<Text style={{ fontFamily: 'BarlowCondensed-Bold', fontSize: 20, }}>{ item.name }</Text>
							{this.renderPrice(item)}
						</View>
					</View>
				</TouchableHighlight>
				)
			})
		) : (
			<Loader />
		);

		/*let news =
		this.state.newProducts ? (
			this.state.newProducts.map((item, i) => {
				return (

					<TouchableHighlight key={i}  underlayColor={'#fff'} onPress={() => this.props.navigation.navigate('Product', { item: item })} style={[grid.item, {height: Dimensions.get('window').width / 2}]}>
						<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
							<Image style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: Dimensions.get('window').width / 2, height: Dimensions.get('window').width / 2}} source={{uri: item.images[0].src}} />
							{this.renderPrice(item)}

						</View>
					</TouchableHighlight>
				)
			})

		) : (
			<Loader />
		);
		*/

		let productCategories = 
		this.props.categories ? (
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
					title="Kategoriaan"
					onPress={() =>
						this.props.navigation.navigate('Category')
					}
				/>
				*/
				
				}
					<LinearGradient 
						start={{x: 0, y: 0}} end={{x: 1, y: 1}}
						colors={primaryGradientColors} 
						style={styles.linearGradient}>
						<View style={app_style.sliderContainer}>
							<Text style={app_style.front_item_title}>Kaikki tuotteet:</Text>
								<ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
									{all}
								</ScrollView>
						</View>

						<View style={app_style.sliderContainer}>
							<Text style={app_style.front_item_title}>Alennustuotteet:</Text>
							<ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
								{sales}
							</ScrollView>
						</View>

						{/*
						<View style={app_style.sliderContainer}>
							<Text style={app_style.front_item_title}>Uudet tuotteet:</Text>
							<ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
							{news}
							</ScrollView>
						</View>
						*/}

						<View style={app_style.sliderContainer}>
							<Text style={app_style.front_item_title}>Tuotekategoriat:</Text>
							{productCategories}
						</View>
					</LinearGradient>
				</ScrollView>
			</View>	
			
		);
	}
}


const mapStateToProps = (state) => {
	const products = state.products.all
	const categories = state.categories.all;
	return { products , categories }
};

const mapDispatchToProps = dispatch => (
	bindActionCreators({ setProducts, setCategories, getCategories, /*setLoginStatus*/ }, dispatch));		//TODO: Remove setLoginStatus Debug
	
export default connect(mapStateToProps, mapDispatchToProps)(Home);
