import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, Button , TouchableOpacity, ScrollView, AttributeList, Dimensions, Image, SlideUp  } from 'react-native';
import { app_style, theme } from '../../../app/styles/global'

import Badge from '../../../app/components/common/badge/cart'
import Gallery from '../../../app/components/common/images/gallery'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import Loader from '../../../app/components/common/loader/loader'
import ColorPicker from '../../../app/components/list/attributes/color/container'
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'
import { getProducts } from '../controllers/requests'
import { setProducts } from '../redux/productActions'

let { width, height } = Dimensions.get('screen');

class Product extends Component {

	static navigationOptions = {
		headerStyle: {
      		backgroundColor: theme.color.navigation.background,
    	},
      headerTitle: "Tuotesivu",
      backgroundColor: theme.color.hurja.main,
    };
    
	constructor(props) {
    super(props);

    this.state = {
      item: null,
      variations: null,
      count: 1,
      TextInputValueHolder: '',
      selectedSize: 'XXL', //DEFAULT
      selectedColor: 'Valkea',//KOVAKOODATTU PLS FIX
      isLoading: true,
      preview: true,
      activeSlide: 0,
      slideUpContent: null,
    }

  }
  
  componentDidMount() {
    this.setState({item: this.props.navigation.getParam('item', null)});
    
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

  itemInVariations(item){
    for(i in this.props.variations){
      if(this.props.variations[i].product_id == item.id){
        let itemVariations = this._getVariationsByProductId(item.id);
        this.setState({variations: itemVariations, isLoading: false, item: item});
        return true;
      }
    }
    return false;
  }

  addItemToCart() {
    const data = [];
    data.push(this.state.item);
    data.push(this.state.count);

    this.props.addItem(data);
  }

  selectSize(item) {
    this.setState({ selectedSize: item });
  }
  selectColor(item) {
    this.setState({ selectedColor: item });
  }

  getVariationId(){
    if(this.state.item.attributes.length == 2){
      for(i in this.state.variations){
        let size = false;
        let color = false;
        for(a in this.state.variations[i].attributes){
          if(this.state.variations[i].attributes[a].name == 'Koko' && this.state.variations[i].attributes[a].option == this.state.selectedSize){
            size = true;
          }else if(this.state.variations[i].attributes[a].name == 'Väri' && this.state.variations[i].attributes[a].option == this.state.selectedColor){
            color = true;
          }
        }
        if(size && color) {
          return this.state.variations[i].id;
        }
      }
    }else if(this.state.item.attributes.length == 1) {
      if(this.state.item.attributes[0].name == 'Väri'){
        for(i in this.state.variations){
          if(this.state.variations[i].attributes[0].option == this.state.selectedColor){
            return this.state.variations[i].id;
          }
        }
      }else if(this.state.item.attributes[0].name == 'Koko'){
        for(i in this.state.variations){
          if(this.state.variations[i].attributes[0].option == this.state.selectedSize){
            return this.state.variations[i].id;
          }
        }
      }
    }
    return null;
  }

  navigateToPay(){
    this.refs.slideup.close();
    this.props.logged ? this.props.navigation.navigate('Shipping') : this.props.navigation.navigate('Authenticate');
  }

  handleAddToCart(){
    if(this.state.item.variations.length > 0){
      //ON VARIAATIOITA!
      const varId = this.getVariationId();
      //TODO: this.props.addItemWithVariations(this.state.item, varId, this.state.count);
      
      this.setState({slideUpContent: this._renderSlideUpContent(this.state.item, varId, this.state.count)})

    }else{
      //TODO: this.props.addItem(this.state.item, this.state.count);
      this.setState({slideUpContent: this._renderSlideUpContent(this.state.item, null, this.state.count)})
    }
    this.setState({count: 1});
    //this.refs.slideup.show();
  }

  _renderSlideUpContent(item, varId, count){

    const itemHeight = 50;

    let variation = varId ? (null) : (null);
    return(
      <View>
        <View style={{width: '100%', padding: 10, flexDirection: 'row',}}>
          <View style={{width: itemHeight, height: itemHeight, backgroundColor: '#0f0'}}>
            <Image source={{uri: item.images[0].src}} style={{flex: 1}} resizeMode='cover' />
          </View>
          <View style={{marginLeft: 10, height: itemHeight, justifyContent: 'center'}}>
            <Text>{item.name}</Text>
            {variation}
          </View>
          <View style={{justifyContent: 'center', height: itemHeight}}><Text> x{count}</Text></View>
        </View>
        <View style={{width: '100%', height: 70,}}>

          <View style={{width: '100%', height: 50, paddingHorizontal: 20, marginVertical: 10, flexDirection: 'row'}}>
            <View style={{width: '50%', height: '100%', paddingHorizontal: 10, alignItems: 'flex-end', justifyContent: 'center'}}>
              <TouchableOpacity onPress={() => this.navigateToPay()}>
                <View style={{width: '100%', height: 40, borderWidth: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: '#125194', flexDirection: 'row', minWidth: 130,}}>
                  <FAIcon name={'credit-card'} size={20} color={'#fff'}></FAIcon>
                  <Text style={{color: '#fff', marginLeft: 5}}>JATKA</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{width: '50%', height: '100%', paddingHorizontal: 10, alignItems: 'flex-start', justifyContent: 'center'}}>
              <TouchableOpacity onPress={() => {this.props.navigation.navigate('Cart'); this.refs.slideup.close()}}>
                <View style={{width: '100%', height: 40, borderWidth: 0, justifyContent: 'center', backgroundColor: '#125194', minWidth: 130,}}>
                  <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row',}}>
                    <Text style={{color: '#fff', marginRight: 5}}>OSTOSKORIIN</Text>
                    <FAIcon name={'shopping-cart'} size={20} color={'#fff'}></FAIcon>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </View>
    );
  }

  contains(name){

    for(i in this.state.item.attributes){
      if(this.state.item.attributes[i].name == name){
        return true;
      }
    }
    return false;
  }

  getAttributeIndex(name){
    for(i in this.state.item.attributes){
      if(this.state.item.attributes[i].name == name){
        return i;
      }
    }
    return null;
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

  renderRelatedItems(){
    if(this.props.products) {
      return this.props.products.map((a, index) => {
        for(i in this.state.item.related_ids){
          if(a.id == this.state.item.related_ids[i]){
            return(
              <TouchableOpacity
                key={index}
                style={{
                  width: 160,
                  marginHorizontal: 20,
                  alignItems: 'center',
                  marginBottom: 20
                }}
                onPress={() => this.props.navigation.navigate({
                  routeName: 'Product',
                  params: {
                    item: a,
                  },
                  key: 'Product' + a.id
                })}>
                <Image source={{uri: a.images[0].src}} style={{ width: '100%', height: 160, }} resizeMode='cover'/>
                <Text style={{ fontFamily: 'BarlowCondensed-Bold', fontSize: 16}}>{a.name.toUpperCase()}</Text>
                <Text style={{ fontFamily: 'BarlowCondensed-Regular', fontSize: 18, marginTop: 5}}>{this.renderPrice(a)}</Text>
              </TouchableOpacity>
            );
          }
        }
      })
    } else {
      return (
        <Loader /> 
      )
    }
  }
  decreaseCartCount(){
    if(this.state.count > 1) this.setState({count: this.state.count - 1})
  }
  increaseCartCount(){
    this.setState({count: this.state.count + 1})
  }

  render() {
    let item = this.state.item;			

    let sliceUp = this.props.sliceUp == null ? (
      <View />
     ) : ( 
      <SlideUp ref='slideup' title='Tuote lisätty ostoskoriin!' content={this.state.slideUpContent} style={{}}/>
    );

    if(item == null) {
      return(
        <Loader />
      )
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          {/*<Badge count={this.props.cart.length} />*/}
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
              {/*
              <Pagination
                dotsLength={this.state.item.images.length}
                activeDotIndex={this.state.activeSlide}
                containerStyle={{ backgroundColor: 'transparent', position: 'absolute', bottom: -10, }}
                dotStyle={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  marginHorizontal: 5,
                  backgroundColor: '#292929',
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.8}
              />
              */}
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
              <View>
                <TouchableOpacity onPress={() => this.share()} style={{alignItems: 'center', justifyContent: 'center'}}>
                  <FAIcon name='share-square-o' size={30} />
                  <Text style={{ fontFamily: 'BarlowCondensed-Regular'}}>Jaa tuote</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* VARIATIONS */}

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
            {/* RELATED PRODUCTS, TODO: TARPEELLINEN? */}
            {/*
            <View style={{ width: '100%'}}>
              <Text style={{ fontFamily: 'BarlowCondensed-Bold', fontSize: 22, marginBottom: 10, marginLeft: 20}}>Muita Hurjia Tuoteita</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                
                this.renderRelatedItems()
              </ScrollView>
            </View>*/
            }
            {/* IMAGE GALLERY */}
            <Gallery images={this.state.item.images} ref='gallery'/>
          </ScrollView>
            {sliceUp}
          </View>
      );
    } 
  }
}


const mapStateToProps = (state) => {
  const product = state.product
  const products = state.products.all
	return { product, products }
};

const mapDispatchToProps = dispatch => (
	bindActionCreators({ setProducts }, dispatch));

export default ( mapStateToProps, mapDispatchToProps, Product);
