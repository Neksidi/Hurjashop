import { connect } from 'react-redux'
import React, { Component } from 'react'
import { View, ActivityIndicator } from 'react-native';
import { addOrder } from '../redux/orderActions'
import { theme } from '../../../app/styles/global'
import { createOrder } from '../controllers/orderController'
import { bindActionCreators } from 'redux';

class Order extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
        };
    }

/*
    authenticate() {
        console.log('retrieve order')
        try {
            console.log('Order - before storage')
            AsyncStorage.getItem('user').then((user) => {
                user = JSON.parse(user)
                console.log('Order - after storage')
                if (user.auth == null) {
                    console.log('token null')
                    this.setState({ forceLogin: true })
                } else {
                    console.log(user.auth)
                    console.log('token found orderiino')
                    this.setState({
                        auth: user.auth,
                    })
                }
            })

        } catch (error) {
            console.log(error)
        }
	}
	*/

    /*componentDidUpdate(prevProps, prevState) {
        if (prevState.auth === null && this.state.auth !== null) {
            this.createOrder()
        }
    }*/
    async componentDidMount() {
        await this.formOrder();
    }

    async formOrder() {
            var order = {
                    "customer_id:": 105, //this.props.contact.id,
                    "payment_method": this.props.methods.payment_method,
                    "payment_method_title": this.props.methods.payment_method_title,
                    "set_paid": false,
                    "billing": {
                        "first_name": this.props.contact.first_name,
                        "last_name": this.props.contact.last_name,
                        "address_1": this.props.contact.address,
                        "address_2": "",
                        "city": this.props.contact.city,
                        "state": "",
                        "postcode": this.props.contact.zipcode,
                        "country": "",
                        "email": this.props.contact.email,
                        "phone": ""
                    },
                    "shipping": {
                        "first_name": this.props.shipping.first_name,
                        "last_name": this.props.shipping.last_name,
                        "address_1": this.props.shipping.address,
                        "address_2": "",
                        "city": this.props.shipping.city,
                        "state": "",
                        "postcode": this.props.shipping.zipcode,
                        "country": ""
                    },
                    "line_items": this.props.cart,
                    "shipping_lines": [
                        {
                            "method_id": this.props.methods.shipping_method,
                            "method_title": this.props.methods.shipping_method_title,
                            "total": this.props.methods.shipping_total
                        }
                    ]
            }
            console.log(order)
            var newOrder = await createOrder(order);
            addOrder(newOrder);
            this.props.navigation.navigate('OrderReview')
    }
    
    /*
        componentWillUnmount() {
            this.props.navigation.pop()
        }*/

        /*
    saveToDatabase(order) {
        return fetch(DB_URL + "/order/add", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                auth: this.state.auth
            },
            body: JSON.stringify(
                {
                    "customer": this.props.contact.id,
                    "id": order.id,
                }
            )
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(WEB_URL + "/products");
                console.log("UUSI TILAUS LÄHETETTY")
                console.log(responseJson)
                this.setState({
                    database: responseJson,
                }, function () {
                    console.log(responseJson.status)
                    if (responseJson.status === 200) {
                        this.setState({
                            isLoading: false,
                        })

                        //Varoitus?: return ja pop hax
                        console.log("Jaa")
                        this.props.navigation.navigate('Review')
                    } else {
                        console.log("Virhe tilauksen tallennuksessa")
                    }

                });

            })
            .catch((error) => {
                console.error(error);
            });
    }
    */

    render() {
        let output = (<ActivityIndicator size="large" color={theme.color.highlight.secondary} style={{ marginTop: 20 }} />);

        return (
            <View>
                {output}
            </View>
        );
    }
}


let mapStateToProps = (state) => {
    return {
        cart: state.cart.orderCart,
        contact: state.user.contact,
        shipping: state.user.shipping,
        methods: state.user.methods,
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({ addOrder }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Order);
