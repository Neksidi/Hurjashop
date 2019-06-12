import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Item } from '../components/item' 
import { bindActionCreators } from 'redux';
import { getOrders } from '../controllers/orderController'
import { setOrders } from '../redux/orderActions'
import { theme } from '../../../app/styles/global'
import { Loader } from '../../../app/components/common/loader/loader'
import { getSessionUser } from '../../../app/controllers/secureStorage';
import { fetchUserDetails } from '../../profile/controllers/loginController';
import CustomModal from '../../../app/components/common/modal'

class CustomerOrders extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//TODO: change to true when loading function is working
			isLoading: true,
			data: null,
			orders: null,
		};
	}
	
	static navigationOptions = {
		headerStyle: {
            backgroundColor: theme.color.navigation.background,
        },
        headerTitle: "Tilaukset",
        headerTintColor: 'white',
	};

	async componentDidMount() {
		var user = await getSessionUser();
		console.log("User: " + user)
		var user_details = await fetchUserDetails(user)
		console.log("Details: ",user_details)
		var fetchedOrders = await getOrders(user_details.id,this);
		console.log("Orders fetched")
		console.log(fetchedOrders)
		await this.props.setOrders(fetchedOrders);
		console.log("orders set")
		this.setState({isLoading: false});
	}

	showOrder(item){
		this.props.navigation.navigate('Order', {item: item});
	  }
	
	renderItem(item){
		return(
		  <Item data={item} onPress={() => {this.showOrder(item)}}/>
		);
	}

    render() {
		console.log("Render orders")
		console.log(this.props.orders)


		if(this.state.isLoading){
		  return (<Loader />);
		}
		else {
		  if (this.props.orders) {
			return (
			  <View style={styles.container}>
					<CustomModal ref='getorders' title="Tilausten hakeminen epäonnistui" content="Tilausten hakeminen epäonnistui yritä uudelleen" visible={false} /> 
					<FlatList data={this.props.orders} renderItem={({item}) => this.renderItem(item)}></FlatList>
			  </View>
			);
		  } 
		  else {
			return (
			  <View style={styles.container}><Text>Sinulla ei ole tilauksia!</Text></View>
			);
		  }
		}
	}
}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  alignItems: 'center',
	}
});

const mapStateToProps = (state) => {
	return {
		orders: state.orders.all
	}
}

const mapDispatchToProps = dispatch => (
	bindActionCreators({ setOrders }, dispatch));

export default 
connect(mapStateToProps, mapDispatchToProps)(CustomerOrders);
