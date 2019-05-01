import { connect } from 'react-redux';
import React, { Component } from 'react';
import {TextInput, Alert, ChildComponent, View, Text, Button, ScrollView, StyleSheet, List, TouchableOpacity,Dimensions, Image, SlideUp} from 'react-native';
import { ListItem } from 'react-native-elements'
import { bindActionCreators } from 'redux';
import {btn, theme, styles, primaryGradientColors, primaryGradientColorsButton } from '../../../app/styles/global'
import { getProducts } from '../../product/controllers/requests'
import { setProducts } from '../../product/redux/productActions'
import Gallery from '../../../app/components/common/images/gallery'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import Loader from '../../../app/components/common/loader/loader'
import cartItem from '../components/cartItem'
import { getQuantity } from '../controllers/helper'
import { emptyCart, parseCart, increaseCartQuantity, decreaseCartQuantity, removeFromCart } from '../redux/cartActions'
import LinearGradient from 'react-native-linear-gradient';

//VECTOR icons
import FeatherIcon from 'react-native-vector-icons/dist/Feather'
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'


//import Price from '../utility/Price'
let { width, height } = Dimensions.get('screen');


class Cart extends Component {
	constructor(props) {
    super(props);
    this.state = {
  
    }

  }
  

	static navigationOptions = {
		headerStyle: {
      backgroundColor: theme.color.navigation.background,
    },
    headerTitle: "Ostoskori",
    headerTintColor: 'white',
 
  };

  componentDidMount() {
    this.setState({item: this.props.navigation.getParam('item', null)});
  }

  //Kesken
  _deleteItem(item) {
    this.props.removeItem(item);
  }

  clearCart() {
      Alert.alert(
        'Tyhjennä roskakori',
        'Oletko varma, että haluat tyhjentää ostoskorin?',
        [
          {text: 'Peruuta', style: 'cancel'},
          {text: 'Tyhjennä ostoskori', onPress: () => {
              this.props.emptyCart();
             
            }
          },
        ]
      );
  }

  
  renderItem(item){
    return(
      <View key={item.id} style={{ flex: 1 }}>
        <Text>{item.name}</Text>
      </View>
    );

  }

  
  calcTotalPrice(){
    let total = 0.00;
    let price, quantity;

    if(this.props.cart) {
      for(i in this.props.cart){
        quantity = this.props.cart[i].quantity;
        price = (parseFloat(this.props.cart[i].price));
        total += (price * quantity)
      } 

      total = parseFloat(total);

      if(isNaN(total)) {
        total = 0;
      }
    }
    
    return total.toFixed(2).toString().replace('.', ',') + ' €';
  }
  

  handleContinueButtonPress(){
    this.props.parseCart();
    this.props.navigation.navigate('Shipping');
  } 

  priceToString(price) {
    return parseFloat(price).toFixed(2).toString().replace('.', ',');
  }



  renderRightElement(item) {

    let decreaseDisabled = true;
    if(getQuantity(this.props, item.id) > 1) {
      decreaseDisabled = false;
    }

    let increaseDisabled = true;
    if((item.stock_quantity > getQuantity(this.props, item.id)) ||
      (item.in_stock == false && item.stock_quantity == null)) {
      increaseDisabled = false;
    }

    return (
      <View style ={{flex: 1,flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <TouchableOpacity
          disabled={decreaseDisabled}
          style={[btn.default, {height:20, width:20, justifyContent: 'center', alignItems: 'center'}]}
          onPress={() => {
            this.props.decreaseCartQuantity(item);
            this.forceUpdate();
          }}
          >
          <FeatherIcon name='minus' size={15} color='#292929' />
        </TouchableOpacity>

        <Text style={{fontWeight: 'bold', fontSize: 14, color: 'black', justifyContent: 'center', alignItems: 'center'}}>{getQuantity(this.props, item.id)}</Text>

        <TouchableOpacity
          disabled={increaseDisabled}
          style={[btn.default, {height:20, width:20, justifyContent: 'center', alignItems: 'center'}]}
          onPress={() => {
            this.props.increaseCartQuantity(item);
            this.forceUpdate();
          }}
          >
          <FeatherIcon name='plus' size={15} color='#292929' />
        </TouchableOpacity>

        <TouchableOpacity
          style={[btn.default, {height:20, width:20, justifyContent: 'center', alignItems: 'center'}]}
          onPress={() => {
            Alert.alert(
              'Poista tuote ostoskorista',
              'Oletko varma, että haluat poistaa tuotteen '+ item.name+ ' ostoskorista?',
              [
                {text: 'Peruuta', style: 'cancel'},
                {text: 'Poista tuote', onPress: () => {
                    this.props.removeFromCart(item);
                    this.forceUpdate();
                  }
                },
              ]
            );
            }}
          >
          <FeatherIcon name='trash-2' size={15} color='#292929' />
        </TouchableOpacity>
        
      </View>
    );
  }
  
	render() {
    let productCount = 
      this.props.cart.length === 1 ? (
        <Text style={cartStyle.cartHeaderText}>1 tuote ostoskorissa</Text>
      ) : ( 
        (this.props.cart.length == 0) ? (
          <Text style={cartStyle.cartHeaderText}>Ostoskori on tyhjä</Text>
        ) : (
          <Text style={cartStyle.cartHeaderText}>{this.props.cart.length} tuotetta ostoskorissa</Text>
        )
        
      );  

    

     let cartContainer =
     this.props.cart ? (
          this.props.cart.map((item, i) => {

            let priceText = item.quantity > 1 ? (
              this.priceToString(item.price*item.quantity) + " € ("+this.priceToString(item.price)+" €/kpl)"
            ) : (
              this.priceToString(item.price*item.quantity) + " €"
            );

            return (
              <ListItem
                style={{backgroundColor: "transparent"}}
                key={item.id}
                title={item.name}
                subtitle={priceText}
                titleStyle={{ color: 'black', fontWeight: 'bold' }}
                subtitleStyle={{ color: 'black' }}
                leftAvatar={{ source: { uri: item.images[0].src } }}
                rightElement={this.renderRightElement(item)}
                containerStyle={{backgroundColor: '#9be9ff'}}
              />
            )
          })
      
     ) : (
       <View/>
     );

     let showPrice = 
     this.props.cart ? (
        <Text style={{fontWeight: 'bold', fontSize: 14, color: '#292929'}}>{this.calcTotalPrice()}</Text>
     ) : (
        <Text style={{fontWeight: 'bold', fontSize: 14, color: '#292929'}}> 0€</Text>
     );

		  return (
        
        <LinearGradient 
            start={{x: 0, y: 0}} end={{x: 1, y: 1}}
            colors={primaryGradientColors} 
            style={[styles.linearGradient, theme.inputScreenContainer, {height:'100%'}]}>

          <View style={cartStyle.container}>
          <ScrollView>
                <View style={cartStyle.cartHeaderContainer}>
                  <View style={cartStyle.cartHeaderIconContainer}>
                    <FeatherIcon name='package' size={30} color='#292929' />
                  </View>
                  <View style={cartStyle.cartHeaderTextContainer}>
                    {productCount}
                  </View >
                  <View style={cartStyle.emptyCartContainer}>
                    <TouchableOpacity disabled={this.props.cart.length == 0} onPress={() => {this.clearCart()}} style={cartStyle.emptyCartButton}>
                      <Text style={cartStyle.emptyCartButtonText}>Tyhjennä</Text>
                      <FeatherIcon name='trash-2' size={25} color='#292929' />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{backgroundColor: "transparent"}}>
                  {cartContainer}
                </View>
    
            </ScrollView>
              <View
                style={cartStyle.footerContainer}
                on Layout={(e) => {
                  this.setState({footerHeight: e.nativeEvent.layout.height});
                }}>
              <View style={cartStyle.footerSectionLeft}>
                  {showPrice}
                  <Text style={{fontFamily: 'BarlowCondensed-Medium', fontSize: 21, color: '#292929'}}> </Text>
                  <Text style={{fontSize: 10}}>sis. alv</Text>
                </View>
              
                <View style={cartStyle.footerSectionRight}>
                  <TouchableOpacity
                    disabled={this.props.cart.length == 0}
                    onPress={() =>{this.handleContinueButtonPress()}}>
                    <LinearGradient colors={primaryGradientColorsButton} style={[
                      theme.linearGradient, {
                      paddingHorizontal: 25,
                      paddingVertical: 15,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 2}]}>
                            
                      <FAIcon name='credit-card' size={20} color='#fff' />
                      <Text style={{color: '#fff', fontWeight: 'bold', marginLeft: 10}}>KASSALLE</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
          </View>
        </LinearGradient>
      );


    }
  }
const cartStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  cartHeaderContainer: {
    width: '100%',
    padding: 15,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center'
  },
  cartHeaderIconContainer: {
    paddingRight: 10,
  },
  cartHeaderTextContainer: {
    flex: 1,
  },
  cartHeaderText: {
    fontFamily: 'BarlowCondensed-Regular',
    fontSize: 18,
    color: '#292929',
  },
  cartContentContainer: {
    width: '100%',
  },
  emptyCartContainer:{
    justifyContent: 'center',
  },
  emptyCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyCartButtonText: {
    fontFamily: 'BarlowCondensed-Regular',
    fontSize: 18,
    color: '#292929',
    marginRight: 5,
  },
  footerContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    padding: 15,
    zIndex: 4,
    alignItems: 'center',
  },
  footerSectionLeft: {
    width: '50%',
    alignItems: 'flex-start',
  },
  footerSectionRight: {
    width: '50%',
    alignItems: 'flex-end'
  },
});
/*
const map_state_props = (state) => {
  return {
    cart: state.cart_reducer.cart,
    products: state.products_reducer.products,
    contact: state.contact_reducer.contact,
    logged: state.contact_reducer.isLogged,
  }
};
const map_dispach_props = (dispatch) => ({
  emptyCartItems: () => {
    dispatch(emptyCart());
  },
  removeItem: (item) => {
    dispatch(removeItemFromCart(item));
  }
});
*/

const mapStateToProps = (state) => {
	const cart = state.cart.cart
	return { cart }
};

const mapDispatchToProps = dispatch => (
	bindActionCreators({ emptyCart, parseCart, increaseCartQuantity, decreaseCartQuantity, removeFromCart }, dispatch));
	
export default connect(mapStateToProps, mapDispatchToProps)(Cart);


