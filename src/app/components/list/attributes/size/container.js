import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import Item from './Item'
import { theme } from '../../../../styles/global'

class AttributeList extends Component {


  _onPress(item){
    this.props.parent.selectSize(item);
  }

  render(){
    return(
      <View>
        <FlatList horizontal data={this.props.data.options} extraData={this.props.selected} renderItem={({ item }) =>  <Item data={item} onPress={ () => this._onPress(item) } selectedItem={this.props.selected}/>}></FlatList>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  item: {
    marginHorizontal: 5,
  },
  selected:{
    height: 30,
    width:30,
    backgroundColor: theme.color.hurja.main,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default AttributeList
