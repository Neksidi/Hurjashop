import { connect } from 'react-redux';
import React, { Component } from 'react';
import { TextInput, View, Button, StyleSheet, Text, ScrollView, Image, Dimensions, FlatList, TouchableHighlight, TouchableOpacity, ImageBackground, Button } from 'react-native';
import { searchForProduct } from '../../product/controllers/requests'
import { bindActionCreators } from 'redux';

import { theme, grid, app_style } from '../../../app/styles/global'


class Search extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchResults: [],
		}
	}
	static navigationOptions = {
		headerStyle: {
      backgroundColor: theme.color.navigation.background,
    },
    headerTitle: "Haku",
  };

	componentWillMount() {
	}

	componentWillUnmount() {
	}

	componentDidMount() {

	}

	renderItem = ({item, index}) => {
		if (item.empty === true) {
		  return <View style={[grid.item, grid.itemInvisible]} />;
		}
		return (
			<TouchableHighlight underlayColor={'#fff'} onPress={() => this.props.navigation.navigate('Product', { item: item })} style={[grid.item, {height: Dimensions.get('window').width / 2}]}>
					<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
						<Image style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: Dimensions.get('window').width / 2, height: Dimensions.get('window').width / 2}} source={{uri: item.images[0].src}} />
						{this.renderPrice(item)}
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

	searchProduct(text) {
		searchForProduct(text);
	}
		
	render() {

		let searchResults = 
		this.state.searchResults.length ? (
				<View>
					<Text style={app_style.front_item_title}>Haun tulokset:</Text>
					<FlatList 
						data={this.formatRow(this.props.categoryProducts, 2)}
						style={grid.container}
						renderItem={this.renderItem}
						numColumns={2}
					/>
				</View>

		) : (
			<View/>
		);

		return (
			<View>
				<View>
					<TextInput
						style={{height: 40}}
						onSubmitEditing={this.searchProduct} />
					<Button onPress={this.searchProduct}>Hae</Button>
				</View>

				<ScrollView>
						<View style={app_style.sliderContainer}>
								{searchResults}
						</View>
				</ScrollView>
			</View>
		);
	}
}



const mapStateToProps = (state) => {
	const { category } = state

	return { category }
};

const mapDispatchToProps = dispatch => (
	bindActionCreators({ }, dispatch));
	
export default connect(mapStateToProps, mapDispatchToProps)(Search);
