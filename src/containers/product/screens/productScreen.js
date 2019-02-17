import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { app_style } from '../../../app/styles/global'

import Badge from '../../../app/components/common/badge/cart'
import Gallery from '../../../app/components/common/images/gallery'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import Loader from '../../../app/components/common/loader/loader'
import ColorPicker from '../../../app/components/list/attributes/color/container'
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'


class Product extends Component {
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

	static navigationOptions = {
		headerStyle: {
      		backgroundColor: '#fcf',
    	},
    	headerTitle: "<tuotteen nimi tähän>"
  	};

  componentDidMount() {
  
  }
  componentWillMount() {
      //TODO fetch
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
  
  _description(desc) {
    const regex = /(<([^>]+)>)/ig;
    const result = desc.replace(regex, '');
    return (result);
  }
  
  addItemToCart() {
    const data = [];
    data.push(this.state.item);
    data.push(this.state.count);
  
    this.props.addItem(data);
  }
  
  decreaceCount() {
    if (this.state.count > 1) {
      this.setState({ count: this.state.count - 1 })
    }
  }
  
  selectSize(item) {
    this.setState({ selectedSize: item });
  }
  selectColor(item) {
    this.setState({ selectedColor: item });
  }
  

  onClick = () => {
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
  }
  
  onNavToCart = () => {
    this.props.navigation.navigate('Cart');
    this.refs.slideup.close();
  }
  
  getVariationId(){
    if(this.state.item.attributes.length == 2){
      for(i in this.state.variations){
        let size = false;
        let color = false;
        for(a in this.state.variations[i].attributes){
          if(this.state.variations[i].attributes[a].name == 'Koko' && this.state.variations[i].attributes[a].option == this.state.selectedSize){
            size = true;
          } else if(this.state.variations[i].attributes[a].name == 'Väri' && this.state.variations[i].attributes[a].option == this.state.selectedColor){
            color = true;
          }
        }
        if(size && color) {
          return this.state.variations[i].id;
        }
      }
    } else if(this.state.item.attributes.length == 1) {
      if(this.state.item.attributes[0].name == 'Väri'){
        for(i in this.state.variations){
          if(this.state.variations[i].attributes[0].option == this.state.selectedColor){
            return this.state.variations[i].id;
          }
        }
      } else if(this.state.item.attributes[0].name == 'Koko'){
        for(i in this.state.variations){
          if(this.state.variations[i].attributes[0].option == this.state.selectedSize){
            return this.state.variations[i].id;
          }
        }
      }
    }
    return null;
  }
  
  handleAddToCart(){
    if(this.state.item.variations.length > 0){
      //ON VARIAATIOITA!
      const varId = this.getVariationId();
      this.props.addItemWithVariations(this.state.item, varId, this.state.count);
  
      this.setState({slideUpContent: this._renderSlideUpContent(this.state.item, varId, this.state.count)})
  
    } else {
      this.props.addItem(this.state.item, this.state.count);
      this.setState({slideUpContent: this._renderSlideUpContent(this.state.item, null, this.state.count)})
    }
    this.setState({count: 1});
    this.refs.slideup.show();
  }

  _renderSlideUpContent(item, varId, count){

    const itemHeight = 50;
  
    let continueButton =  this.props.logged ?
    (
      <TouchableOpacity onPress={() => {this.props.logged ? this.props.navigation.navigate('Shipping') : this.props.navigation.navigate('Shipping')}}>
        <View style={{width: '100%', height: 40, borderWidth: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.color.hurja.main, flexDirection: 'row', minWidth: 130,}}>
          <FAIcon name={'credit-card'} size={20} color={'#fff'}></FAIcon>
          <Text style={{color: '#fff', marginLeft: 5}}>JATKA</Text>
        </View>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity onPress={() => {this.props.logged ? this.props.navigation.navigate('Shipping') : this.props.navigation.navigate('Authenticate')}}>
        <View style={{width: '100%', height: 40, borderWidth: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.color.hurja.main, flexDirection: 'row', minWidth: 130,}}>
          <FAIcon name={'credit-card'} size={20} color={'#fff'}></FAIcon>
          <Text style={{color: '#fff', marginLeft: 5}}>JATKA</Text>
        </View>
      </TouchableOpacity>
    );
  
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
              { continueButton }
            </View>
            <View style={{width: '50%', height: '100%', paddingHorizontal: 10, alignItems: 'flex-start', justifyContent: 'center'}}>
              <TouchableOpacity onPress={() => {this.props.navigation.navigate('Cart'); this.refs.slideup.close()}}>
                <View style={{width: '100%', height: 40, borderWidth: 0, justifyContent: 'center', backgroundColor: theme.color.hurja.main, minWidth: 130,}}>
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

  ItemPrice(){
    if(this.state.item.attributes.length > 0){
      price = Parser.parsePriceFromHtml(this.state.item.price_html);
      if(price.length === 2){
        return(
          <View style={{ flexDirection: 'row'}}><Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontSize: 20}}>
            { price[0] }€ </Text><Text style={styles.price}> {price[1]}€ </Text></View>
        );
      }
    }
    if(this.state.item.sale_price != ''){
      return <View style={{ flexDirection: 'row'}}><Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontSize: 20}}>
        { this.state.item.regular_price } € </Text><Text style={styles.price}>{this.state.item.sale_price} € </Text></View>
    } else {
      return <Text style={styles.price}>{this.state.item.price} € </Text>
    }
  }

  //Onko tämä nyt oikeasti paras tapa tehdä tämä asia? 
  getSaleProcent(){
    let percent = (parseFloat(((this.state.item.regular_price - this.state.item.sale_price) / this.state.item.regular_price) * 100).toFixed(1)) < 100 ? (parseFloat(((this.state.item.regular_price - this.state.item.sale_price) / this.state.item.regular_price) * 100).toFixed(1)) : 99;
    return (percent);
  }

  renderItem(item){
    return(
      <View style={{width: oWidth, height: imageHeight, padding: 0}}>
          <Image source={{uri: item.src}} style={{height: imageHeight, width: oWidth}} resizeMode='cover' />
      </View>
    );
  }
  
  renderRelatedItems(){
    return this.props.products.map((a, index) => {
      for(i in this.state.item.related_ids){
        if(a.id == this.state.item.related_ids[i]){
          return(
            <View key={index} style={{ width: 100, height: 200, backgroundColor: '#0f0', marginHorizontal: 10,}}>
  
            </View>
          );
        }
      }
    })
  }

  render() {
    if(this.state.isLoading) {
      return (
        <Loader />
      );
    } else {
      let size = this.contains('Koko') ? (<View style={{height: 30, marginBottom: 10}}><AttributeList data={this.state.item.attributes[this.getAttributeIndex('Koko')]} parent={this} selected={this.state.selectedSize} /></View>) : (<View></View>);
      let color = this.contains('Väri') ? (<View style={{height: 30}}><ColorPicker data={this.state.item.attributes[this.getAttributeIndex('Väri')]} parent={this} selected={this.state.selectedColor} /></View>) : (<View></View>);
      let sale = this.state.item.sale_price != '' ? (<View style={{position: 'absolute', top: 0, left: 0, backgroundColor: '#292929', elevation: 5, padding: 10, paddingHorizontal: 20,}}><Text style={{color: '#fff', fontSize: 18}}>- {this.getSaleProcent()}%</Text></View>) : (<View></View>);
      let images = null;
      let arrowLeft = (
        <View style={{ position: 'absolute', left: 0, bottom: '45%', justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => this._carousel.snapToPrev()} style={{paddingLeft: 10, padding: 5}}>
            <FAIcon name={'angle-left'} size={50} color='#292929'/>
          </TouchableOpacity>
        </View>
      );
      let arrowRight = (
        <View style={{ position: 'absolute', right: 0, bottom: '45%', justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => this._carousel.snapToNext()} style={{paddingRight: 10, padding: 5}}>
            <FAIcon name={'angle-right'} size={50} color='#292929'/>
          </TouchableOpacity>
        </View>
      );
      let previewButton = (
        <TouchableOpacity style={{position: 'absolute', top: 10, right: 10, elevation: 1, zIndex: 1, padding:5}} onPress={() => {this.refs.gallery.show(this.state.activeSlide)}}>
          <FAIcon name={'search-plus'} size={32} color={'#292929'}></FAIcon>
        </TouchableOpacity>
      );
  
      let relatedProds = (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingVertical: 20}}>
          {this.renderRelatedItems()}
        </ScrollView>
      );
  
      images = (
        <View style={{height: imageHeight, width: oWidth,}}>
          <Carousel
            data={this.state.item.images}
            keyExtractor={(item, index) => index.toString()}
            sliderWidth={oWidth}
            itemWidth={oWidth}
            renderItem={({item}) => this.renderItem(item)}
            onSnapToItem={(index) => this.setState({ activeSlide: index }) }
            enableSnap={true}
            ref={(carousel) => { this._carousel = carousel; }}
            loop={true}
            inactiveSlideScale={1}
            />
          <Pagination
            dotsLength={this.state.item.images.length}
            activeDotIndex={this.state.activeSlide}
            containerStyle={{ backgroundColor: 'transparent',paddingTop: 0, paddingBottom: 5, marginTop: -15 }}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            />
  
          {this.state.item.images.length > 1 && arrowLeft}
          {this.state.item.images.length > 1 && arrowRight}
          {this.state.preview && previewButton}
        </View>
      );
  
      let badge = this.props.cart.length > 0 ? (
        <Badge count={this.props.cart.length} />
      ) : (null);
  
      return (
        <View style={{flex: 1, paddingBottom: 20, backgroundColor: '#fff'}}>
          {badge}
          <ScrollView>
            <View style={styles.container}>
              <Toast ref='toastWarn'/>
  
              <View style={{flex: 1}}>
                {sale}
                {images}
              </View>
  
              <Text style={app_style.medium_title}>{this.state.item.name}</Text>
  
              <Text style={styles.price}>{this.state.item.featured_src}</Text>
              <View>{this.ItemPrice()}</View>
              {size}
              {color}
  
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { this.decreaceCount() }}>
                  <FAIcon name={'minus'} size={30}></FAIcon>
                </TouchableOpacity>
                <Text style={styles.countText}>    {this.state.count}    </Text>
                <TouchableOpacity onPress={() => { this.setState({ count: this.state.count + 1 }) }}>
                  <FAIcon name={'plus-circle'} size={30}></FAIcon>
                </TouchableOpacity>
  
              </View>
              <Button buttonStyle={{ backgroundColor: "#125194" }} icon={{ name: 'add-shopping-cart' }} title="Lisää Ostoskoriin" onPress={() => {this.handleAddToCart();}} />
            </View>
            {relatedProds}
            <Gallery images={this.state.item.images} ref='gallery'/>
  
          </ScrollView>
          <SlideUp ref='slideup' title='Tuote lisätty ostoskoriin!' content={this.state.slideUpContent} style={{borderWidth: 1,}}/>
        </View>
      );
    }
  }
}

let map_state_props = state => {
	return {
		//cart_length: state.cart_reducer.cart.length,
		//contact: state.contact_reducer.contact
	};
};
let map_dispach_props = dispatch => ({
	readProducts: products => {
		dispatch(readProducts(products));
	}//,
	/*addInfo: info => {
		dispatch(addContact(info));
	},
	isLogged: logged => {
		dispatch(isLoggedIn(logged));
	}*/
});


export default (Product);
