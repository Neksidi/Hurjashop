import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, Button, Dimensions, ScrollView, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { addContact, isLoggedIn } from '../redux/homeActions';
import Loader from '../../../app/components/common/loader/loader';
import Carousel from 'react-native-snap-carousel';
import Item from '../../../app/components/list/horizontal/item';
import { getProducts } from '../../product/controllers/requests'
import { setProducts } from '../../product/redux/productActions'
import Header from '../../../app/components/header/header'
import { styles, theme } from '../../../app/styles/global'

let { width, height } = Dimensions.get('screen');
//TEST TEST
class Home extends Component {
	constructor(props) {
		super(props);
	}


	static navigationOptions = {
		headerStyle: { 
			backgroundColor: theme.color.navigation.background,
			height: theme.navigation.height,
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

	componentDidMount() {
		if (!this.props.products.length) {
			getProducts(this.props);
		}
	}

	render() {


		let output =
			this.props.products ? (

				<Carousel
					data={this.props.products}
					firstItem={(this.props.products.length - 1) / 2}
					keyExtractor={(item, index) => index.toString()}
					sliderWidth={width}
					itemWidth={width / 2 - 15}
					inactiveSlideOpacity={1}
					renderItem={({ item }) => (
						<Item data={item} onPress={() => this.props.navigation.navigate('Product', { item: item })} />
					)}
				/>

			) : (
					<Loader />
				);

		return (

			<View>
				<Image
					style={styles.logo}
					source={require('../../../assets/images/hurja_shop_logo.png')}
					resizeMode="contain"
				/>

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
				<Button
					title="Ostoskoriin"
					onPress={() =>
						this.props.navigation.navigate('Cart')
					}
				/>

				{output}

			</View>

		);


	}
}


const mapStateToProps = (state) => {
	const { home } = state
	const products = state.products.all
	return { home, products }
};

const mapDispatchToProps = dispatch => (
	bindActionCreators({ setProducts }, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Home);