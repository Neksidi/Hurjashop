import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default class Index extends Component {
  render(){
    return(
      <View>
          <TouchableOpacity style={ styles.container } onPress={ this.props.onPress }>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={ styles.text }>{ this.props.text }</Text>
            </View>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 7,
    borderWidth: 1,
    borderColor: '#292929',
    width: 100,
    marginVertical: 5,
    marginRight: 10,
  }
});
