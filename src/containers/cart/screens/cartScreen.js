import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, FlatList, TouchableOpacity,Dimensions, Image, SlideUp} from 'react-native';
import { bindActionCreators } from 'redux';
import {btn, theme,  } from '../../../app/styles/global'
import { getProducts } from '../../product/controllers/requests'
import { setProducts } from '../../product/redux/productActions'
import Gallery from '../../../app/components/common/images/gallery'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import Loader from '../../../app/components/common/loader/loader'
import cartItem from '../components/cartItem'

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
    
    /* TODO: Löydä samankaltaiset tuotteet
    if(!this.props.products.length) {
			getProducts(this.props);
    }
    */
  }

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
  
  renderItem(item){
    return(
      <View key={item.id} style={{ flex: 1 }}>
        <Image source={{uri: item.src}} style={{ width: '100%', height: '100%'}} resizeMode='cover'/>
      </View>
    );
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
    //if(this.props.logged){  //If logged in
      this.props.navigation.navigate('Shipping')
    //}else {
      //this.props.navigation.navigate('Authenticate')
    
  } 

  priceToString(price) {
    return parseFloat(price).toFixed(2).toString().replace('.', ',');
  }
  
  renderPrice(item){
    const priceStyle = {
      fontFamily: 'BarlowCondensed-Regular',
      fontSize: 18,
    }

    if(item.attributes.length > 0){

      let prices = item.price_html.replace(/<[^>]*>?/gm, '').split(' ');
      for(i in prices){
        prices[i] = prices[i].replace('&nbsp;&euro;', '');
      }

      if(prices.length === 2){
        return(
          <View style={{ flexDirection: 'row'}}><Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontSize: 20}}>
            { this.priceToString(prices[0]) }€ </Text><Text style={ priceStyle }> {this.priceToString(prices[1])}€ </Text></View>
        );
      }
    }
    if(item.sale_price != ''){
      return <View style={{ flexDirection: 'row'}}><Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontSize: 20}}>
        { this.priceToString(item.regular_price) }€ </Text><Text style={ priceStyle }>{this.priceToString(item.sale_price)}€ </Text></View>
    } else {
      return <Text style={ priceStyle }>{this.priceToString(item.price)}€</Text>
    }
  }
  

	render() {
/* //Ostoskorin tarkistus
    if(this.props.cart.length > 0){
      let productCount = this.props.cart.length === 1 ? ('1 tuote') : (this.props.cart.length + ' tuotetta');
      */
		  return (
		  	<View style={styles.container}>
        <ScrollView>
              <View style={styles.cartHeaderContainer}>
                <View style={styles.cartHeaderIconContainer}>
                  <FeatherIcon name='package' size={30} color='#292929' />
                </View>
                <View style={styles.cartHeaderTextContainer}>
                  <Text style={styles.cartHeaderText}>Product Count</Text>
                  <Text style={styles.cartHeaderText}>ostoskorissa</Text>
                </View>
                <View style={styles.emptyCartContainer}>
                  <TouchableOpacity onPress={() => {this.refs.popup.show()}} style={styles.emptyCartButton}>
                    <Text style={styles.emptyCartButtonText}>Tyhjennä</Text>
                    <FeatherIcon name='trash-2' size={25} color='#292929' />
                  </TouchableOpacity>
                </View>
              </View>

              {/**Tähän ei tule dataa, vittu */}
              <View style={styles.cartContentContainer}>
              <FlatList 
              keyExtractor={(_ , i) => i.toString()} 
              data={this.props.cart} 
              renderItem={({item}) => <Item data={item} 
              parentFlatList={this} />} />
            </View>
      
           
           
            
          </ScrollView>
            <View
              style={styles.footerContainer}
              on Layout={(e) => {
                this.setState({footerHeight: e.nativeEvent.layout.height});
              }}>
            <View style={styles.footerSectionLeft}>
                <Text style={{fontWeight: 'bold', fontSize: 14, color: '#292929'}}>SUMMA</Text>
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
export default (Cart);

