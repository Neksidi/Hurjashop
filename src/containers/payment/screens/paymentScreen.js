import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, WebView, ActivityIndicator, Dimensions } from 'react-native';
import { newCardPayment, existingCardPayment } from '../controllers/paymentController'
import { theme } from '../../../app/styles/global'
import CustomHeader from '../../../app/components/header/customHeader'
import { PH_URL } from '../../../app/config'
import { Button } from 'react-native-elements'
import { setCardToken, setCardType, setCardPartial, getCardToken, getCardType, getCardPartial } from '../../../app/controllers/secureStorage'
import CustomModal from '../../../app/components/common/modal'
import { NavigationEvents } from 'react-navigation';
import Success from '../screens/paymentSuccessScreen'


//const WIDTH = Dimensions.get("window").width;

class Payment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//TODO: change to true when loading function is working
			data: null,
			isPaid: false, //false
			isCancelled: false, //false
			failed: false,
			isLoading: false,
			token: null, //null
			cardFormHtml: null,
			paysWithNewCard: null,
			orderUpdated: false, //false
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
			console.log("Parsed: ",parsed)
			if(parsed.status == 201) {
				console.log("Payment done!")
				this.setState({
					isCancelled: false,
					failed: false,
					isPaid: true,
					orderUpdated: true,
				})
				
			} else if(parsed.status == 402) {
				console.log("Status 402")
				this.refs.contactbank.state.visible=true;
				this.forceUpdate(); 

				this.setState({
					isCancelled: false,
					failed: true,
					isPaid: false,
					orderUpdated: false,
				})
			} 
			else if(parsed.status == 500) {
				console.log("Status 500")
				this.refs.problems.state.visible=true;
				this.forceUpdate(); 
				
				this.setState({
					isCancelled: false,
					failed: true,
					isPaid: false,
					orderUpdated: false,
				})
			} else {
				console.log("Else")
				console.log(parsed.status)

				this.refs.problems.state.visible=true;
				this.forceUpdate(); 

				this.setState({
					isCancelled: false,
					failed: true,
					isPaid: false,
					orderUpdated: false,
				})
			}
			console.log(parsed)
			var token = parsed.token;
			var type = parsed.type;
			var partialPan = parsed.partial_pan;

			//Saving into phone memory
			await setCardToken(token,this)
			await setCardType(type, this);
			await setCardPartial(partialPan,this);
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
				data: null,
				isCancelled: false,
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
				var html = await newCardPayment(this)
				this.setState({cardFormHtml: html, isLoading: false, paysWithNewCard: paysWithNewCard});
			} else {
				this.setState({token: token});
			}
			//newCardPayment(1234, "Test order")
		}

		//TODO: EI SAA lengtiä joten ei toimi
		//Tällä siis tarkoitus hakea data tuotteista joiden saldoa pitäisi päivitellä woohon & reduxiin
		getUpdateProducts(){
			var products=this.props.products;
			var orders=this.props.order;

			var updateProducts = [];

			for(var i=0;i<products.lenght;i++){
         for(var j=0;j<orders.line_items.lenght;j++){
					 if(orders.line_items[j].id==products[i].id){
						 updateProducts.push(products[i])
					 }
				 }
			}
			console.log("NÄÄ PÄIVITELLÄÄN")
			console.log(updateProducts)
		}

    render() {
			console.log("PAYDAY")
			console.log(this.props)
			if (this.state.isLoading) {
				return (<ActivityIndicator size="large" color={theme.color.highlight.secondary} style={{ marginTop: 20 }} />)
			} 
			else if (this.state.isCancelled) {
				console.log("Peruuntui")
				return(
					<View>
						<Text>
							Maksu peruuntui, tähän voisi tehdä asioita!
						</Text>
						<Button buttonStyle={{backgroundColor: "#e84b48"}} title='Yritä uudestaan' onPress={() => {this.reset()}} />
						<CustomModal ref='cancelled' title="Maksu peruuntui" content="Yritä tarvittaessa uudelleen" visible={true} /> 
					</View>
				);
			} 
			else if (this.state.failed) {
				console.log("Feilas")
				return(
					<View>
						<CustomModal ref='failed' title="Maksu epäonnistui" content="Yritä uudelleen" visible={false} /> 
						<Button buttonStyle={{backgroundColor: "#e84b48"}} title='Yritä uudestaan' onPress={() => {this.reset()}} />
						<Button buttonStyle={{backgroundColor: "#e84b48"}} title='Vaihda maksutapaa' onPress={() => {this.props.navigation.pop(3)}} />
						<CustomModal ref='failed' title="Maksu epäonnistui" content="Yritä uudelleen" visible={true} /> 
					</View>
				);
			} 
			else if (!this.state.token) {
				console.log("No token")
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
						<CustomModal ref='setcardtoken' title="Kortin syöttämisessä ongelma" content="Kortin syöttämisessä ongelma yritä uudelleen" visible={false} /> 
						<CustomModal ref='setcardtype' title="Kortin syöttämisessä ongelma" content="Kortin syöttämisessä ongelma yritä uudelleen" visible={false} /> 
						<CustomModal ref='setcardpartial' title="Kortin syöttämisessä ongelma" content="Kortin syöttämisessä ongelma yritä uudelleen" visible={false} /> 
						<CustomModal ref='problems' title="Palvelimeen ei saada yhteyttä" content="Ota yhteys asiakaspalveluumme" visible={false} /> 
						<CustomModal ref='contactbank' title="Ongelma maksussa" content="Ota yhteys pankkiisi" visible={false} /> 
						<CustomModal ref='newcardpayment' title="Kortin syöttämisessä ongelma" content="Kortin syöttämisessä ongelma yritä uudelleen" visible={false} /> 

					</View>
	
				)
			} else if (!this.state.isPaid && this.state.token) {
				console.log("Token heti postin jälkeen: ", this.state.token)
				return (
					<ActivityIndicator size="large" color={theme.color.highlight.secondary} style={{ marginTop: 20 }} />
				)
			} else if (this.state.isPaid && !this.state.orderUpdated) {
				console.log("Maksettu, loppu")
				//this.updateStatus("processing")	Update order status
				return (
					<ActivityIndicator size="large" color={theme.color.highlight.secondary} style={{ marginTop: 20 }} />
				)
			} 
			else if(this.state.isPaid && this.state.orderUpdated) {
				console.log("isPaid & orderUpdated")
				//TODO: update product ex. stock_quantity when payment 
				console.log(this.props)
        //this.getUpdateProducts()
				//TODO: fix navigation logic
				this.props.navigation.navigate('Home')
				return (
					<View>
					 <CustomModal ref='done' title="Tilaus maksettu" content="Tilauksesi on suoritettu ja maksettu onnistuneesti. Kiitos tilauksestasi!" visible={true} home={true} /> 
					</View>
				)

			}
			else {
				console.log("Something's wrong")
				return (
					<View>
						<CustomModal ref='wrong' title="Jotain meni pieleen" content="Yritä uudelleen" visible={true} /> 
					</View>
				)
			}
	}
}
const mapStateToProps = (state) => {

	return {
		payment: state.payment.payment,
		order: state.orders.order,
		products: state.products.all
	}
}

export default connect(mapStateToProps)(Payment);
