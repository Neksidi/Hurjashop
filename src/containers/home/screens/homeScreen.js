import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, Button, Dimensions, ScrollView} from 'react-native';
import { bindActionCreators } from 'redux';
import { addProduct } from '../redux/homeActions'
import { readProducts, addContact, isLoggedIn } from '../redux/homeActions';
import Loader from '../../../components/common/loader/loader';
import Carousel from 'react-native-snap-carousel';
import { WEB_URL} from '../../../app/redux/actionTypes';
import Platform from '../../../utility/platform';
import Item from '../../../components/list/horizontal/item';

let { width, height } = Dimensions.get('screen');

//Puhelimen leveys ja korkeus portraitissa
let pWidth = Platform.isPortrait() ? width : height;
let pHeight = Platform.isPortrait() ? height : width;

class Home extends Component {
	constructor(props) {
		super(props);
	}


	static navigationOptions = {
		headerStyle: {
      		backgroundColor: '#fcf',
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
		//!  !! ! ! ! this.setState(data: products)
		this.setState({isLoading: false});


	}

	render() {
		/*let output =
		!this.state.isLoading && this.state.data != null ? (
			<Carousel
				data={this.state.data}
				firstItem={(this.state.data.length - 1) / 2}
				keyExtractor={(item, index) => index.toString()}
				sliderWidth={oWidth}
				itemWidth={oWidth / 2 - 15}
				inactiveSlideOpacity={1}
				renderItem={({ item }) => (
					<Item data={item} onPress={() => this.props.navigation.navigate('Product', { item: item }) }/>
				)}
			/>
		) : (
			<Loader />
		);
		*/

		return (
			<View>
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
				
				{/*output*/}

			</View>
		);
	}
}


const mapStateToProps = (state) => {
	const { home } = state
	return { home }
};

const mapDispatchToProps = dispatch => (
	bindActionCreators({ readProducts }, dispatch));
	

export default connect(mapStateToProps, mapDispatchToProps)(Home);
