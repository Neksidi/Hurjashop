import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, Button , TouchableOpacity, ScrollView, AttributeList, Dimensions, Image } from 'react-native';
import { app_style, theme } from '../../../app/styles/global'
import { bindActionCreators } from 'redux';

import Gallery from '../../../app/components/common/images/gallery'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import Loader from '../../../app/components/common/loader/loader'
import ColorPicker from '../../../app/components/list/attributes/color/container'
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'
import { getProducts } from '../controllers/requests'
import { setProducts } from '../redux/productActions'
import { addToCart } from '../../cart/redux/cartActions'
import Toast, {DURATION} from 'react-native-easy-toast'
import Badge from '../../../app/components/common/badge/index'
import CustomHeader from '../../../app/components/header/customHeader'


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
      TextInputValueHolder: '',
      selectedSize: 'XXL', //DEFAULT
      selectedColor: 'Valkea',//KOVAKOODATTU PLS FIX
      isLoading: true,
      preview: true,
      activeSlide: 0,
    }

  }
  
  componentDidMount() {
    this.setState({item: this.props.navigation.getParam('item', null)});

    if(this.state.item != null) {
      this.props.navigation.setParams({headerTitle: item.name});
    }

    /* TODO: Löydä samankaltaiset tuotteet
    if(!this.props.products.length) {
			getProducts(this.props);
    }
    */
  }
  
  componentWillMount() {
  }

	componentWillUnmount() {
	}

  _getVariationsByProductId(product_id) {
    for(i in this.props.variations){
      if(this.props.variations[i].product_id == product_id){
        return this.props.variations[i].variations
      }
    }
  }
  selectSize(item) {
    this.setState({ selectedSize: item });
  }
  selectColor(item) {
    this.setState({ selectedColor: item });
  }

  handleAddToCart(){
    this.props.addToCart(this.state.item, this.state.count);
    this.refs.toast.show("Lisätty tuote "+this.state.item.name+" ostoskoriin");

    this.setState({count: 1});


  }

  share(){
    //TODO SHARE
    /*
    Share.share({
      ...Platform.select({
        ios: {
          message: 'Have a look on : ',
          url: 'https://hurjashop.qs.fi/shop/' + this.state.item.slug
        },
        android: {
          message: 'https://www.hurjashop.qs.fi/shop/' + this.state.item.slug,
        }
      }),
      title: 'Katso tuote'
    });
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

  priceToString(price) {
    return parseFloat(price).toFixed(2).toString().replace('.', ',');
  }

  
  decreaseCartCount(){
    if(this.state.count > 1) this.setState({count: this.state.count - 1})
  }
  increaseCartCount(){
    this.setState({count: this.state.count + 1})
  }

  render() {
    let item = this.state.item;			

    if(item == null) {
      return(
        <Loader />
      )
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
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
            <View style={{ width: '100%', backgroundColor: '#eee', paddingVertical: 12, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={{ fontFamily: 'BarlowCondensed-Bold', fontSize: 20, }}>{ item.name }</Text>
                {this.renderPrice(this.state.item)}
              </View>
              {/*
              <View>
                <TouchableOpacity onPress={() => this.share()} style={{alignItems: 'center', justifyContent: 'center'}}>
                  <FAIcon name='share-square-o' size={30} />
                  <Text style={{ fontFamily: 'BarlowCondensed-Regular'}}>Jaa tuote</Text>
                </TouchableOpacity>
              </View>
              */}
            </View>
              

            {/* ADD TO CART */}
            <View style={{ width: '100%', alignItems: 'center', padding: 20}}>
              <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => {this.decreaseCartCount()}} style={{ marginRight: 20, padding: 10}}>
                  <FAIcon name='minus' size={25} />
                </TouchableOpacity>
                <Text style={{ fontFamily: 'BarlowCondensed-Bold', fontSize: 28}}>{this.state.count}</Text>
                <TouchableOpacity onPress={() => {this.increaseCartCount()}} style={{ marginLeft: 20, padding: 10}}>
                  <FAIcon name='plus' size={25} />
                </TouchableOpacity>
              </View>
              {/* ADD TO CART BUTTON */}
              <TouchableOpacity onPress={() => this.handleAddToCart()}
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
                <Text style={{ fontFamily: 'BarlowCondensed-ExtraBold', fontSize: 20, color: '#fff', marginLeft: 10}}>LISÄÄ OSTOSKORIIN</Text>
              </TouchableOpacity>
            </View>
            {/* IMAGE GALLERY */}
            <Gallery images={this.state.item.images} ref='gallery'/>
          </ScrollView>
          <Toast ref="toast"/>
        </View>
      );
    } 
  }
}


const mapStateToProps = (state) => {
  const product = state.product
  const products = state.products.all
  const cart = state.cart
	return { product, products, cart }
};

const mapDispatchToProps = dispatch => (
	bindActionCreators({ setProducts, addToCart }, dispatch));
	
export default connect(mapStateToProps, mapDispatchToProps)(Product);


