import { connect } from 'react-redux'
import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import { reviewStyles } from '../styles/reviewStyles'

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
    return sum.toFixed(2);
  }

  getSum() {
    let sum = 0;
    sum += parseFloat(this.props.data.total);
    sum += parseFloat(this.props.data.total_tax);
    return sum.toFixed(2);
}

  render(){
    return(
        <TouchableOpacity  key={ this.props.data.id } style={ reviewStyles.reviewItem } disabled={true}>
          <View style={{width: 100, height: '100%', justifyContent: 'flex-start', flex: 2,}}>
            <Image source={{uri: this.getImage(this.props.data.product_id)}} style={reviewStyles.reviewImage}/>
          </View>

          <View style={{width: 100, height: '100%', flex: 4, justifyContent: 'center', alignItems:'flex-start', paddingLeft:2}}>
              <Text style={reviewStyles.reviewItemName}>{this.props.data.name}</Text>
              <Text style={reviewStyles.reviewItemName}>{this.getPrice()} {this.props.currency}</Text>
          </View>     

           <View style={{width: 100, height: '100%', flex: 2, justifyContent: 'center', alignItems: 'center'}}>
           <Text style={reviewStyles.reviewItemName}>{this.props.data.quantity} kpl</Text>
           </View>
           <View style={{width: 100, height: '100%', flex: 2, justifyContent: 'center', alignItems: 'center'}}>
           <Text style={reviewStyles.reviewItemName}>{this.getSum()} {this.props.currency}</Text>
           </View>
        </TouchableOpacity>
    );
  }
}

let map_state_props = (state) => {
  return {
    products: state.products.all,
  }
};



export default connect(map_state_props)(ReviewItem)
