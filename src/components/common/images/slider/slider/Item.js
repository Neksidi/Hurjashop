import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

class Item extends Component {
  render(){
    return(
      <View style={styles.container}>
        <Image source={{uri: this.props.data.src}} style={{height: this.props.imageHeight, width: this.props.imageWidth}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default Item
