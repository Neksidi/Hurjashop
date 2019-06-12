import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import React, { Component } from 'react'
import { View, Text, ScrollView, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import { theme, app_style } from '../../../app/styles/global'
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'
import ButtonTransparent from '../components/transparentButton'
import Gallery from '../components/gallery'
import { parseDate, parseStatus, priceToString } from '../controllers/parsers'
import { WEB_URL } from '../../../app/config'
import { orderStyles } from '../styles/orderStyles'
import { setVariations } from '../../../containers/product/redux/productActions'


class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      isLoading: true,
    }
  }

  componentWillMount(){
    if(this.props.navigation.state.params){
      if(this.props.navigation.state.params.item){
        const item = this.props.navigation.state.params.item;
        if(this.hasVariations(item)){
          this.setState({item: item});
        }else {
          this.setState({item: item, isLoading: false});
        }
      }
    }
  }

  static navigationOptions = {
    headerStyle: {
        backgroundColor: theme.color.navigation.background,
    },
    headerTitle: "Tilaus",
    headerTintColor: 'white',
  };

  hasVariations(item){
    for(i in item.line_items){
      if(item.line_items[i].variation_id != 0){
        return true
      }
    }
    return false
  }

  getImageSrc(product_id){
    for(i in this.props.products){

      if(this.props.products[i].id == product_id){
        return this.props.products[i].images[0].src
      }
    }
    return null
  }

  getImages(product_id){
    for(i in this.props.products){

      if(this.props.products[i].id == product_id){
        return this.props.products[i].images
      }
    }
    return null
  }

  _renderItemCol(item) {
    let images = this.getImages(item.product_id);
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{width: 50, height: 50, marginRight: 5}}>
          <TouchableOpacity onPress={() => {this.refs.gallery.show(0)}}>
            <Image source={{uri: images[0].src}} style={{width: 50, height: 50 }}/>
            </TouchableOpacity>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text >{item.name}</Text>
        </View>
        <Gallery images={images} ref='gallery'/>
      </View>
    )
  }

  _itemInVariations(product_id) {
    for(i in this.props.variations){
      if(this.props.variations[i].product_id == product_id){
        return true
      }
    }
    return false
  }
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
  renderVariations(array){
    return array.map((item, i) => {
      return (
        <Text key={i} style={{fontSize: 12, paddingLeft: 5}}>{item.title}: {item.value}</Text>
      );
    });
  }

  renderItems(){

    return this.state.item.line_items.map((item, i) => {
      if(item.variation_id != 0){
        //On variaatioita

        //Ei ole reduxissa
        if(!this._itemInVariations(item.product_id)){
          //Haetaan reduxiin
          fetch(WEB_URL + '/products/' + item.product_id + '/variations')
          .then((response) => response.json())
          .then((responseJson) => {
            this.props.setVariations(responseJson);
            this.setState({isLoading: false});
          })
        }else {
          this.state.isLoading = false;
        }
        if(this.state.isLoading){
          return(
            <View style={{height: 60, alignItems: 'center', width: '100%', backgroundColor: '#fff', justifyContent: 'center', borderBottomWidth: 1, borderColor: '#29292930'}} key={i}>
              <ActivityIndicator color={theme.color.hurja.main}/>
            </View>
          );
        }else {

          let images = this.getImages(item.product_id);

          return (

            <View style={orderStyles.orderItemContainer} key={i}>
              <View style={orderStyles.itemCol}>
                <View>
                  <View style={{width: 50, height: 50, marginRight: 5}}>
                    <TouchableOpacity onPress={() => {this.refs.gallery.show(0)}}>
                      <Image source={{uri: images[0].src}} style={{width: 50, height: 50 }}/>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text>{item.name}</Text>
                    {this.renderVariations(this.getVariations(item.product_id, item.variation_id))}
                  </View>
                </View>
                  <View style={orderStyles.empty}></View>
              </View>
              <View style={orderStyles.priceCol}><Text>{priceToString(item.total)}€</Text></View>
              <View style={orderStyles.quantityCol}><Text>x{item.quantity}</Text></View>
              <View style={orderStyles.totalPriceCol}><Text>{priceToString(item.total * item.quantity)}€</Text></View>
              <Gallery images={images} ref='gallery'/>
            </View>
          );
        }
      }

      return (

        <View style={orderStyles.orderItemContainer} key={i}>
          <View style={orderStyles.itemCol}>{this._renderItemCol(item)}</View>
          <View style={orderStyles.empty}></View>
          <View style={orderStyles.priceCol}><Text>{priceToString(item.total)}€</Text></View>
          <View style={orderStyles.quantityCol}><Text>x{item.quantity}</Text></View>
          <View style={orderStyles.totalPriceCol}><Text>{priceToString(item.total * item.quantity)}€ </Text></View>
        </View>

      );


    });
  }

  renderShipping(){
    return (
      <View>
        <View style={[orderStyles.orderItemContainer, {borderBottomWidth: 0, marginTop: 5,}]}>
          <View style={orderStyles.itemCol}>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: 50, height: 50, marginRight: 5, alignItems: 'center', justifyContent: 'center'}}><FAIcon name={'truck'} size={30} color={'#ddd'} ></FAIcon></View>
              <View style={{justifyContent: 'center'}}><Text>{this.state.item.shipping_lines[0].method_title}</Text></View>
            </View>
          </View>
          <View style={orderStyles.empty}></View>
          <View style={orderStyles.priceCol}></View>
          <View style={orderStyles.quantityCol}></View>
          <View style={orderStyles.totalPriceCol}><Text>{priceToString(this.state.item.shipping_total)}€</Text></View>
        </View>
        <View style={[orderStyles.orderItemContainer, {borderBottomWidth: 0}]}>
          <View style={orderStyles.itemCol}/>
          <View style={orderStyles.empty}></View>
          <View style={orderStyles.priceCol}/>
          <View style={orderStyles.quantityCol}><Text style={{}}>ALV(24%):</Text></View>
          <View style={orderStyles.totalPriceCol}>
            <Text style={{}}>{priceToString(this.state.item.total_tax)}€</Text>
          </View>
        </View>
        <View style={orderStyles.orderItemContainer}>
          <View style={orderStyles.itemCol}/>
          <View style={orderStyles.empty}></View>
          <View style={orderStyles.priceCol}/>
          <View style={orderStyles.quantityCol}><Text style={{fontWeight: '600'}}>Yhteensä:</Text></View>
          <View style={orderStyles.totalPriceCol}>
            <Text style={{fontWeight: '600'}}>{priceToString(this.state.item.total)}€  </Text>
          </View>
        </View>
      </View>
    );
  }

  renderLineItems(){
    return(
      <View style={{marginVertical: 10,width: '100%'}}>
        <View style={orderStyles.orderItemsHeaderContainer}>
          <View style={orderStyles.itemCol}><Text>Tuote:</Text></View>
          <View style={orderStyles.empty}></View>
          <View style={orderStyles.priceCol}><Text>Hinta:</Text></View>
          <View style={orderStyles.quantityCol}><Text>Määrä:</Text></View>
          <View style={orderStyles.totalPriceCol}><Text>Yhteensä:</Text></View>
        </View>
        {this.renderItems()}
        {this.renderShipping()}
      </View>
    );
  }

  _handleCancel(){
    console.log('CANCEL');
  }

  _handlePayment(){
    console.log('PAYMENT');
  }

  renderOrderInfo(){

    let buttons = this.state.item.status == 'pending' ? (<View style={{flexDirection: 'row'}}><ButtonTransparent text='Peruuta' onPress={() => this._handleCancel()}/><ButtonTransparent text='Maksa' onPress={() => this._handlePayment()}/></View>) : (<View></View>);

    return(
      <View style={{width: '100%', padding: 10, backgroundColor: '#fff'}}>
        <View>
          <Text style={app_style.medium_title}>Tiedot:</Text>
          <View>
            <Text>Nimi: {this.state.item.billing.first_name} {this.state.item.billing.last_name}</Text>
            <Text>Sähköposti: {this.state.item.billing.email}</Text>
          </View>
          <View>
            <Text style={{fontWeight: '600', marginVertical: 3, fontSize: 15,}}>Tilaus:</Text>
            <Text>ID: #{this.state.item.id}</Text>
            <Text>Päiväys: {parseDate(this.state.item.date_created)}</Text>
            <Text>Tila: {parseStatus(this.state.item.status)}</Text>
          </View>
          {buttons}
        </View>
      </View>
    );
  }

  renderShippingInfo(){
    const shipping = this.state.item.shipping;
    return(
      <View style={{width: '100%', padding: 10, backgroundColor: '#fff'}}>
        <View style={{}}>
          <Text style={app_style.medium_title}>Tilaustiedot:</Text>
        </View>
        <View>
          <Text>Etunimi: {shipping.first_name}</Text>
          <Text>Sukunimi: {shipping.last_name}</Text>
          <Text>Osoite: {shipping.address_1}</Text>
          <Text>Postinumero: {shipping.postcode + ', ' + shipping.city + ' ' + shipping.country}</Text>
        </View>
      </View>
    );
  }

  render(){
    return(
      <ScrollView>
        <View style={orderStyles.container}>
          {this.renderOrderInfo()}
          {this.renderLineItems()}
          {this.renderShippingInfo()}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products.all,
    variations: state.products.variations
  }
};

const mapDispatchToProps = dispatch => (
	bindActionCreators({ setVariations }, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Order)
