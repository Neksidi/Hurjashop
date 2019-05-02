import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { theme } from '../../../app/styles/global'
import { parseDate, parseStatus } from '../controllers/parsers' 
import { orderStyles } from '../styles/orderStyles'
import { price } from '../controllers/parsers'

class Item extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render(){
    let count = this.props.data.line_items.length == 1 ? ('1 tuote') : (this.props.data.line_items.length + ' tuotetta');
    return(
      <TouchableOpacity  key={ this.props.data.id } style={ orderStyles.item } onPress={ () => { this.props.onPress(this.props.data); } } >
            <View style={{flex: 1, flexDirection: 'row', minHeight: 100,}}>
              <View style={{width: '50%', height: '100%', alignItems: 'flex-start', padding:10,}}>
                <View style={{flexDirection: 'row',}}>
                  <Text style={{fontSize: 16, fontWeight: '500'}}>Tilaus #{this.props.data.id + " "}</Text>
                </View>
                <View style={{marginTop: 3, justifyContent: 'center',}}>
                  <Text style={{fontSize: 12, fontWeight: '400'}}>{parseDate(this.props.data.date_created)}</Text>
                  <Text>{parseStatus(this.props.data.status)} </Text>
                </View>
              </View>

              <View style={{width: '50%', height: '100%', alignItems: 'flex-end', padding: 10,}}>
                <Text style={{fontSize: 16, fontWeight: '500'}}>{price(this.props.data.total, 2)}€ </Text>
                <View style={{marginTop: 3, justifyContent: 'center'}}>
                  <Text style={{fontSize: 12, fontWeight: '600'}}>{count} </Text>
                </View>
              </View>
            </View>
      </TouchableOpacity>
    );
  }
}

export { Item }
