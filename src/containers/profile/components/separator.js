import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class Separator extends Component {
  render() {

    if(this.props.text){
      return(
        <View style={styles.separatorContainer}>
          <View style={{ flex: 1 }}></View>
          <View style={styles.separatorLine}></View>
          <Text style={styles.separatorText}>{this.props.text}</Text>
          <View style={styles.separatorLine}></View>
          <View style={{ flex: 1 }}></View>
        </View>
      );
    }else {
      <View style={{
        borderBottomWidth: 1,
        borderColor: '#fff',
        width: '100%',
      }} />
    }
  }
}

const styles = StyleSheet.create({
  separatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    maxWidth: 400
  },
  separatorLine: {
    flex: 2,
    borderBottomWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
  },
  separatorText: {
    color: '#fff',
    marginHorizontal: 5,
  }
});
