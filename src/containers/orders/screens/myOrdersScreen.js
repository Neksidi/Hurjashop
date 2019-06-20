import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, StyleSheet, Text, FlatList, ActivityIndicator,RefreshControl } from 'react-native';
import { Item } from '../components/item' 
import { bindActionCreators } from 'redux';
import { getOrders } from '../controllers/orderController'
import { setOrders } from '../redux/orderActions'
import { theme } from '../../../app/styles/global'
import { Loader } from '../../../app/components/common/loader/loader'
import { getSessionUser } from '../../../app/controllers/secureStorage';
import { fetchUserDetails } from '../../profile/controllers/loginController';
import CustomModal from '../../../app/components/common/modal'
import { ScrollView } from 'react-native-gesture-handler';

class CustomerOrders extends Component {

	constructor(props) {
		super(props);
		//this.onEndReachedCalledDuringMomentum = true;
		this.state = {
			data: null,
			orders: null,
			page:1,
			isLoading: false,
			user_details:"",
			refreshing: false,
		};
	}
	
	static navigationOptions = {
		headerStyle: {
            backgroundColor: theme.color.navigation.background,
        },
        headerTitle: "Tilaukset",
        headerTintColor: 'white',
	};

	handleLoad = () => {
		console.log("handleLoad")
		this.setState(
			{page: this.state.page + 1, refreshing:true},
		callback = () => {
			console.log("PAGE: ",this.state.page)
			this.getData();
		})
	}
	handleLoadUp = () => {
		console.log("handleLoadUp")
		if(this.state.page>1){
			this.setState(
				{page: this.state.page - 1, refreshing:true},
			callback = () => {
				console.log("PAGE: ",this.state.page)
				this.getData();
				this.upstate.focus();
			})
		}
		else{
			return;
		}
	}

	async componentDidMount(){
		var user = await getSessionUser();
		console.log("User: " + user)
		this.state.user_details = await fetchUserDetails(user)
		console.log("Details: ",this.state.user_details)
		await this.getData();
		console.log("orders set")
		await this.props.setOrders(this.state.data);
		console.log("RESPONSE: ",this.state.data)
		this.setState({ isLoading: false, refreshing:false})
	}

	getData = async () => {
		console.log("GETTING DATA")
		await this.setState({isLoading:true})
		await this.setState({data:await getOrders(this.state.user_details.id,this,this.state.page)})
		await this.setState({isLoading:false, refreshing:false})
		await this.props.setOrders(this.state.data);
		console.log("RESPONSE: ",this.state.data)
	}


	showOrder(item){
		this.props.navigation.navigate('Order', {item: item});
	  }
	
	renderItem(item){
		return(
		  <Item data={item} onPress={() => {this.showOrder(item)}}/>
		);
	}
	renderFooter = () => {
		console.log("Footer load")
		return(
			this.state.refreshing?
				<ActivityIndicator></ActivityIndicator>
			: <View style={styles.container}><Text>Sinulla ei ole enempää tilauksia</Text></View>
		) 
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
			  <View style={styles.container}  ref={(input) => { this.upstate = input; }}>
					<ScrollView
						contentContainerStyle={{
							flexDirection: 'row',
							alignSelf: 'flex-end',
							flexGrow: 1,
							flex:1
						}}
						refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.handleLoadUp()} />}
					>
							<FlatList 
							data={this.state.data}
							extraData={this.state} 
							//inverted data={this.state.data}
							renderItem={({item}) => this.renderItem(item)} 
							keyExtractor={(item,index)=>index.toString()} 
							ListFooterComponent={this.renderFooter}
							onEndReached={() => this.handleLoad()}
							onEndReachedThreshold={0.01}
							//onRefresh={() => this.handleLoad()}
							//refreshing={this.state.refreshing}						
							>
						</FlatList>
					</ScrollView>

					<CustomModal ref='getorders' title="Tilausten hakeminen epäonnistui" content="Tilausten hakeminen epäonnistui yritä uudelleen" visible={false} /> 
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
