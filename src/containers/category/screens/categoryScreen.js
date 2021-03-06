import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, Button, Dimensions, ScrollView, Image, ImageBackground, FlatList, TouchableHighlight , TouchableOpacity} from 'react-native';
import { bindActionCreators } from 'redux';
import { getProductsByCategory } from '../../product/controllers/requests'
import { setCategoryProducts } from '../../product/redux/productActions'
import { Loader } from '../../../app/components/common/loader/loader';
import { theme, grid, app_style, styles, primaryGradientColors,  boxHeight, boxWidth, textBoxHeight } from '../../../app/styles/global'
import CustomHeader from '../../../app/components/header/customHeader'
import { withTheme } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

class Category extends Component {
	constructor(props) {
		super(props);

    this.state = {
      category_id: null,
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
  };

	componentWillMount() {
	}

	componentWillUnmount() {
	}

	componentDidMount() {

		let currentCategory = this.props.navigation.state.params.category

		if(currentCategory != undefined) {
			this.setState({ category : currentCategory });
			getProductsByCategory(this.props, currentCategory.id);	
		}
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
							<View style={{height:textBoxHeight, flex:1}}>
								<Text style={{ fontFamily: 'BarlowCondensed-Bold', fontSize: 20, }}>{ item.name }</Text>
								{this.renderPrice(item)}
							</View>
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

		let productByCategory = 
		this.props.categoryProducts ? (
				<FlatList 
					data={this.formatRow(this.props.categoryProducts, 2)}
					style={grid.container}
					renderItem={this.renderItem}
					numColumns={2}
				/>

		) : (
			<Loader />
		);

		let headerCategory =
		this.state.category != null ? (
			<Text style={app_style.front_item_title}>{this.state.category.name}:</Text>
	) : (
			<View/>
	);

		return (
				<LinearGradient 
					start={{x: 0, y: 0}} end={{x: 1, y: 1}}
					colors={primaryGradientColors} 
					style={styles.linearGradient}>
						<View style={app_style.sliderContainer}>
						<ScrollView>
							<View style={app_style.sliderContainer}>
									{headerCategory}
									{productByCategory}
							</View>
						</ScrollView>
						</View>
				</LinearGradient>
		);
	}
}



const mapStateToProps = (state) => {
	const { category } = state
	const categoryProducts = state.products.categoryProducts

	return { category, categoryProducts }
};

const mapDispatchToProps = dispatch => (
	bindActionCreators({ setCategoryProducts }, dispatch));
	
export default connect(mapStateToProps, mapDispatchToProps)(Category);