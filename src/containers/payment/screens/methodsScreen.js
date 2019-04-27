
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {  View, StyleSheet, Text, AsyncStorage, ActivityIndicator, ScrollView, Button, TouchableOpacity, TextInput } from 'react-native';
import { bindActionCreators } from 'redux';
import { theme } from '../../../app/styles/global'
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'
import { CheckBox } from 'react-native-elements'
import { POSTI_URL } from '../../../app/config'
import Loader from '../components/loader/loader'



class Methods extends Component {
	constructor(props) {
		super(props);
		this.state = {
            //Postitustavat
            isLoading: true,
            post: false,
            home: false,
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
        if (this.state.isChecked && this.state.post && !this.postIsSelected()) {
            this.setState({ isChecked: false })
        }
        if (!this.state.isChecked && ((this.state.post && this.postIsSelected()) || this.state.home) && (this.state.newcard || this.state.oldcard)) {
            console.log("Nice")
            this.setState({ isChecked: true });
        }
        if (prevState.post === false && this.state.post === true) {
            console.log("WHY")
            this.setState({ isLoadingPoints: true })
            this.getPickUps(70600);
        }

    }
	
    handleSubmit = () => {
        let total = null;
        switch (this.state.shipping_method) {
            case "post":
                total = '10'
                break;
            case "home":
                console.log("home")
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
	
    postcodeHandler() {
        //TODO syötteen validointi

        this.setState({ isLoadingPoints: true })
        this.getPickUps(this.state.postcode.text);

    }

    getPickUps(postcode) {
        console.log("postcode:", postcode)
        return fetch(POSTI_URL + '/' + postcode + '/closest', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                //auth: this.state.auth
            },

        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(POSTI_URL);
                console.log("Pisteet noudettu")
                this.setState({
                    points: responseJson,
                    isLoadingPoints: false,
                },
                );

            })
            .catch((error) => {
                console.error(error);
            });
    }

    renderPoints() {
        console.log("Points:", this.state.points)
        if (this.state.points == null || this.state.points.length == 0) {
            console.log("Points virhe");
            return (<View>
                <Text>Virhe toimipisteiden haussa. Tarkista antamasi postinumero ja yritä uudestaan.</Text>
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
            this.state.post ? (this.setState({ post: false, home: false, isChecked: false })) : (this.setState({ post: true, home: false, shipping_method: "post", shipping_method_title: "Nouto Postista" }));
        } else if (box === "home") {
            this.state.home ? (this.setState({ home: false, post: false, isChecked: false })) : (this.setState({ home: true, post: false, shipping_method: "home", shipping_method_title: "Kotiinkuljetus" }));
        }
	}
	checkPay = (card) => {
        if (card === "newcard") {
            this.state.newcard ? (this.setState({ newcard: false, oldcard: false, isChecked: false })) : (this.setState({ newcard: true, oldcard: false, payment_method: "nCard", payment_method_title: "Korttimaksu uudella kortilla" }));
        } else if (card === "oldcard") {
            this.state.oldcard ? (this.setState({ oldcard: false, newcard: false, isChecked: false })) : (this.setState({ oldcard: true, newcard: false, payment_method: "oCard", payment_method_title: "Korttimaksu" }));
        }
    }


	render() {
		
		if (this.state.isLoading) {
            return (
                <Loader />
            )
        }
        else if (this.state.post) {
			let postiPoints = !this.state.isLoadingPoints ? this.renderPoints() : (<Loader />);
			
            return (
                <ScrollView>
                    <View style={styles.container}>
                        <Text>Maksutavat</Text>
                        <CheckBox
                            title='Korttimaksu uudella maksukortilla'
                            checked={this.state.newcard}
                            checkedIcon='check-square-o'
                            uncheckedIcon='square-o'
                            onPress={() => { this.checkPay("newcard") }}
                        />
                        <CheckBox
                            title='Korttimaksu viimeksi käytetyllä maksukortilla'
                            checked={this.state.oldcard}
                            onPress={() => { this.checkPay("oldcard") }}
                            disabled={this.state.cardNotFound}
                        />
                        <Text>Lähetysvaihdoehdot</Text>
                        <View style={styles.postBar}>
                            <Text>Noutopisteiden haku postinumerolla: </Text>
                            <TextInput style={styles.postcodeInput} placeholder='12345' onChangeText={(text) => this.setState({ postcode: { text } })} onSubmitEditing={(event) => this.postcodeHandler()} />
                        </View>
                        <CheckBox
                            title='Nouto Postista'
                            checked={this.state.post}
                            checkedIcon='check-square-o'
                            uncheckedIcon='square-o'
                            onPress={() => { this.checkDelivery("post") }}
                        />
                        {postiPoints}

                        <CheckBox
                            title='Kotiin'
                            checked={this.state.home}
                            onPress={() => { this.checkDelivery("home") }}
                        />
                        <Button disabled={!this.state.isChecked} title="Jatka" type="success" onPress={() => { this.handleSubmit(); this.props.navigation.navigate('Order'); }} style={styles.signupButton} />
                    </View>
                </ScrollView>
            );
        }
        else {
            return (
                <ScrollView>
                    <View style={styles.container}>
                        <Text>Maksutavat</Text>
                        <CheckBox
                            title='Korttimaksu uudella maksukortilla'
                            checked={this.state.newcard}
                            checkedIcon='check-square-o'
                            uncheckedIcon='square-o'
                            onPress={() => { this.checkPay("newcard") }}
                        />
                        <CheckBox
                            title='Korttimaksu viimeksi käytetyllä maksukortilla'
                            checked={this.state.oldcard}
                            onPress={() => { this.checkPay("oldcard") }}
                            disabled={this.state.cardNotFound}
                        />
                        <Text>Lähetysvaihdoehdot</Text>
                        <CheckBox
                            title='Nouto Postista'
                            checked={this.state.post}
                            checkedIcon='check-square-o'
                            uncheckedIcon='square-o'
                            onPress={() => { this.checkDelivery("post") }}
                        />
                        <CheckBox
                            title='Kotiin'
                            checked={this.state.home}
                            onPress={() => { this.checkDelivery("home") }}
                        />
                        <Button disabled={!this.state.isChecked} title="Jatka" type="success" onPress={() => { this.handleSubmit(); this.props.navigation.navigate('Order'); }} style={styles.signupButton} />
                    </View>
                </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 0,
        padding: 20,
    },
    postBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    postcodeInput: {
        width: 50,
        backgroundColor: 'white'
    },
    textInput: {
        width: '100%',
        height: 40,
        borderRadius: 3,
        borderWidth: 1,
    },
    inputContainer: {
        marginVertical: 10,
    },
    label: {
        marginBottom: 5,
    },
    checkBoxContainer: {
        justifyContent: 'center',
    },
    cardButton: {
        height: 50,
        width: '100%',
        elevation: 2,
        borderRadius: 5,
        marginBottom: 10,
        paddingVertical: 1,
        paddingLeft: 8,
        position: 'relative',
        shadowColor: '#000000',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'skyblue'
    },
});


export default (Methods);
