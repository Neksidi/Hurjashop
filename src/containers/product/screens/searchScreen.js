import { connect } from 'react-redux';
import React, { Component } from 'react';
import { TextInput, View, Button, StyleSheet, Text, ScrollView, Image, Dimensions, FlatList, TouchableHighlight, TouchableOpacity, ImageBackground } from 'react-native';
import { searchForProduct } from '../controllers/requests'
import { bindActionCreators } from 'redux';
import { theme, grid, app_style, styles } from '../../../app/styles/global'
import CustomHeader from '../../../app/components/header/customHeader'
import LinearGradient from 'react-native-linear-gradient';


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

	renderItem = ({item, index}) => {
		if (item.empty === true) {
		  return <View style={[grid.item, grid.itemInvisible]} />;
		}
		return (
			<TouchableHighlight underlayColor={'#fff'} onPress={() => this.props.navigation.navigate('Product', { item: item })} style={[grid.item, {height: Dimensions.get('window').width / 2}]}>
					<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
						<Image style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: Dimensions.get('window').width / 2, height: Dimensions.get('window').width / 2}} source={{uri: item.images[0].src}} />
						<Text style={{ fontFamily: 'BarlowCondensed-Bold', fontSize: 20, }}>{ item.name }</Text>
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

	_handleSubmit() {
		console.log(this.state.username);
		console.log(this.state.password);
 }
		
	render() {
		console.log("Search renderiino");
		console.log(this.state.searchResults.length);
		let searchResults = 
		this.state.searchResults.length ? (
				<View>
					<Text style={app_style.front_item_title}>Haun tulokset:</Text>
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

		return (
			<LinearGradient 
				start={{x: 0.5, y: 0}} end={{x: 1, y: 1}}
				locations={[0.1, 0.7]}
				colors={['#a6c0fe', '#f68084']} 
				style={styles.linearGradient}>
			<View style={{ width: '100%', paddingVertical: 12, paddingHorizontal: 10 }}>
				<View>

					<TextInput
						placeholder={"Syötä hakusana"}
						style={{fontSize: 20}}
						onChangeText={(text) => this.setState({searchText: text})}
						onSubmitEditing={() => {
							this.search();
						}}/>

				<Button 
          onPress={() => this.search()}
          style={styles.buttonStyle}
					title ="Hae"/>
				</View>

				<ScrollView >
						<View style={app_style.sliderContainer}>
								{searchResults}
						</View>
				</ScrollView>
			</View>
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
