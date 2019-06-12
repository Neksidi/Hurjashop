
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {  View, StyleSheet, Text, AsyncStorage, ActivityIndicator, ScrollView, Button, TouchableOpacity, TextInput } from 'react-native';
import { bindActionCreators } from 'redux';
import { theme, styles, primaryGradientColors, primaryGradientColorsButton, app_style } from '../../../app/styles/global'
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'
import { CheckBox } from 'react-native-elements'
import { POSTI_URL } from '../../../app/config'
import Loader from '../components/loader/loader'
import { getPickUps } from '../controllers/postiController'
import { methodsStyles } from '../styles/methods' 
import LinearGradient from 'react-native-linear-gradient';
import { addMethods } from '../../profile/redux/userActions'
import CustomModal from '../../../app/components/common/modal'


class Methods extends Component {
	constructor(props) {
		super(props);
		this.state = {
            //Postitustavat
            isLoading: true,
            postDelivery: false,
            homeDelivery: false,
            //Maksutavat
            newcard: false,
            oldcard: false,
            payment_method: null,
            payment_method_title: null,
            shipping_method: null,
            shipping_method_title: null,
            methods: "method test",
            isChecked: false,
            cardNotFound: true,
            points: null,
            isLoadingPoints: false,
            postiBools: [],
            postcode: null,
            infotext: null,
		};
		  //this.retrieveToken = this.retrieveToken.bind(this)
		  this.retrieveToken()
    }
    
    static navigationOptions = {
		headerStyle: {
            backgroundColor: theme.color.navigation.background,
        },
        headerTitle: "Maksutavat",
        headerTintColor: 'white',
    };
	
    retrieveToken() {
        console.log('retrieve options')
        try {
            console.log('Toimi pls')
            AsyncStorage.getItem('token').then((token) => {
                console.log('TOIMI NYT')
                if (token == null) {
                    console.log('token null')
                    this.setState({ isLoading: false })
                } else {
                    console.log(token)
                    console.log('token found options')
                    this.setState({
                        cardNotFound: false,
                        isLoading: false,
                    })
                }
            })
            this.state.isLoading = false
        } catch (error) {
            console.log(error)
        }
    }
	postIsSelected() {
        for (let i = 0; i < this.state.postiBools.length; i++) {
            if (this.state.postiBools[i] == true) {
                return true;
            }
        }
        return false;
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.isChecked && this.state.postDelivery && !this.postIsSelected()) {
            this.setState({ isChecked: false })
        }
        if (!this.state.isChecked && ((this.state.postDelivery && this.postIsSelected()) || this.state.homeDelivery) && (this.state.newcard || this.state.oldcard)) {
            console.log("Nice")
            this.setState({ isChecked: true });
        }
        if (prevState.postDelivery === false && this.state.postDelivery === true) {
            console.log("WHY")
        }

    }
	
    handleSubmit = () => {
        let total = null;
        switch (this.state.shipping_method) {
            case "post":
                total = '10'
                break;
            case "home":
                console.log("homeDelivery")
                total = '5'
                console.log(total);
                break;
            default:
                total = '0'
                break;
        }
        console.log("Shipping to:")
        console.log(total)
        this.state.methods = {
            payment_method_title: this.state.payment_method_title,
            payment_method: this.state.payment_method,
            shipping_method_title: this.state.shipping_method_title,
            shipping_method: this.state.shipping_method,
            shipping_total: total
        };
        this.props.addMethods(this.state.methods);

	};
	
    async postcodeHandler() {

        this.setState({ isLoadingPoints: true })
        console.log("Haetaan: " + this.state.postcode)
        await this.getPickUps(this.state.postcode);

    }

    async getPickUps(postcode) {
        console.log("Getting pickups, code: " + postcode);
        this.state.postiBools = [];
        var result = await getPickUps(postcode,this)
        console.log(result);

        this.setState({
            points: result,
            isLoadingPoints: false,
            infotext: "Virhe toimipisteiden haussa. Tarkista antamasi postinumero ja yritä uudestaan",
        });


    }

    renderPoints() {
        console.log("Points:", this.state.points)
        if (this.state.points == null || this.state.points.length == 0) {
            console.log("Points virhe");
            return (<View>
                <Text>{this.state.infotext}</Text>
            </View>);
        } else {
            return (
                <View>
                    {this.state.points.map((item, i) => {
                        console.log(i);
                        if (this.state.postiBools[i] == null) {
                            this.state.postiBools[i] = false;
                        }
                        return (<View key={i}>
                            <CheckBox
                                checkedColor='green'
                                title={<Text>{item.postinumero}  {item.osoite}  {item.nimi}</Text>}
                                checked={this.state.postiBools[i]}
                                checkedIcon='check-square-o'
                                uncheckedIcon='square-o'
                                onPress={() => { this.postiHandler(i) }}
                            />
                        </View>);

                    })}
                </View>
            );
        }
    }

    postiHandler(button) {
        console.log("test", this.state.postiBools[button])
        console.log("handler: ", this.state.postiBools)
        console.log("button:", button)
        if (this.state.postiBools[button] == false) {
            this.state.postiBools[button] = true;
            this.state.shipping_method = "Kovakoodattu Pakettiautomaatti";
            this.state.shipping_method_title = this.state.points[button].nimi;
            for (let i = 0; i < this.state.postiBools.length; i++) {
                if (i != button) {
                    this.state.postiBools[i] = false;
                }
            }
        }
        this.forceUpdate();
    }
	checkDelivery = (box) => {
        if (box === "post") {
            this.state.postDelivery ? (this.setState({ postDelivery: false, homeDelivery: false, isChecked: false })) : (this.setState({ postDelivery: true, homeDelivery: false, shipping_method: "post", shipping_method_title: "Nouto Postista" }));
        } else if (box === "home") {
            this.state.homeDelivery ? (this.setState({ homeDelivery: false, postDelivery: false, isChecked: false })) : (this.setState({ homeDelivery: true, postDelivery: false, shipping_method: "home", shipping_method_title: "Kotiinkuljetus" }));
        }
	}
	checkPay = (card) => {
        if (card === "newcard") {
            this.state.newcard ? (this.setState({ newcard: false, oldcard: false, isChecked: false })) : (this.setState({ newcard: true, oldcard: false, payment_method: "nCard", payment_method_title: "Korttimaksu uudella kortilla" }));
        } else if (card === "oldcard") {
            this.state.oldcard ? (this.setState({ oldcard: false, newcard: false, isChecked: false })) : (this.setState({ oldcard: true, newcard: false, payment_method: "oCard", payment_method_title: "Korttimaksu" }));
        }
    }
    handleChange(text){

        if(text.length<5){
            return;
        }
        this.setState(
            { postcode: text },
            callback = () => {
                console.log(this.state.postcode);
                console.log("Haetaan: " + this.state.postcode)
                this.getPickUps(this.state.postcode)
                this.setState({ isLoadingPoints: true })
            }) 
    }

	render() {
        let gradientStyle = this.state.isChecked ? ['#4c669f', '#3b5998', '#192f6a'] : ['#fafafa', '#fafafa'];
        let continueButtonStyle = !this.state.isChecked ? theme.continueButtonDisabled : theme.continueButton;
        
		if (this.state.isLoading) {
            return (
                <Loader/>
            )
        }
        else if (this.state.postDelivery) {
            console.log("Points loading:")
            console.log(this.state.isLoadingPoints);
			let postiPoints = !this.state.isLoadingPoints ? this.renderPoints() : <Loader/>;
			
            return (
                <LinearGradient 
                    start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                    colors={primaryGradientColors} 
                    style={[styles.linearGradient, theme.inputScreenContainer, {height:'100%'}]}>

                    <ScrollView>
                        <View>
                            <Text style={app_style.medium_title}>Maksutavat</Text>
                            <CheckBox
                                checkedColor='green'
                                title='Korttimaksu uudella maksukortilla'
                                checked={this.state.newcard}
                                checkedIcon='check-square-o'
                                uncheckedIcon='square-o'
                                onPress={() => { this.checkPay("newcard") }}
                            />
                            <CheckBox
                                checkedColor='green'
                                title='Korttimaksu viimeksi käytetyllä maksukortilla'
                                checked={this.state.oldcard}
                                onPress={() => { this.checkPay("oldcard") }}
                                disabled={this.state.cardNotFound}
                            />
                            <Text style={app_style.medium_title}>Lähetysvaihdoehdot</Text>
                            <CheckBox
                                checkedColor='green'
                                title='Nouto Postista'
                                checked={this.state.postDelivery}
                                checkedIcon='check-square-o'
                                uncheckedIcon='square-o'
                                onPress={() => { this.checkDelivery("post") }}
                            />
                            <View style={methodsStyles.postBar}>
                                <Text>Noutopisteiden haku postinumerolla: </Text>
                                <TextInput 
                                style={methodsStyles.postcodeInput} 
                                maxLength={5}
                                keyboardType='numeric'
                                placeholder='00000' 
                                onChangeText={(text) => this.handleChange(text)}
                                //onChangeText={(text) => this.setState({ postcode: text })} 
                                onSubmitEditing={(event) => this.postcodeHandler()} 
                                />
                            </View>
                            
                            {postiPoints}

                            <CheckBox
                                title='Kotiin'
                                checked={this.state.homeDelivery}
                                onPress={() => { this.checkDelivery("home") }}
                            />
                            <LinearGradient colors={gradientStyle} style={theme.linearGradient}>
                                <Text 
                                    disabled={!this.state.isChecked}
                                    onPress={() => { this.handleSubmit(); this.props.navigation.navigate('OrderCreation'); }} 
                                    style={continueButtonStyle}
                                >
                                    Jatka
                                </Text>
                            </LinearGradient>
                            <CustomModal ref='getpickups' title="Virhe haettaessa postiosoitetta" content="Yritä uudelleen" visible={false} /> 
                        </View>
                    </ScrollView>
                </LinearGradient>
            );
        }
        else {
            return (
                <LinearGradient 
                    start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                    colors={primaryGradientColors} 
                    style={[styles.linearGradient, theme.inputScreenContainer, {height:'100%'}]}>

                    <ScrollView>
                        <View style={methodsStyles.container}>
                            <Text>Maksutavat</Text>
                            <CheckBox
                                checkedColor='green'
                                title='Korttimaksu uudella maksukortilla'
                                checked={this.state.newcard}
                                checkedIcon='check-square-o'
                                uncheckedIcon='square-o'
                                onPress={() => { this.checkPay("newcard") }}
                            />
                            <CheckBox
                                checkedColor='green'
                                title='Korttimaksu viimeksi käytetyllä maksukortilla'
                                checked={this.state.oldcard}
                                onPress={() => { this.checkPay("oldcard") }}
                                disabled={this.state.cardNotFound}
                            />
                            <Text>Lähetysvaihdoehdot</Text>
                            <CheckBox
                                checkedColor='green'
                                title='Nouto Postista'
                                checked={this.state.post}
                                checkedIcon='check-square-o'
                                uncheckedIcon='square-o'
                                onPress={() => { this.checkDelivery("post") }}
                            />
                            <CheckBox
                                checkedColor='green'
                                title='Kotiin'
                                checked={this.state.homeDelivery}
                                onPress={() => { this.checkDelivery("home") }}
                            />


                        <TouchableOpacity
                            disabled={!this.state.isChecked}
							onPress={() =>{this.handleSubmit(); this.props.navigation.navigate('OrderCreation');}}>
							<LinearGradient colors={primaryGradientColorsButton} style={[theme.linearGradient]}>	
								<Text style={{color: '#fff', fontWeight: 'bold', marginLeft: 10}}>Jatka</Text>
							</LinearGradient>
						</TouchableOpacity>

                        </View>
                    </ScrollView>
                </LinearGradient>
            );
        }
    }
}

const mapDispatchToProps = dispatch => (
	bindActionCreators({ addMethods }, dispatch));

export default connect(null, mapDispatchToProps)(Methods);
