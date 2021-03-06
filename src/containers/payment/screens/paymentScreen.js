import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, WebView, ActivityIndicator } from 'react-native';
import { newCardPayment, existingCardPayment } from '../controllers/paymentController'
import { theme } from '../../../app/styles/global'
import CustomHeader from '../../../app/components/header/customHeader'
import { PH_URL } from '../../../app/config'
import { Button } from 'react-native-elements'
import { setCardToken, setCardType, setCardPartial, getCardToken, getCardType, getCardPartial } from '../../../app/controllers/secureStorage'

class Payment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//TODO: change to true when loading function is working
			isLoading: true,
			data: null,
			isPaid: false,
			isCancelled: false,
			failed: false,
			isLoading: false,
			token: null,
			cardFormHtml: null,
			paysWithNewCard: null,
			orderUpdated: false,
		};
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

		async webviewHandler(data) {
			var parsed = JSON.parse(data);
			if(parsed.status === 201) {
				
			} else if(parsed.status === 402) {
				//TODO: Show modal telling about payment problems. E.g. Contact your bank.
			} else if(parsed.status === 500) {
				//TODO: Show modal telling about server error. E.g. Contact our customer support.
			} else {
				//TODO: Show modal telling about server error. E.g. Contact our customer support / Report bug.
			}

			console.log(parsed)
			var token = parsed.token;
			var type = parsed.type;
			var partialPan = parsed.partial_pan;

			await setCardToken(token);
			await setCardType(type);
			await setCardPartial(partialPan);
			var test = await getCardToken();
			var test2 = await getCardType();
			var test3 = await getCardPartial();
			console.log(test);
			console.log(test2);
			console.log(test3);
			this.setState({
				token: parsed.token
			})
		}
		
		reset(){
			this.setState({
				response: null,
				cancelled: false,
				failed: false,
				token: null,
				gotToken: false,
			})
		}

		async componentDidMount() {
			var paysWithNewCard = this.props.navigation.getParam('method', null);
			var token = this.props.navigation.getParam('token', null);
			console.log(paysWithNewCard)
			if(paysWithNewCard || !token) {
				console.log("Pays with new card")
				console.log("Getting new token prompt html")
				var html = await newCardPayment(this.props.payment)
				this.setState({cardFormHtml: html, isLoading: false, paysWithNewCard: paysWithNewCard});
			} else {
				this.setState({token: token});
			}
			//newCardPayment(1234, "Test order")
		}

    render() {
			console.log("PAYDAY")
			console.log(this.props)
			if (this.state.isLoading) {
				return (<ActivityIndicator size="large" color={theme.color.highlight.secondary} style={{ marginTop: 20 }} />)
			} 
			else if (this.state.isCancelled) {
				return(
					<View>
						<Text>
							Maksu peruuntui, tähän voisi tehdä asioita!
						</Text>
						<Button buttonStyle={{backgroundColor: "#e84b48"}} title='Yritä uudestaan' onPress={() => {this.reset()}} />
					</View>
				);
			} 
			else if (this.state.failed) {
				return(
					<View>
						<Text>
							Maksu epäonnistui, tähän voisi tehdä asioita! (Eri maksutavan ehdottaminen?)
						</Text>
						<Button buttonStyle={{backgroundColor: "#e84b48"}} title='Yritä uudestaan' onPress={() => {this.reset()}} />
						<Button buttonStyle={{backgroundColor: "#e84b48"}} title='Vaihda maksutapaa' onPress={() => {this.props.navigation.pop(3)}} />
					</View>
				);
			} 
			else if (!this.state.token) {
				return (
					<View style={{ flex: 1, height: 200, backgroundColor: 'powderblue' }}>
						<WebView
							source={{
								uri: this.state.cardFormHtml, method: 'GET',
							}}
							style={{ marginTop: 20 }}
							javaScriptEnabled={true}
							domStorageEnabled={true}
							startInLoadingState={true}
							onMessage={(event) => {
								this.webviewHandler(event.nativeEvent.data)
							}} />
					</View>
	
				)
			} else if (!this.state.isPaid && this.state.token) {
				console.log("Token heti postin jälkeen: ", this.state.token)
				return (
					<ActivityIndicator size="large" color={theme.color.highlight.secondary} style={{ marginTop: 20 }} />
				)
			} else if (this.state.paid && !this.state.orderUpdated) {
				console.log("Maksettu, loppu")
				//this.updateStatus("processing")	Update order status
				return (
					<ActivityIndicator size="large" color={theme.color.highlight.secondary} style={{ marginTop: 20 }} />
				)
			} 
			else if(this.state.paid && this.state.orderUpdate) {
				return (
					<View>Tilauksesi on suoritettu.</View>
				)
			}
			else {
				return (
					<View>
						<Text>Jokin meni vikaan</Text>
					</View>
				)
			}
	}
}
const mapStateToProps = (state) => {
	return {
		payment: state.payment.payment
	}
}

export default connect(mapStateToProps)(Payment);
