import { connect } from 'react-redux'
import React, { Component } from 'react'
import { View, ActivityIndicator, Animated, Text } from 'react-native';
import { addOrder } from '../redux/orderActions'
import { theme, primaryGradientColors, styles } from '../../../app/styles/global'
import { createOrder } from '../controllers/orderController'
import { bindActionCreators } from 'redux';
import CustomHeader from '../../../app/components/header/customHeader'
import LinearGradient from 'react-native-linear-gradient';

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0)

        }
    }

    static navigationOptions = {
		headerStyle: {
			backgroundColor: theme.color.navigation.background,
			height: theme.navigation.height,
		},
		headerTitle: <CustomHeader/>,
		headerLeft: (
			<View></View> //needed to justify logo in center		
		),
	};


    async componentDidMount() {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue:1,
                duration:1500,
                delay: 500,
                useNativeDriver: true,
            }
        ).start()
        await this.formOrder();

      
    }


    async formOrder() {
            var order = {
                    "customer_id:": 105, 
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
            var newOrder = await createOrder(order);
            this.props.addOrder(newOrder);
            this.props.navigation.navigate('OrderReview')
    }
    
    

    render() {
        
        let {fadeAnim}=this.state
        let output = (<ActivityIndicator size="large" color={theme.color.highlight.secondary} style={{ marginTop: 20 }} />);

        return (
                <LinearGradient 
                    start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                    colors={primaryGradientColors} 
                    style={[styles.linearGradient, theme.inputScreenContainer, {height:'100%'}]}>
                    <View style={styles.container}>
                        <Animated.View style={{opacity: fadeAnim}}>
                           
                             {output}
                             <Text style={styles.orderText}>Tilausta luodaan</Text> 
                            
                        </Animated.View>

                    </View>
                </LinearGradient>
        );
    }
}


const mapStateToProps = (state) => {
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
