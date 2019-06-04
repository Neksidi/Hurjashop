import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { View, StyleSheet, Text, ScrollView, Button, TouchableOpacity, TextInput, FlatList } from 'react-native';
import ButtonDefault from '../components/defaultButton'
import { theme , primaryGradientColors, styles} from '../../../app/styles/global'
import ReviewItem from '../components/reviewItem'
//import { Logo, Drawer, Cart, } from '../navigation/options/Items'
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'
//import { WEB_URL, DB_URL } from '../redux/actiontypes'
import { reviewStyles } from '../styles/reviewStyles'
import LinearGradient from 'react-native-linear-gradient';
import { addPayment } from '../../payment/redux/paymentActions'

class Review extends Component {
    static navigationOptions = {
		headerStyle: {
            backgroundColor: theme.color.navigation.background,
        },
        headerTitle: "Yhteenveto",
        headerTintColor: 'white',
    };

    componentDidMount(){
        console.log("Review screen")
    }

    /*removeOrder = () => {
        console.log("remove alku")
        return fetch(WEB_URL + "/orders/" + this.props.order.id, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(WEB_URL + "/products");
                this.setState({
                    data: responseJson
                }, function () {
                    console.log("order removed")
                    this.removeFromDatabase()

                });
            })
            .catch((error) => {
                console.error(error);
            });
    }*/

    /*removeFromDatabase(){
        return fetch(DB_URL + "/order/remove", {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.props.order.id,
                customer: this.props.contact.id,
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(DB_URL + "/order/remove");
                this.setState({
                    remove: responseJson
                }, function () {
                    console.log("order removed")
                    this.responseParser()

                });
            })
            .catch((error) => {
                console.error(error);
            });
    }*/

    /*responseParser() {
        console.log('remove status',this.state.remove)
        if (this.state.data == 200 && this.state.remove.status == 200) {
            return (
                  this.props.navigation.pop(2)
            );
        } else {
            return (
                <View>
                    <Text>EI MENNY IHAN PUTKEEN</Text>
                </View>
            );
        }
    }*/

    async handleSubmit() {
    //TODO
    //Tilauksen statuksen muuttaminen
    var payment = {
        "first_name": this.props.order.billing.first_name,
		"last_name": this.props.order.billing.last_name,
		"total": this.props.order.total,
		"currency": this.props.order.currency,
		"lang": "FI",
		"id": this.props.order.id,
		"order_key": this.props.order.order_key,
    }
    console.log("Adding payment data")
    console.log(payment)
    await this.props.addPayment(payment);
    }

    getSum(products) {
        let sum = 0;
        products.map((item, i) => {
            sum += parseFloat(item.total);
            sum += parseFloat(item.total_tax);
        })
        return sum.toFixed(2);
    }
    getTotal(products) {
        let sum = 0;
        products.map((item, i) => {
            sum += parseFloat(item.total);
        })
        return sum.toFixed(2);
    }   
     getTaxes(products) {
        let sum = 0;
        products.map((item, i) => {
            sum += parseFloat(item.total_tax);
        })
        return sum.toFixed(2);
    }


    render() {
        console.log("Review render");
        console.log(this.props.order);
        var currency = "";
        switch (this.props.order.currency) {
            case "EUR": {
                currency = "€";
            }
            default: 
                break;
        }
        return (
                <LinearGradient 
                    start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                    colors={primaryGradientColors} 
                    style={[styles.linearGradient, theme.inputScreenContainer, {height:'100%'}]}>
                    <ScrollView>
                        <View>
                            <View style={reviewStyles.item}>
                                <Text style={reviewStyles.header}>Valitut tuotteet</Text>
                                <FlatList data={this.props.order.line_items} renderItem={({ item }) => 
                                    <ReviewItem
                                        data={item} 
                                        currency={currency} 
                                        onPress={() => this._onPress(item)} 
                                        parentFlatList={this} />}>
                                </FlatList>
                            <Text style={reviewStyles.text}>Tuotteet yhteensä: {this.getSum(this.props.order.line_items)}{currency}</Text>
                        </View>
                        <View style={reviewStyles.item}>
                            <Text style={reviewStyles.header}>Laskutustiedot</Text>
                            <Text style={reviewStyles.row1}>Osoite: {this.props.order.billing.address_1}</Text>
                            <Text style={reviewStyles.row2}>Postitoimipaikka: {this.props.order.billing.city}</Text>
                            <Text style={reviewStyles.row1}>Postinumero: {this.props.order.billing.postcode}</Text>
                            <Text style={reviewStyles.row2}>Sähköpostiosoite: {this.props.order.billing.email}</Text>
                            <Text style={reviewStyles.row1}>Etunimi: {this.props.order.billing.first_name}</Text>
                            <Text style={reviewStyles.row2}>Sukunimi: {this.props.order.billing.last_name}</Text>
                            {/*<Text>{this.props.order.id}</Text>*/}
                            <Text style={reviewStyles.row1}>Tilausnumero: {this.props.order.order_key}</Text>
                            {/*<Text>{this.props.order.payment_method}</Text>*/}
                            <Text style={reviewStyles.row2}>Maksutapa: {this.props.order.payment_method_title}</Text>
                        </View>
                        <View style={reviewStyles.item}>
                            <Text style={reviewStyles.header}>Toimitustiedot</Text>
                            <Text style={reviewStyles.row1}>Osoite: {this.props.order.shipping.address_1}</Text>
                            <Text style={reviewStyles.row2}>Postitoimipaikka: {this.props.order.shipping.city}</Text>
                            <Text style={reviewStyles.row1}>Etunimi: {this.props.order.shipping.first_name}</Text>
                            <Text style={reviewStyles.row2}>Sukunimi: {this.props.order.shipping.last_name}</Text>
                            <Text style={reviewStyles.row1}>Postinumero: {this.props.order.shipping.postcode}</Text>
                            {/*<Text>{this.props.order.shipping_lines.method_id}</Text>*/}
                            <Text style={reviewStyles.row2}>Toimitus: {this.props.order.shipping_lines[0].method_title}</Text>
                            <Text style={reviewStyles.row1}>Toimituksen hinta: {this.props.order.shipping_lines[0].total}{currency}</Text>
                            {/*<Text>{this.props.order.status}</Text>*/}
                        </View>
                        <View style={reviewStyles.item}>
                            <Text style={reviewStyles.row1}>Tuotteet yhteensä: {this.getTotal(this.props.order.line_items)}{currency}</Text>
                            <Text style={reviewStyles.row2}>Alv: {this.getTaxes(this.props.order.line_items)}{currency}</Text>
                            <Text style={reviewStyles.row1}>Toimitus: {this.props.order.shipping_lines[0].total}{currency}</Text>
                            <Text style={reviewStyles.text}>Kaikki yhteensä {this.props.order.total}{currency}</Text>
                        </View>

                        <ButtonDefault text="Maksamaan" type="success" onPress={() => { this.handleSubmit(); this.props.navigation.navigate('Payment', {'method': true}); }} style={reviewStyles.signupButton} />
                    </View>
                </ScrollView>
            </LinearGradient>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        shipping: state.user.shipping,
        methods: state.user.methods,
        cart: state.cart.cart,
        contact: state.user.contact,
        order: state.orders.new,
    }
}

const mapDispatchToProps = dispatch => (
	bindActionCreators({ addPayment }, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Review);
