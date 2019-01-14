import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';

import { Logo, Drawer, Cart } from '../navigation/options/Items';
// Global styles
import { theme, app_style } from '../styles/Global';
//import { carousel } from '../styles/styles';
//import FAIcon from 'react-native-vector-icons/dist/FontAwesome';
//import { WEB_URL, DB_URL } from '../redux/actiontypes';
//import Item from '../components/list/horizontal/Item';
//import Info from '../components/front/Info';
//import Header from '../components/front/Header';
//import Slider from '../components/front/Slider';
//import List from '../components/list/horizontal/Container';
//import Loader from '../components/common/Loader';

//import Parser from '../utility/Parser';

import { readProducts, addContact, isLoggedIn } from '../redux/actioncreators';

//import Carousel from 'react-native-snap-carousel';
//TODO: Later with authentication
//import Auth from '../utility/Auth';

//import CartBadge from '../components/common/Badge/Cart';

//TODO:: later when notifications and login is needed.
//import firebase from 'react-native-firebase';

//Device height and width
let { width, height } = Dimensions.get('screen');

class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//TODO: change to true when loading function is working
			isLoading: false,
			data: null,
			categories: null
		};
	}

	/* TODO: Firebase notifications
	checkPermission() {
		firebase
			.messaging()
			.hasPermission()
			.then(enabled => {
				if (enabled) {
					this.getRegistrationToken();
				} else {
					console.log('No permission given for notifications');
				}
			});
	}
	getRegistrationToken() {
		console.log('Getting token');
		firebase
			.messaging()
			.getToken()
			.then(fcmToken => {
				if (fcmToken) {
					console.log(fcmToken);
					this.saveDeviceToken(fcmToken);
				} else {
					// user doesn't have a device token yet
				}
			});
	}
	saveDeviceToken(fcmToken) {
		return fetch(DB_URL + '/user/device/add', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
				//TODO: Auth
			},
			body: JSON.stringify({
				id: 13,
				email: this.props.contact.email,
				token: fcmToken
			})
		})
			.then(response => {
				response
					.json()
					.then(responseJson => {
						console.log(DB_URL, '/user/device/add');
						if (response.status == 201) {
							console.log('Device success');
						} else {
							console.log('Device token adding failed');
						}
					})
					.catch(error => {
						console.error(error);
					});
			})
			.catch(error => {
				console.error(error);
			});
	}
	*/

	/* TODO: Authentication
	getUserData() {
		// Auth.getUser().then((user, reject) => {

		Auth.authenticate().then((result, reject) => {
			if (result) {
				console.log('User recognized');
				console.log(result);
				this.fetchUser(result);
			} else {
				//console.log(user);
				console.log(result);
				console.log(reject);
				//console.log(result)
				console.log('Error logging in');
			}
		});
		//console.log(reject)
		console.log('End');
	}*/

	/** TODO: User data fetching
	fetchUser(user) {
		console.log(user);
		return fetch(WEB_URL + '/customer/email/' + user, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
				//TODO: Auth
			}
		})
			.then(response => {
				response
					.json()
					.then(responseJson => {
						console.log(WEB_URL, '/customer/email');
						if (response.status == 200) {
							console.log('Got user data by email');
							let contactData = {
								id: responseJson.id,
								email: responseJson.email,
								first_name: responseJson.first_name,
								last_name: responseJson.last_name,
								billing: responseJson.billing,
								shipping: responseJson.shipping
							};
							this.props.addInfo(contactData);
							this.props.isLogged(true);
							this.checkPermission();
						} else {
							console.log('User not found');
						}
					})
					.catch(error => {
						console.error(error);
					});
			})
			.catch(error => {
				console.error(error);
			});
	} */

	componentWillMount() {
		//TODO: this.getUserData();
	}

	componentWillUnmount() {
		/* TODO:
		this.notificationDisplayedListener();
		this.notificationListener();
		this.notificationOpenedListener();
		this.onTokenRefreshListener();
		*/
	}

	componentDidMount() {
		/** TODO: Firebase notifications
		this.onTokenRefreshListener = firebase
			.messaging()
			.onTokenRefresh(fcmToken => {
				console.log('Saatiin uusi token');
				console.log('Uusi token: ', fcmToken);
			});

		this.notificationDisplayedListener = firebase
			.notifications()
			.onNotificationDisplayed(notification => {
				// Process your notification as required
				// ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
			});
		this.notificationListener = firebase
			.notifications()
			.onNotification(notification => {
				console.log('GOT THE NOTIFICATION WOOHOO');
				console.log(notification.data);
				console.log(notification.data.time);
				let time = Number(notification.data.time);
				console.log(time);
				console.log(+notification.data.time);
				notification.android.setChannelId('test-channel');
				notification.android.setWhen(time);
				notification.android.setShowWhen(true);
				console.log(notification);
				firebase
					.notifications()
					.displayNotification(notification)
					.then(result => {
						console.log(result);
					})
					.catch(error => {
						console.log(error);
					});
			});

		this.notificationOpenedListener = firebase
			.notifications()
			.onNotificationOpened(notificationOpen => {
				// Get the action triggered by the notification being opened
				const action = notificationOpen.action;
				// Get information about the notification that was opened
				const notification = notificationOpen.notification;

				console.log('Notifikaatio avattiin!');
			});
		// Build a channel
		const channel = new firebase.notifications.Android.Channel(
			'test-channel',
			'Test Channel',
			firebase.notifications.Android.Importance.Max
		).setDescription('My apps test channel');

		// Create the channel
		firebase.notifications().android.createChannel(channel);

		*/
		////////COMPONENT DID UPDATE ///////////////////

		/** TODO: Product fetching

		return fetch(WEB_URL + '/products')
			.then(response => response.json())
			.then(responseJson => {
				this.setState(
					{
						data: responseJson
					},
					function() {
						this.props.readProducts(this.state.data);
					}
				);
			})
			.catch(error => {
				console.error(error);
			})
			.then(
				fetch(WEB_URL + '/categories')
					.then(response => response.json())
					.then(responseJson => {
						for (i in responseJson) {
							if (responseJson[i].count == 0) {
								responseJson.splice(i, 1);
							}
						}
						this.setState(
							{
								categories: responseJson,
								isLoading: false
							},
							function() {}
						);
					})
					.catch(error => {
						console.error(error);
					})
			);
			*/
	}
	/**	TODO: Navigation
	static navigationOptions = ({ navigation }) => {
		return {
			headerLeft: Drawer(navigation),
			//headerRight: Cart(navigation),

			headerStyle: {
				backgroundColor: theme.color.navigation.background,
				height: theme.navigation.height
			}
		};
	};
	_onPress(item) {
		this.props.navigation.navigate('Product', { item: item });
	}

	_sortProducts(data, c) {
		if (data != null) {
			//SORT
			data
				.sort(function(a, b) {
					return a.total_sales - b.total_sales;
				})
				.reverse();
			if (c == null) {
				return data;
			} else {
				return data.slice(0, c);
			}
		}
		return null;
	}
	*/

	/* TODO: Discount percents
	getSaleProcent(item) {
		let percent =
			parseFloat(
				((item.regular_price - item.sale_price) / item.regular_price) * 100
			).toFixed(1) < 100
				? parseFloat(
						((item.regular_price - item.sale_price) / item.regular_price) * 100
				  ).toFixed(1)
				: 99;
		return percent;
	}
	*/

	/**
	TODO:
	ItemPrice(item) {
		if (item.attributes.length > 0) {
			price = Parser.parsePriceFromHtml(item.price_html);
			if (price.length === 2) {
				return (
					<View style={{ flexDirection: 'row' }}>
						<Text
							style={{
								textDecorationLine: 'line-through',
								textDecorationStyle: 'solid',
								fontSize: 16,
								color: '#FFF'
							}}
						>
							{price[0]} €{' '}
						</Text>
						<Text style={{ fontSize: 16, color: '#FFF' }}> {price[1]} € </Text>
					</View>
				);
			}
		}
		if (item.sale_price != '') {
			return (
				<View style={{ flexDirection: 'row' }}>
					<Text
						style={{
							textDecorationLine: 'line-through',
							textDecorationStyle: 'solid',
							fontSize: 16,
							color: '#FFF'
						}}
					>
						{item.regular_price} €{' '}
					</Text>
					<Text style={{ fontSize: 16, color: '#FFF' }}>
						{' '}
						{item.sale_price} €{' '}
					</Text>
				</View>
			);
		} else {
			return (
				<Text style={{ fontSize: 16, color: '#FFF' }}> {item.price} € </Text>
			);
		}
	}
	*/

	/*
	TODO: Most bought or featured products?
	_renderPopularItems(data) {
		return data.map((item, i) => {
			let sale =
				item.sale_price != '' ? (
					<View
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							backgroundColor: '#292929',
							elevation: 5,
							padding: 5,
							paddingHorizontal: 10
						}}
					>
						<Text style={{ color: '#fff' }}>-{this.getSaleProcent(item)}%</Text>
					</View>
				) : (
					<View />
				);
			return (
				<TouchableOpacity
					key={i}
					style={{ width: 170, height: 150, marginHorizontal: 5 }}
					onPress={() =>
						this.props.navigation.navigate('Product', { item: item })
					}
				>
					{sale}
					<ImageBackground
						source={{ uri: item.images[0].src }}
						style={{ width: '100%', height: '100%' }}
					>
						<View
							style={{
								width: '100%',
								position: 'absolute',
								bottom: 0,
								height: 40,
								backgroundColor: '#00000099'
							}}
						>
							<Text style={{ fontSize: 16, color: '#FFF' }}>{item.name} </Text>
							<View>{this.ItemPrice(item)}</View>
						</View>
					</ImageBackground>
				</TouchableOpacity>
			);
		});
	}*/

	render() {
		//let oWidth = this.state.orientation == 'portrait' ? pWidth : pHeight;
		/**
		let output =
			!this.state.isLoading && this.state.data != null ? (
				<Carousel
					data={this.state.data}
					firstItem={(this.state.data.length - 1) / 2}
					keyExtractor={(item, index) => index.toString()}
					sliderWidth={oWidth}
					itemWidth={oWidth / 2 - 15}
					inactiveSlideOpacity={1}
					renderItem={({ item }) => (
						<Item data={item} onPress={() => this._onPress(item)} />
					)}
				/>
			) : (
				<Loader />
			);
		*/
		/*
		let showAll = (
			<TouchableOpacity
				style={{
					position: 'absolute',
					top: 20,
					right: 15,
					flexDirection: 'row'
				}}
				onPress={() => this.props.navigation.navigate('AllProducts')}
			>
				<Text
					style={{ marginRight: 5, fontFamily: 'BarlowCondensed-Regular', fontSize: 18 }}
				>
					Näytä kaikki
				</Text>
				<FAIcon name={'angle-right'} size={19} />
			</TouchableOpacity>
		);
		*/
		/*
		let popularProds =
			!this.state.isLoading && this.state.data != null ? (
				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					{this._renderPopularItems(this._sortProducts(this.state.data, 4))}
				</ScrollView>
			) : (
				<Loader />
			);
		*/
		return (
			<View>
				{
					//<CartBadge count={this.props.cart_length} onPress={() => this.props.navigation.navigate('Cart')} />
				}
				<View
					style={{
						width: 75,
						height: 75,
						position: 'absolute',
						zIndex: 4,
						alignSelf: 'center',
						top: -40,
						elevation: 99
					}}
				>
					<View>
						{/*<Image
							style={styles.logo}
							source={require('../assets/images/hurja_shop_logo.png')}
							resizeMode="contain"
						/>
						*/}
					</View>
				</View>
				<ScrollView>
					{/*<Header />*/}
					<View style={styles.slidercContainer}>
						<Text style={app_style.front_item_title}>Kategoriat</Text>
						{!this.state.isLoading /* && showAll */}
						{/*output*/}
					</View>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	logo: {
		width: 75,
		height: 75
	},
	slidercContainer: {
		flex: 1,
		justifyContent: 'center',
		paddingTop: 10,
		paddingBottom: 15,
		paddingHorizontal: 5
	},
	footer: {
		backgroundColor: '#e94641',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 20,
		paddingBottom: 15
	}
});

let map_state_props = state => {
	return {
		/*
		cart_length: state.cart_reducer.cart.length,
		contact: state.contact_reducer.contact
		*/
	};
};
let map_dispach_props = dispatch => ({
	/*
	readProducts: products => {
		dispatch(readProducts(products));
	},
	addInfo: info => {
		dispatch(addContact(info));
	},
	isLogged: logged => {
		dispatch(isLoggedIn(logged));
	}
	*/
});

export default connect(
	map_state_props,
	map_dispach_props
)(Index);
