import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Alert, ChildComponent, View, Text, Button, ScrollView, StyleSheet, List, TouchableOpacity,Dimensions, Image, SlideUp} from 'react-native';
import { ListItem } from 'react-native-elements'
import { bindActionCreators } from 'redux';
import {btn, theme,  } from '../../../app/styles/global'
import { getProducts } from '../../product/controllers/requests'
import { setProducts } from '../../product/redux/productActions'
import Gallery from '../../../app/components/common/images/gallery'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import Loader from '../../../app/components/common/loader/loader'
import cartItem from '../components/cartItem'
import { priceToString } from '../../product/controllers/helper'
import { emptyCart } from '../redux/cartActions'

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
      <View key={item.item.id} style={{ flex: 1 }}>
        <Text>{item.item.name}</Text>
      </View>
    );

  }

  
  calcTotalPrice(){
    let total = 0.00;
    let price, quantity;

    if(this.props.cart.cart) {
      for(i in this.props.cart.cart){
        quantity = this.props.cart.cart[i].quantity;
        price = (parseFloat(this.props.cart.cart[i].item.price));
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
    //if(this.props.logged){  //If logged in
      this.props.navigation.navigate('Shipping')
    //}else {
      //this.props.navigation.navigate('Authenticate')
    
  } 

  priceToString(price) {
    return parseFloat(price).toFixed(2).toString().replace('.', ',');
  }
  
	render() {
    let productCount = 
    this.props.cart.cart ? (
      this.props.cart.cart.length === 1 ? (
        <Text style={styles.cartHeaderText}>1 tuote</Text>
      ) : ( 
        <Text style={styles.cartHeaderText}>{this.props.cart.cart.length} tuotetta</Text>
      )
    ) : ( 
      <Text style={styles.cartHeaderText}>Ostoskori on tyhjä</Text>
    )      

     let cartContainer =
     this.props.cart.cart ? (
          this.props.cart.cart.map((item, i) => {
            return (
              <ListItem key={item.item.id}
                key={item.item.id}
                title={item.item.name}
                subtitle={"Määrä: "+item.quantity}
                leftAvatar={{ source: { uri: item.item.images[0].src } }}
                onPress={() => this.props.navigation.navigate('Product', { item: item })}
                rightTitle={this.priceToString(item.item.price*item.quantity)+" €"}
              />
            )
          })
      
     ) : (
       <View/>
     );

     let showPrice = 
     this.props.cart.cart ? (
        <Text style={{fontWeight: 'bold', fontSize: 14, color: '#292929'}}>{this.calcTotalPrice()}</Text>
     ) : (
        <Text style={{fontWeight: 'bold', fontSize: 14, color: '#292929'}}> 0€</Text>
     );

		  return (
		  	<View style={styles.container}>
        <ScrollView>
              <View style={styles.cartHeaderContainer}>
                <View style={styles.cartHeaderIconContainer}>
                  <FeatherIcon name='package' size={30} color='#292929' />
                </View>
                <View style={styles.cartHeaderTextContainer}>
                  <ScrollView>
                    {productCount}
                  </ScrollView>
                </View>
                <View style={styles.emptyCartContainer}>
                  <TouchableOpacity onPress={() => {this.clearCart()}} style={styles.emptyCartButton}>
                    <Text style={styles.emptyCartButtonText}>Tyhjennä</Text>
                    <FeatherIcon name='trash-2' size={25} color='#292929' />
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                  {cartContainer}
              </View>
  
          </ScrollView>
            <View
              style={styles.footerContainer}
              on Layout={(e) => {
                this.setState({footerHeight: e.nativeEvent.layout.height});
              }}>
            <View style={styles.footerSectionLeft}>
                {showPrice}
                <Text style={{fontFamily: 'BarlowCondensed-Medium', fontSize: 21, color: '#292929'}}> </Text>
                <Text style={{fontSize: 10}}>sis. alv</Text>
              </View>
            
              <View style={styles.footerSectionRight}>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 25,
                    paddingVertical: 15,
                    backgroundColor: btn.login.backgroundColor,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 2,
                  }}
                  onPress={() =>{this.handleContinueButtonPress()}}>
                  <FAIcon name='credit-card' size={20} color='#fff' />
                  <Text style={{color: '#fff', fontWeight: 'bold', marginLeft: 10}}>KASSALLE</Text>
                </TouchableOpacity>
              </View>
            </View>
			  </View>
      );

  }/*else {
      //Tyhjä kori ilmoitus
      return(
        <ScrollView style={{backgroundColor:'#fff'}}>
          <View style={{flex: 1, alignItems: 'center', marginTop: 200, }}>
            <FAIcon name={ 'shopping-cart' } size={ 75 } color='#e94641'></FAIcon>
            <Text>Ostoskorisi on tyhjä</Text>
          </View>
        </ScrollView>
      );
    }
	  } */ 
  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    backgroundColor: '#fafafa',
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
	const cart = state.cart
	return { cart }
};

const mapDispatchToProps = dispatch => (
	bindActionCreators({ emptyCart }, dispatch));
	
export default connect(mapStateToProps, mapDispatchToProps)(Cart);


