import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, Button , TouchableOpacity, ScrollView, AttributeList, Dimensions, Image } from 'react-native';
import { app_style, app_theme, theme, styles, primaryGradientColors} from '../../../app/styles/global'
import { bindActionCreators } from 'redux';

import Gallery from '../../../app/components/common/images/gallery'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { Loader } from '../../../app/components/common/loader/loader'
import ColorPicker from '../../../app/components/list/attributes/color/container'
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'
import { getProducts } from '../controllers/requests'
import { setProducts } from '../redux/productActions'
import { getQuantity } from '../../cart/controllers/helper'
import { addToCart } from '../../cart/redux/cartActions'
import Badge from '../../../app/components/common/badge/index'
import CustomHeader from '../../../app/components/header/customHeader'
import LinearGradient from 'react-native-linear-gradient';

import Modal from '../../../app/components/common/modal'

let { width, height } = Dimensions.get('screen');

class Product extends Component {

	static navigationOptions = {
		headerStyle: {
          backgroundColor: theme.color.navigation.background,
          height: theme.navigation.height,
    	},
      headerTitle: <CustomHeader small={true}/>,
      backgroundColor: theme.color.hurja.main,
      headerTintColor: 'white',
    };
    
	constructor(props) {
    super(props);

    this.state = {
      item: null,
      count: 1,
    }
  }
  
  componentDidMount() {
    this.setState({item: this.props.navigation.getParam('item', null)});

  }
  
  componentWillMount() {
  }

	componentWillUnmount() {
	}

  selectSize(item) {
    this.setState({ selectedSize: item });
  }
  selectColor(item) {
    this.setState({ selectedColor: item });
  }

  handleAddToCart(){
    this.props.addToCart(this.state.item, this.state.count);

    if(getQuantity(this.props, this.state.item.id) + 1 <= this.state.item.stock_quantity ||
      (this.state.item.in_stock == false && this.state.item.stock_quantity == null)) {
        this.setState({count: 1});
    } else {
      this.setState({count: 0});
    }

    /*
    if(this.state.count == null) {
      if(this.state.item.stock_quantity == null || 
        this.state.item.stock_quantity == 0) {
          this.setState({count: 0});  //TODO: Move this out of render logic!!!!
      } else {
        this.setState({count: 1});  //TODO: Move this out of render logic!!!!
      }
    }
    */
  }

  renderItem(item){
    return(
      <View key={item.id} style={{ flex: 1 }}>
        <Image source={{uri: item.src}} style={{ width: '100%', height: '100%'}} resizeMode='cover'/>
      </View>
    );
  }

  renderPrice(item){
    const priceStyle = {
      fontFamily: 'BarlowCondensed-Regular',
      fontSize: 18,
    }

    if(item.sale_price != ''){
      return <View style={{ flexDirection: 'row'}}><Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontSize: 20}}>
        { this.priceToString(item.regular_price) }€ </Text><Text style={ priceStyle }>{this.priceToString(item.sale_price)}€ </Text></View>
    } else {
      return <Text style={ priceStyle }>{this.priceToString(item.price)}€</Text>
    }
  }

  priceToString(price) {
    return parseFloat(price).toFixed(2).toString().replace('.', ',');
  }

  
  decreaseCartCount(){
    if(this.state.count > 1) this.setState({count: this.state.count - 1})
  }
  increaseCartCount(){
    if((this.state.item.stock_quantity >= this.state.count + getQuantity(this.props, this.state.item.id)) + 1 ||
      this.state.item.in_stock == false && this.state.item.stock_quantity == null) {
      this.setState({count: this.state.count + 1})
    }
  }

  render() {
    let item = this.state.item;	
    
    if(item == null) {
      return(
        <Loader />
      )
    } else {

      let productsInCart = getQuantity(this.props, item.id);
      
      let productNumber = item.sku != "" ?  (
        <Text style={{ fontFamily: 'BarlowCondensed-Bold', fontSize: 16, }}>Tuotenumero: { item.sku }</Text>
      ) : (
        <View/>
      );

      let disableAddToCart = item.stock_quantity != null || item.in_stock == false ? (
          (item.stock_quantity - productsInCart > 0) ? (
            false
          ) : (
            true
          )
        ) : (
          true
        );

      let stockText = item.stock_quantity != null ? (
          ('Varastossa: '+item.stock_quantity)
        ) : (
          ('')
        );

        let inCartText = productsInCart > 0 ? (
          (" (Ostoskorissa: "+productsInCart +" kpl)")
        ) : (
          ('')
        );

        let addCartText = (disableAddToCart == true) ? (('EI VARASTOSSA')) : (('LISÄÄ OSTOSKORIIN'));


      return (
        <LinearGradient 
				  start={{x: 0, y: 0}} end={{x: 1, y: 1}}
          colors={primaryGradientColors} 
          style={styles.linearGradient}>
	
          <View style={{ flex: 1}}>
            <Badge count={this.props.cart.length} />
            <ScrollView style={{  }}>
              {/* IMAGE CAROUSEL */}
              <View style={{ width: '100%', height: 350, alignItems: 'center', elevation: 2,}}>
                <Carousel
                  data={item.images}
                  keyExtractor={(item, index) => index.toString()}
                  sliderWidth={width}
                  itemWidth={width}
                  renderItem={({item}) => this.renderItem(item)}
                  inactiveSlideScale={1}
                  inactiveSlideOpacity={1}
                  onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                />
                <View
                  style={{
                    width: 45,
                    height: 45,
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    backgroundColor: theme.color.hurja.main,
                    borderTopLeftRadius: 45,
                  }}>
                  <TouchableOpacity style={{flex: 1}} onPress={() => {this.refs.gallery.show(this.state.activeSlide)}}>
                    <FAIcon name='search-plus' size={20} color='#fff' style={{position:'absolute', bottom: 10, right: 9}}/>
                  </TouchableOpacity>
                </View>
              </View>
              {/* PRODUCT INFO + SHARE */}
              <View style={{ width: '100%', paddingVertical: 12, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <Text style={app_style.large_title}>{ item.name }</Text>
                  {this.renderPrice(this.state.item)}

                  <Text style={{ fontFamily: 'BarlowCondensed-Bold', fontSize: 16, }}>{stockText}{inCartText}</Text>
                  {productNumber}

                </View>
              </View>
                
              {/* ADD TO CART */}
              <View style={{ width: '100%', alignItems: 'center', padding: 20}}>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity disabled={disableAddToCart} onPress={() => {this.decreaseCartCount()}} style={{ marginRight: 20, padding: 10}}>
                    <FAIcon name='minus' size={25} />
                  </TouchableOpacity>
                  <Text style={{ fontFamily: 'BarlowCondensed-Bold', fontSize: 28}}>{this.state.count}</Text>
                  <TouchableOpacity disabled={disableAddToCart} onPress={() => {this.increaseCartCount()}} style={{ marginLeft: 20, padding: 10}}>
                    <FAIcon name='plus' size={25} />
                  </TouchableOpacity>
                </View>
                {/* ADD TO CART BUTTON */}
                <TouchableOpacity disabled={disableAddToCart} onPress={() => {
                  this.refs.modal.setTitle("Tuote lisätty ostoskoriin!");
                  this.refs.modal.setContent("Lisätty "+this.state.count+" kpl tuotetta "+item.name+ " ostoskoriin.");
                  this.refs.modal.show();

                  this.handleAddToCart();
                }}
                  style={{
                    width: '100%',
                    maxWidth: 400,
                    paddingVertical: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    backgroundColor: '#125194',
                    borderRadius: 2,
                  }}>
                  <FAIcon name='cart-plus' size={20} color='#fff' />
                  <Text style={{ fontFamily: 'BarlowCondensed-ExtraBold', fontSize: 20, color: '#fff', marginLeft: 10}}>{addCartText}</Text>
                </TouchableOpacity>

              </View>
              {/* IMAGE GALLERY */}
              <Gallery images={this.state.item.images} ref='gallery'/>
            </ScrollView>
          </View>
          <Modal ref='modal'/>

        </LinearGradient>
      );
    } 
  }
}


const mapStateToProps = (state) => {
  const product = state.product
  const products = state.products.all
  const cart = state.cart.cart
	return { product, products, cart }
};

const mapDispatchToProps = dispatch => (
	bindActionCreators({ setProducts, addToCart }, dispatch));
	
export default connect(mapStateToProps, mapDispatchToProps)(Product);
