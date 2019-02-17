import React, { Component } from 'react'
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, } from 'react-native'

import FAIcon from 'react-native-vector-icons/dist/FontAwesome'

export default class CartBadge extends Component {

  render(){
    let badge = this.props.count > 0 ? (
      <View style={{
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#155094',
        position: 'absolute',
        top: 0,
        right: 4,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Text style={{ color: '#fff', lineHeight: 16}}>{ this.props.count }</Text>
      </View>
    ) : (null);
    return (
      <TouchableOpacity
        onPress={() => {this.props.onPress()}}
        activeOpacity={1}
        style={[{
          position: 'absolute',
          top: -37,
          right: 10,
          zIndex: 9999,
          elevation: 9999,
          paddingHorizontal: 10,
        }, this.props.style]}>
        <FAIcon name='shopping-cart' size={25} color='#fff' />
        { badge }
      </TouchableOpacity>
    );
  }
}
