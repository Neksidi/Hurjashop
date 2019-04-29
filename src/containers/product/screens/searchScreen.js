import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Keyboard, TextInput, View, Button, StyleSheet, Text, ScrollView, Image, Dimensions, FlatList, TouchableHighlight, TouchableOpacity, ImageBackground } from 'react-native';
import { searchForProduct } from '../controllers/requests'
import { bindActionCreators } from 'redux';
import { primaryGradientColors, primaryGradientColorsButton, theme, grid, app_style, styles, boxHeight, boxWidth, textBoxHeight } from '../../../app/styles/global'
import CustomHeader from '../../../app/components/header/customHeader'
import LinearGradient from 'react-native-linear-gradient';
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'


class Search extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchText: '',
			searchResults: [],
		}
	}

	static navigationOptions = {
		headerStyle: {
			backgroundColor: theme.color.navigation.background,
			height: theme.navigation.height,
		},
		headerTitle: <CustomHeader small={true}/>,
		backgroundColor: theme.color.hurja.main,
		headerTintColor: 'white',
		headerLeft: (
			<View></View> //needed to justify logo in center
		
		),
  };

	componentWillMount() {
	}

	componentWillUnmount() {
	}

	componentDidMount() {

	}

	async search() {
		var results = await searchForProduct(this.state.searchText)
		console.log("Results in searchScreen");
		console.log(results);
		this.setState({searchResults: results})
		console.log("Search state");
		console.log(this.state.searchResults)
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


	renderItem = ({item, index}) => {
		if (item.empty === true) {
		  return <View style={[grid.item, grid.itemInvisible]} />;
		}
		return (
			<TouchableHighlight underlayColor="#ffffff00" key={index} onPress={() => this.props.navigation.navigate('Product', { item: item })} style={[grid.item, {height : boxHeight + textBoxHeight}]}>
						<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
							<View style={{height : boxHeight}}>
								<Image style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: boxWidth, height: boxHeight, resizeMode: 'cover'}} source={{uri: item.images[0].src}} />
							</View>
							<View style={{height:textBoxHeight}}>
								<Text style={{ fontFamily: 'BarlowCondensed-Bold', fontSize: 20, }}>{ item.name }</Text>
								{this.renderPrice(item)}
							</View>
						</View>
					</TouchableHighlight>
		);


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

	_handleSubmit() {
		console.log(this.state.username);
		console.log(this.state.password);
 }
		
	render() {

		let searchResults = 
		this.state.searchResults.length ? (
				<View>
					<FlatList 
						data={this.formatRow(this.state.searchResults, 2)}
						style={grid.container}
						renderItem={this.renderItem}
						numColumns={2}
					/>
				</View>

		) : (
			<View/>
		);

		let headerResults = this.state.searchResults.length ? (
			<Text style={app_style.front_item_title}>Haun tulokset:</Text>
		) : (
			<View/>
		);

		return (
			<LinearGradient 
				start={{x: 0, y: 0}} end={{x: 1, y: 1}}
				colors={primaryGradientColors} 
				style={[styles.linearGradient, theme.inputScreenContainer, {height:'100%'}]}>
				
				<ScrollView>
					<View>
						<View style={theme.inputContainer}> 
							<Text style={theme.label}>Hae tuotetta</Text>
							<TextInput
									style={theme.inputs} 
									onChangeText={(text) => this.setState({searchText: text})}
									onSubmitEditing={() => {
										this.search();
									}}/>
						</View>

						{headerResults}
				
						<TouchableOpacity
							disabled={this.state.searchText == ""}
							onPress={() =>{this.search(); Keyboard.dismiss();}}>
							<LinearGradient colors={primaryGradientColorsButton} style={[theme.linearGradient]}>
											
								<FAIcon name='search' size={20} color='#fff' />
								<Text style={{color: '#fff', fontWeight: 'bold', marginLeft: 10}}>Hae</Text>
							</LinearGradient>
						</TouchableOpacity>
							<View>
									{searchResults}
							</View>
						</View>
					</ScrollView>
			</LinearGradient>

		);
	}
}

const mapStateToProps = (state) => {
	const { search } = state

	return { search }
};

const mapDispatchToProps = dispatch => (
	bindActionCreators({ }, dispatch));
	
export default connect(mapStateToProps, mapDispatchToProps)(Search);
