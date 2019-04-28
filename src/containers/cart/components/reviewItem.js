import { connect } from 'react-redux'
import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'

class ReviewItem extends Component {

  constructor(props){
    super(props);
    this.state = {
      products: [],
    }
  }

  getImage(id){
    for(i in this.props.products){
      if(this.props.products[i].id == id){
        return this.props.products[i].images[0].src
      }
    }
  }

  getPrice() {
    let sum = 0;
    sum += parseFloat(this.props.data.total);
    sum += parseFloat(this.props.data.total_tax);
    sum /= this.props.data.quantity;
    return sum;
  }

  getSum() {
    let sum = 0;
    sum += parseFloat(this.props.data.total);
    sum += parseFloat(this.props.data.total_tax);
    return sum;
}

  render(){
    return(
        <TouchableOpacity  key={ this.props.data.id } style={ styles.item } disabled={true}>
          <View style={{width: 100, height: '100%', justifyContent: 'center', flex: 2,}}>
            <Image source={{uri: this.getImage(this.props.data.product_id)}} style={styles.image}/>
          </View>

          <View style={{width: 100, height: '100%', flex: 4, justifyContent: 'center'}}>
              <Text style={styles.itemName}>{this.props.data.name}</Text>
              <Text style={styles.itemName}>{this.getPrice()} {this.props.currency}</Text>
          </View>     

           <View style={{width: 100, height: '100%', flex: 2, justifyContent: 'center', alignItems: 'center'}}>
           <Text style={styles.itemName}>{this.props.data.quantity} kpl</Text>
           </View>
           <View style={{width: 100, height: '100%', flex: 2, justifyContent: 'center', alignItems: 'center'}}>
           <Text style={styles.itemName}>{this.getSum()} {this.props.currency}</Text>
           </View>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    height: 75,
    elevation: 0,
    width: '100%',
    borderRadius: 0,
    marginBottom: 10,
    paddingVertical: 1,
    paddingLeft: 8,
    position: 'relative',
    shadowColor: '#000000',
    backgroundColor: '#e94641',
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    width: 70,
    height: 70,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  itemName: {
    fontSize: 20,
    marginHorizontal: 5,
  }
})

let map_state_props = (state) => {
  return {
    products: state.products.all,
  }
};



export default connect(map_state_props)(ReviewItem)
