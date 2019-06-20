import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, Button, Dimensions, ScrollView, He, Image, ImageBackground,  FlatList, TouchableHighlight, RefreshControl, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { setProducts } from '../redux/productActions'
import { getProducts } from '../controllers/requests'
import { app_style, theme, grid, styles, primaryGradientColors , boxHeight, boxWidth, textBoxHeight } from '../../../app/styles/global'
import LinearGradient from 'react-native-linear-gradient';
import CustomModal from '../../../app/components/common/modal'
import CustomHeader from '../../../app/components/header/customHeader'
import { Loader } from '../../../app/components/common/loader/loader'


class AllProducts extends Component {
	constructor(props) {
		super(props);

		this.state = {
			page:1,
			data: [],
			isLoading: false,
			refreshing: false,
		}
	}
	static navigationOptions = {
		headerStyle: {
            backgroundColor: theme.color.navigation.background,
        },
        headerTitle: "Kaikki tuotteet",
        headerTintColor: 'white',
	};

	componentWillMount() {
	}

	componentWillUnmount() {
	}

async	componentDidMount() {
	await this.getData();
	console.log("orders set")
}

	handleLoad = () => {
		console.log("handleLoad")
		this.setState(
			{page: this.state.page + 1, refreshing:true},
		callback = () => {
			console.log("PAGE: ",this.state.page)
			this.getData();
		})
	}
	
	getData = async () => {
		console.log("GETTING DATA")
		await this.setState({isLoading:true})
		//datan haku
		await getProducts(this.props,this,this.state.page);
		await this.setState({data : this.props.products})
		await this.setState({isLoading:false, refreshing:false})
		console.log("RESPONSE: ",this.state.data)
		
		if(this.state.data.length==0&&this.state.page!=1){
			console.log("Tyhjä o")
			this.getDataNull()
		}
	}

	getDataNull(){
		await this.setState({page:this.state.page-1})
		await this.setState({isLoading:true})
		//datan haku
		await getProducts(this.props,this,this.state.page);
		await this.setState({data : this.props.products})
		await this.setState({isLoading:false, refreshing:false})
		console.log("RESPONSE: ",this.state.data)
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

	renderFooter() {
    return (
    //Footer View with Load More button
      <View >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={this.getData}
          //On Click of button calling loadMoreData function to load more data
        >
          <Text>Load More</Text>
          {this.state.isLoading ? (
            <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
	}

	renderPrice(item){
		const priceStyle = {
		  fontFamily: 'BarlowCondensed-Regular',
		  fontSize: 18,
		}
		console.log("RENDER PRICE item: ",item)
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

		let results = 
		this.props.products.length ? (
				<View>
					<FlatList 
						data={this.state.data}
						style={grid.container}
						renderItem={this.renderItem}
						numColumns={2}
					/>
				</View>

		) : (
			<View/>
		);

		if(this.state.isLoading){
		  return (<Loader />);
		}

		return (
			<LinearGradient 
				start={{x: 0, y: 0}} end={{x: 1, y: 1}}
				colors={primaryGradientColors} 
				style={[styles.linearGradient, theme.inputScreenContainer, {height:'100%'}]}>
				
				<ScrollView
				refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.handleLoad()} />}
				>
					<View>
							<View>
									{results}
							</View>
						</View>
						<CustomModal ref='getproducts' title="Virhe haettassa tuotteita" content="Yritä uudelleen" visible={false} /> 
					</ScrollView>
			</LinearGradient>

		);
	}
}

const mapStateToProps = (state) => {
	const products = state.products.all
	return { products }
};

const mapDispatchToProps = dispatch => (
	bindActionCreators({ setProducts }, dispatch));

export default connect(mapStateToProps, mapDispatchToProps) (AllProducts);
