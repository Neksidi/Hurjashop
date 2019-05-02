import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { View, StyleSheet, Text, ScrollView, Button, TouchableOpacity, TextInput, FlatList } from 'react-native';
import ButtonDefault from '../components/defaultButton'
import { theme , primaryGradientColors, styles} from '../../../app/styles/global'
import ReviewItem from '../components/reviewItem'
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'
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
    }

   
    async handleSubmit() {
   
    var payment = {
        "first_name": this.props.order.billing.first_name,
		"last_name": this.props.order.billing.last_name,
		"total": this.props.order.total,
		"currency": this.props.order.currency,
		"lang": "FI",
		"id": this.props.order.id,
		"order_key": this.props.order.order_key,
    }
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

    render() {
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
                            <Text>Valitut tuotteet</Text>
                            <FlatList style={reviewStyles.list} data={this.props.order.line_items} renderItem={({ item }) => 
                                <ReviewItem 
                                    data={item} 
                                    currency={currency} 
                                    onPress={() => this._onPress(item)} 
                                    parentFlatList={this} />}>
                            </FlatList>
                            <Text style={reviewStyles.text}>Tuotteet yhteensä: {this.getSum(this.props.order.line_items)}{currency}</Text>
                        </View>
                        <View style={reviewStyles.item}>
                            <Text>Laskutustiedot</Text>
                            <Text>{this.props.order.billing.address_1}</Text>
                            <Text>{this.props.order.billing.city}</Text>
                            <Text>{this.props.order.billing.email}</Text>
                            <Text>{this.props.order.billing.first_name}</Text>
                            <Text>{this.props.order.billing.last_name}</Text>
                            <Text>{this.props.order.billing.postcode}</Text>
                            {}
                            <Text>Tilausnumero: {this.props.order.order_key}</Text>
                            {}
                            <Text>Maksutapa: {this.props.order.payment_method_title}</Text>
                        </View>
                        <View style={reviewStyles.item}>
                            <Text>Toimitustiedot</Text>
                            <Text>Osoite: {this.props.order.shipping.address_1}</Text>
                            <Text>Postitoimipaikka: {this.props.order.shipping.city}</Text>
                            <Text>Etunimi: {this.props.order.shipping.first_name}</Text>
                            <Text>Sukunimi: {this.props.order.shipping.last_name}</Text>
                            <Text>Postinumero: {this.props.order.shipping.postcode}</Text>
                            {}
                            <Text>Toimitus: {this.props.order.shipping_lines[0].method_title}</Text>
                            <Text>Toimituksen hinta: {this.props.order.shipping_lines[0].total}{currency}</Text>
                            {}
                        </View>
                        <View style={reviewStyles.item}>
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
