import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, StyleSheet, Text, Button, ScrollView, ActivityIndicator, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { theme,  primaryGradientColors, } from '../../../app/styles/global'
import { Input } from 'react-native-elements'
import ButtonDefault from '../components/defaultLoginButton'
import Toast from '../toast'
import LinearGradient from 'react-native-linear-gradient';
import { updateUser } from '../../../containers/profile/controllers/profileController'
//import { HeaderBackButton } from 'react-navigation';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//TODO: change to true when loading function is working
			/*isLoading: false,
			data: null,
			categories: null*/
			disabled: true,
			country: '',
			address: '',
			city: '',
			postcode: '',
			isFilled: false,
			email_validated: false,
			data: null,
			response: null,
			isUpdating: false,
		};
	}

	static navigationOptions = ({ navigation }) => {
		return {
			headerTitle: <Text style={{ flex: 1, textAlign: 'center', fontFamily: 'BarlowCondensed-Medium', color: '#fff', fontSize: 32, }}>Profiili</Text>,
			headerRight: (<View></View>),
			headerTintColor: '#FFF',
			//headerLeft: (<HeaderBackButton onPress={() => { navigation.navigate('Home') }} />),
			headerStyle: {
				backgroundColor: theme.color.navigation.background,
				height: theme.navigation.height,
			},

		}
	};

	async updateUser() {
		let newData = {
			shipping: {
				first_name: this.props.contact.first_name,
				last_name: this.props.contact.last_name,
				address_1: this.state.address,
				city: this.state.city,
				postcode: this.state.postcode,
				country: this.state.country,
			},
			billing: {
				first_name: this.props.contact.first_name,
				last_name: this.props.contact.last_name,
				address_1: this.state.address,
				city: this.state.city,
				postcode: this.state.postcode,
				country: this.state.country,
			}
		}
		console.log(newData)
		console.log(newData)

		var user= await updateUser(newData,this.props.contact.id);
		console.log("NewData: ",user)

		//TODO update customer from Router

		/*fetch(WEB_URL + '/customer/update/ ' + this.props.contact.id, {
			method: 'PUT',
			headers: {
				accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newData)
		})
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					response: responseJson,
				}, function () {
					if (responseJson != 400) {
						this.props.contact.shipping.address_1 = this.state.address;
						this.props.contact.shipping.city = this.state.city;
						this.props.contact.shipping.postcode = this.state.postcode;
						this.props.contact.shipping.country = this.state.country;
						this.setState({ isUpdating: false })
						this.refs.toast.show('Käyttäjän tiedot päivitetty');
					}
				});
			})
			.catch((error) => {
				console.error(error);
			});
			*/


	}

	componentDidUpdate() {
		if (!(this.state.address == undefined || this.state.postcode == undefined || this.state.city == undefined || this.state.country == undefined)) {
			if (!this.state.isFilled && this.state.address != "" && this.state.postcode != "" && this.state.city != "" && this.state.country != "") {
				this.setState({ isFilled: true });
			} else if (this.state.isFilled && (this.state.address == "" || this.state.postcode == "" || this.state.city == "" || this.state.country == "")) {
				this.setState({ isFilled: false });
			}
		}
	}

	render() {
		var address = '';
		var city = '';
		var postcode = '';
		var country = '';
		var firstname = '';
		if (this.props.contact.billing.country) {
			address = this.props.contact.billing.address_1;
		}
		if (this.props.contact.billing.country) {
			city = this.props.contact.billing.city;
		}
		if (this.props.contact.billing.country) {
			postcode = this.props.contact.billing.postcode;
		}
		if (this.props.contact.billing.country) {
			country = this.props.contact.billing.country;
		}
		if (this.props.contact.billing.first_name) {
			firstname = this.props.contact.billing.first_name;
		}
		return (
			/*<View>
				<Text>This is your profile</Text>
				<Button
					title="Tehtyihin tilauksiin"
					onPress={() =>
						this.props.navigation.navigate('CustomerOrders')
					}
				/>
			</View>*/
			<LinearGradient
				start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
				colors={primaryGradientColors}
				style={[styles.linearGradient, theme.inputScreenContainer, { height: '100%' }]}>

				<ScrollView >
					<View style={styles.container}>

						<Toast ref='toast' position='BOTTOM' positionOffset={100} onPress={() => this.props.navigation.navigate('Home')} />

						<ImageBackground source={require('../../../assets/images/header_tmp2.jpg')} style={{ height: 300, width: '100%' }} resizeMode='cover'>
							<View style={styles.innerContainer}>

								<Text style={styles.pacifico}>- Terve {firstname}! -</Text>
							</View>
						</ImageBackground>

						<View style={[styles.bar, styles.barBottom]}>
							<TouchableOpacity style={[styles.barItem, styles.barseparator]} onPress={() => { this.props.navigation.navigate('CustomerOrders') }}>
								<Text style={styles.barTop}>Omat tilaukset</Text>
							</TouchableOpacity>
							<TouchableOpacity style={[styles.barItem]} onPress={() => this.setState({ disabled: !this.state.disabled })}>
								<Text style={styles.barTop}>Muokkaa tietoja</Text>
							</TouchableOpacity>
						</View>

						<View style={styles.formContainer}>
							<Text style={{ fontFamily: 'BarlowCondensed-Medium', color: '#fff', fontSize: 23 }}>Lähiosoite:</Text>
							<View style={styles.inputContainer}>
								<Input
									editable={this.state.disabled}
									placeholder={address}
									autoCapitalize='words'
									inputStyle={styles.input}
									onChangeText={(address) => this.setState({ address })} underlineColorAndroid='transparent' blurOnSubmit={true} />
							</View>
							<Text style={{ fontFamily: 'BarlowCondensed-Medium', color: '#fff', fontSize: 23 }}>Kaupunki:</Text>
							<View style={styles.inputContainer}>
								<Input
									editable={this.state.disabled}
									placeholder={city}
									autoCapitalize='words' inputStyle={styles.input}
									onChangeText={(city) => this.setState({ city })}
									underlineColorAndroid='transparent'
									returnKeyType={'next'}
									blurOnSubmit={true} />
							</View>
							<Text style={{ fontFamily: 'BarlowCondensed-Medium', color: '#fff', fontSize: 23 }}>Maa:</Text>
							<View style={styles.inputContainer}>
								<Input
									editable={this.state.disabled}
									placeholder={country}
									autoCapitalize='none' inputStyle={styles.input}
									onChangeText={(country) => this.setState({ country })}
									underlineColorAndroid='transparent'
									returnKeyType={'next'}
									blurOnSubmit={true} />
							</View>
							<Text style={{ fontFamily: 'BarlowCondensed-Medium', color: '#fff', fontSize: 23 }}>Postinumero:</Text>
							<View style={styles.inputContainer}>
								<Input
									editable={this.state.disabled}
									placeholder={postcode}
									autoCapitalize='none' inputStyle={styles.input}
									onChangeText={(postcode) => this.setState({ postcode })}
									underlineColorAndroid='transparent'
									returnKeyType={'next'}
									blurOnSubmit={true} />
							</View>

							<View style={{ width: 300, marginTop: 10 }}>
								<ButtonDefault disabled={!this.state.isFilled} text="Päivitä tiedot" type="success" onPress={() => { this.updateUser() }} />
							</View>
						</View>

					</View>
				</ScrollView>
			</LinearGradient>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	formContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	innerContainer: {
		flex: 1,
		backgroundColor: 'rgba(233, 70, 65, 0.6)',
		alignItems: 'center',
		justifyContent: 'center',
	},
	pacifico: {
		fontFamily: 'Pacifico-Regular',
		color: '#fff',
		fontSize: 28,
	},
	profilepicWrap: {
		width: 180,
		height: 180,
		borderRadius: 100,
		borderColor: 'rgba(0,0,0,0)',
		borderWidth: 16,
	},
	profilepic: {
		flex: 1,
		width: null,
		alignSelf: 'stretch',
		borderRadius: 100,
		borderColor: '#fff',
		borderWidth: 4
	},
	bar: {
		borderTopColor: '#fff',
		borderTopWidth: 4,
		backgroundColor: '#e94641',
		flexDirection: 'row'
	},
	barseparator: {
		borderRightWidth: 4,
		borderColor: '#fff',
	},
	barItem: {
		flex: 1,
		padding: 18,
		alignItems: 'center'
	},
	barTop: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
		fontStyle: 'italic'
	},
	barBottom: {
		borderBottomWidth: 4,
		borderColor: '#fff'
	},
	inputContainer: {
		width: 500,
		backgroundColor: '#fff',
		borderRadius: 4,
		marginVertical: 10,
		maxWidth: 300,
	},
	linearGradient: {
		flex: 1,
	  },

});

let mapStateToProps = (state) => {
	return {
		contact: state.user.contact,
		shipping: state.user.shipping
	}
};

export default connect(mapStateToProps)(Profile);
