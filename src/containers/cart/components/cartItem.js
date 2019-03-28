import { connect } from 'react-redux'
import React, { Component } from 'react'
import { View, StyleSheet, Text, ImageBackground, TouchableOpacity, Image, Animated } from 'react-native'
// Vendor components
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'
import FeatherIcon from 'react-native-vector-icons/dist/Feather'
import { theme } from '../../../styles/Global'
import Gallery from '../../../components/common/images/gallery'
import Price from '../../../utility/Price'

import { removeItemFromCart, increaseCartQuantity, increaseCartQuantityWithVariations, decreaseCartQuantity, decreaseCartQuantityWithVariations } from '../../../redux/actioncreators'

class cartItem extends Component {

  constructor(props){
    super(props);
    this.state = {
      products: [ ],
      count: this.props.data.quantity,
    }
    this.positionX = new Animated.Value(0);
  }

  getProduct(id){
    for(i in this.props.products){
      if(this.props.products[i].id == id){
        return this.props.products[i]
      }
    }
  }
  onIncrease(){
    if(this.props.data.variation_id){
      this.props.increaseItemQuantityWithVariations(this.props.data);
    }else {
      this.props.increaseQuantity(this.props.data);

    }
    this.setState({count: this.state.count + 1});
  }
  onDecrease(){
    if(this.state.count > 1){
      if(this.props.data.variation_id){
        this.props.decreaseItemQuantityWithVariations(this.props.data);
      }else {
        this.props.decreaseQuantity(this.props.data);
      }
      this.setState({count: this.state.count - 1});
    }
  }
  onRemove(){
      this.props.parentFlatList._onDelete(this.props.data);
  }

  //KOVAKOODATTU VÄRI JA KOKO
  getVariations(product_id, variation_id){
    let ret = [];
    for(i in this.props.variations){
      if(this.props.variations[i].product_id == product_id){
        for(x in this.props.variations[i].variations){
          if(this.props.variations[i].variations[x].id == variation_id){
            for(a in this.props.variations[i].variations[x].attributes){

              if(this.props.variations[i].variations[x].attributes[a].name == 'Koko'){
                ret.push({title: 'Koko', value: this.props.variations[i].variations[x].attributes[a].option});
              }
              if(this.props.variations[i].variations[x].attributes[a].name == 'Väri'){
                ret.push({title: 'Väri', value: this.props.variations[i].variations[x].attributes[a].option});
              }
            }
            return ret;
          }
        }
      }
    }
    return ret;
  }
  //Renders variations to cart item
  renderVariations(array){
    return array.map((item, i) => {
      return (
        <Text key={i} style={styles.variationText}>{item.title}: {item.value}</Text>
      );
    });
  }

  _renderDescription(desc, i) {
    const regex = /(<([^>]+)>)/ig;
    let result = desc.replace(regex, '');
    let arr = result.split('.');
    return arr[0] + '.';
  }

  _renderItemPrice(){
    let price = this.getProduct(this.props.data.product_id).price;
    let total = price * this.props.data.quantity;
    return Price.priceToString(total) + '€';
  }

  render(){
    let attr = null;
    if(this.props.data.variation_id){
      attr = this.getVariations(this.props.data.product_id, this.props.data.variation_id);
    }
    let variations = this.props.data.variation_id ? (<View style={styles.variationContainer}>{this.renderVariations(attr)}</View>) : (<View></View>);
    return(
      <Animated.View style={[styles.container, {transform: [{translateX: this.positionX}]}]}>

        <View style={styles.item}>
          <TouchableOpacity style={styles.imageContainer} onPress={() => this.refs.gallery.show()}>
            <Image source={{uri: this.getProduct(this.props.data.product_id).images[0].src}} style={styles.image} resizeMode='contain'/>
          </TouchableOpacity>
          <View style={styles.detailContainer}>
            <Text style={styles.itemName}>{this.getProduct(this.props.data.product_id).name}</Text>
            {variations}
            <Text style={styles.variationText}>Määrä: {this.state.count}</Text>
            <Text style={styles.priceText}>{this._renderItemPrice()}</Text>
          </View>
          <View style={styles.removeButtonContainer}>
            <TouchableOpacity style={styles.removeButton} onPress={() => {  this.onRemove(); }}>
              <FeatherIcon name='x' size={25} color='#292929' />
            </TouchableOpacity>
          </View>
        </View>
        <Gallery images={this.getProduct(this.props.data.product_id).images} ref='gallery'/>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  item: {
    padding: 20,
    flexDirection: 'row',
    width: '100%',
  },
  imageContainer: {
    paddingRight: 10,
  },
  image: {
    width: 90,
    height: 140,
  },
  itemName: {
    fontFamily: 'BarlowCondensed-Medium',
    fontSize: 20,
    color: '#292929'
  },
  detailContainer: {
    flex: 1,
  },
  descriptionText: {
    fontSize: 14,

  },
  removeButtonContainer: {
    alignSelf: 'flex-end',
    height: '100%',
  },
  removeButton: {
    padding: 8,
  },
  variationText: {
    fontSize: 14,
  },
  priceText: {
    fontFamily: 'BarlowCondensed-Medium',
    fontSize: 20,
    color: '#292929'
  }
})

const map_state_props = (state) => {
  return {
    products: state.products_reducer.products,
    variations: state.cart_reducer.variations,
  }
};
const map_dispach_props = (dispatch) => ({
  removeItem: (item) => {
    dispatch(removeItemFromCart(item));
  },
  increaseQuantity: (item) => {
    dispatch(increaseCartQuantity(item));
  },
  increaseItemQuantityWithVariations: (item) => {
    dispatch(increaseCartQuantityWithVariations(item));
  },
  decreaseQuantity: (item) => {
    dispatch(decreaseCartQuantity(item));
  },
  decreaseItemQuantityWithVariations: (item) => {
    dispatch(decreaseCartQuantityWithVariations(item));
  },
});


export default connect(map_state_props, map_dispach_props)(cartItem)
