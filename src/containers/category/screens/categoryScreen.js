import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, Button, Dimensions, ScrollView, ImageBackground, FlatList, TouchableHighlight } from 'react-native';
import { bindActionCreators } from 'redux';
import { getProductsByCategory } from '../../product/controllers/requests'
import { setProducts } from '../../product/redux/productActions'
import Loader from '../../../app/components/common/loader/loader';
import { theme, grid, app_style } from '../../../app/styles/global'


class Category extends Component {
	constructor(props) {
		super(props);

    this.state = {
      item: null,
    }
	}

	static navigationOptions = {
		headerStyle: {
      backgroundColor: theme.color.navigation.background,
    },
    headerTitle: "Kategoria", //<CustomHeader/>
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

	componentDidMount() {
		if (!this.props.products.length && this.state.item != null) {
			getProductsByCategory(this.props, this.state.item);		
		}

	}

	renderItem = ({item, index}) => {
		if (item.empty === true) {
		  return <View style={[grid.item, grid.itemInvisible]} />;
		}
		return (
		  	<TouchableHighlight underlayColor = {theme.color.hurja.dark} onPress={() => this.props.navigation.navigate('Category', { item: item })} style={[grid.item, {backgroundColor:theme.color.hurja.main, height: Dimensions.get('window').width / 2}]}>
				<ImageBackground style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: Dimensions.get('window').width / 2, height: Dimensions.get('window').width / 2}} source={{uri: item.image.src}}>
					<Text style={[grid.itemText, {backgroundColor:theme.color.bg.main, color:theme.color.hurja.main}]}>
						{item.name}
					</Text>
				</ImageBackground>

				
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

		let productByCategory = 
		this.props.products ? (
				<FlatList 
					data={this.formatRow(this.props.products, 2)}
					style={grid.container}
					renderItem={this.renderItem}
					numColumns={2}
				/>

		) : (
			<Loader />
		);

		return (
				<ScrollView>
					<View style={app_style.sliderContainer}>
							<Text style={app_style.front_item_title}>Tuote kategoriat</Text>
							{productByCategory}
					</View>
				</ScrollView>
		);
	}
}



const mapStateToProps = (state) => {
	const { category } = state
	const products = state.products.all
	return { category , products }
};

const mapDispatchToProps = dispatch => (
	bindActionCreators({ setProducts }, dispatch));
	
export default connect(mapStateToProps, mapDispatchToProps)(Category);