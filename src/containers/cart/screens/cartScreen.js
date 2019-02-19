import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, FlatList, TouchableOpacity,} from 'react-native';
import { bindActionCreators } from 'redux';



//VECTOR icons
import FeatherIcon from 'react-native-vector-icons/dist/Feather'
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'

class Cart extends Component {
	constructor(props) {
		super(props);
	}

	static navigationOptions = {
		headerStyle: {
      backgroundColor: '#fcf',
    },
    headerTitle: "Ostoskori",
 
  };

  //Kesken
  _onDelete(item) {
    this.props.removeItem(item);
    this.forceUpdate();
  }
  //Kesken
  getProductPrice(product_id){
    for(i in this.props.products){
      if(this.props.products[i].id == product_id){
        return this.props.products[i].price;
      }
    }
  }
  //Kesken
  _calcTotalPrice(){
    let total = 0.00;
    let price, quantity;
    for(i in this.props.cart){
      quantity = this.props.cart[i].quantity;
      price = (parseFloat(this.getProductPrice(this.props.cart[i].product_id)));
      total += (price * quantity)
    }
    return Price.priceToString(total) + '€';
  }
  //Kesken
  handleCartEmptyDialog(status){
    if(status){this.props.emptyCartItems()}
  }

  handleContinueButtonPress(){
      this.props.navigation.navigate('Shipping')
  } 

	render() {
		return (
			<View>
      <ScrollView>
            <View >
              <View >
                <FeatherIcon name='package' size={30} color='#292929' />
              </View>
              <View >
                <Text >Product Count</Text>
                <Text >ostoskorissa</Text>
              </View>
              <View >
                <TouchableOpacity onPress={() => {this.refs.popup.show()}} >
                  <Text >Tyhjennä</Text>
                  <FeatherIcon name='trash-2' size={25} color='#292929' />
                </TouchableOpacity>
              </View>
            </View>


            <View />

          </ScrollView>
        <View>
              <Text style={{fontWeight: 'bold', fontSize: 14, color: '#292929'}}>SUMMA</Text>
              <Text style={{fontFamily: 'BarlowCondensed-Medium', fontSize: 21, color: '#292929'}}>{'Total price here'}</Text>
              <Text style={{fontSize: 10}}>sis. alv</Text>
            </View>
            <Button title="Kassalle" onPress={() => { this.handleContinueButtonPress(); }}  />
			</View>
		);
	} 
}

export default (Cart);

