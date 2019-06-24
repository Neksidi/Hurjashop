import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Header } from 'react-navigation';
import { View, Platform, Text, Image, Button, TouchableOpacity} from 'react-native';
import { styles, theme } from '../../../app/styles/global'
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'
import NavigationService from '../../../navigation/navigators/NavigationService'
import { getCartQuantity } from '../../../containers/cart/controllers/helper'

const icon_size = 25;
const icon_color = theme.color.navigation.main;

class CustomHeader extends Component {
  constructor(props) {
		super(props);
  }

	_onPress(){
		//this.props.navigation.navigate('Cart')
		console.log("Cart")
		console.log("propsit",this)
		this.props.goToCart();
	}

    render() {

			//TODO cart badge
		let logoSize = this.props.small == true ? (styles.logoSmall) : (styles.logo);
		let logoTop = this.props.small == true ? (0) : (30);

        return (
		    /*<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
			    <View style={{ flex: 1, paddingLeft: 10 }}>
				   
			    </View>
			    <View style={{ flex: 1, top: 30, flexDirection: 'row', justifyContent: 'center'}}>
				    <Image style={styles.logo} source={require('../../../assets/images/hurja_shop_logo.png')} />
			    </View>
			    <View style={{flex: 1}}> 
                    <Button
				        onPress={() => alert('This is a button!')}
			        	title="Info"
				        color="green"
			        />
                </View>
			</View>*/
			<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
			   
			    <View style={{ flex: 1, top: logoTop, flexDirection: 'row', justifyContent: 'center'}}>
				    <Image style={logoSize} source={require('../../../assets/images/hurja_shop_logo.png')} />
			    </View>
				<View > 
					<TouchableOpacity onPress={ () => this._onPress() } style={styles.headerContainer}>
       				 	<FAIcon name={ 'shopping-cart' } size={ icon_size } color={ icon_color } style={ styles.icon } ></FAIcon>
      				</TouchableOpacity>
                </View>
			
		    </View>
        );
	}
	
};
const mapStateToProps = (state) => {
  const products = state.products.all
  const cart = state.cart.cart
	const user = state.user.contact
	return { products, cart , user}
};

	
export default connect(mapStateToProps, null)(CustomHeader);


