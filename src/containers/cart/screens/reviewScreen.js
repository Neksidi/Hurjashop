import { connect } from 'react-redux'
import React, { Component } from 'react'
import { View, StyleSheet, Text, ScrollView, Button, TouchableOpacity, TextInput, FlatList } from 'react-native';
//import ButtonDefault from '../components/common/buttons/Default'
import { theme } from '../../../app/styles/global'
//import Item from '../components/list/review/Item'
//import { Logo, Drawer, Cart, } from '../navigation/options/Items'
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'
//import { WEB_URL, DB_URL } from '../redux/actiontypes'
import { reviewStyles } from '../styles/reviewStyles'


const icon_size = 25;
const icon_color = theme.color.navigation.main;

// Global styles
// HUOM. Takaisin paluu tekee vieläkin 2 tilausta yhdellä painalluksella!

class Review extends Component {
    
    static navigationOptions = {
		headerStyle: {
            backgroundColor: theme.color.navigation.background,
        },
        headerTitle: "Tarkista tilauksesi",
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

    handleSubmit = () => {
    //TODO
    //Tilauksen statuksen muuttaminen
    };
    getSum = (products) => {
        let sum = 0;
        console.log(products);
        for (let i = 0; i < products.length; i++) {
            let product_price = products[i].price * products[i].quantity;
            sum += product_price;
        }
        return sum;
    }

    render() {
        console.log("Review render");
        console.log(this.props.order);
        return (
            <ScrollView>
                <View>
                    <View style={reviewStyles.item}>
                        <Text>Valitut tuotteet</Text>
                        <FlatList style={reviewStyles.list} data={this.props.order.line_items[0]} renderItem={({ item }) => <Item data={item} onPress={() => this._onPress(item)} parentFlatList={this} />}></FlatList>
                        <Text>Yhteensä: {this.getSum(this.props.order.line_items[0])}€</Text>
                    </View>
                    <View style={reviewStyles.item}>
                        <Text>Laskutustiedot</Text>
                        <Text>{this.props.order.billing_address}</Text>
                        <Text>{this.props.order.billing_city}</Text>
                        <Text>{this.props.order.billing_email}</Text>
                        <Text>{this.props.order.billing_first_name}</Text>
                        <Text>{this.props.order.billing_last_name}</Text>
                        <Text>{this.props.order.billing_postcode}</Text>
                        <Text>{this.props.order.currency}</Text>
                        <Text>{this.props.order.id}</Text>
                        <Text>Tilausnumero: {this.props.order.order_key}</Text>
                        <Text>{this.props.order.payment_method}</Text>
                        <Text>Maksutapa: {this.props.order.payment_method_title}</Text>
                    </View>
                    <View style={reviewStyles.item}>
                        <Text>Toimitustiedot</Text>
                        <Text>Osoite: {this.props.order.shipping_address}</Text>
                        <Text>Postitoimipaikka: {this.props.order.shipping_city}</Text>
                        <Text>Etunimi: {this.props.order.shipping_first_name}</Text>
                        <Text>Sukunimi: {this.props.order.shipping_last_name}</Text>
                        <Text>Postinumero: {this.props.order.shipping_postcode}</Text>
                        <Text>{this.props.order.shipping_lines.shipping_method_id}</Text>
                        <Text>Toimitustapa: {this.props.order.shipping_lines.shipping_method_title}</Text>
                        <Text>Toimitustavan hinta: {this.props.order.shipping_lines.shipping_total}</Text>
                        <Text>{this.props.order.status}</Text>
                        <Text>Kaikki Yhteensä {this.props.order.total}€</Text>

                        <Text>Maksu -ja postitustapa</Text>
                        <Text>Maksutapa:{this.props.methods.payment_method}</Text>
                        <Text>Selitys:{this.props.methods.payment_method_title}</Text>
                        <Text>Postitustapa:{this.props.methods.shipping_method}</Text>
                        <Text>Selitys:{this.props.methods.payment_method_title}</Text>
                    </View>

                    <ButtonDefault text="Maksamaan" type="success" onPress={() => { this.handleSubmit(); this.props.navigation.navigate('PaymentHighway'); }} style={reviewStyles.signupButton} />
                </View>
            </ScrollView>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        shipping: state.user.shipping,
        methods: state.user.methods,
        cart: state.cart.cart,
        contact: state.user.contact,
        order: state.orders.new,
    }
}

export default connect(mapStateToProps, null)(Review);
