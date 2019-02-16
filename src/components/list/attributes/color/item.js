import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions} from 'react-native'
import { theme, app_style } from '../../../../app/styles/global'

let {height, width} = Dimensions.get('window');

class Item extends Component {

  render(){
    let color;
    switch (this.props.data) {
      case 'Musta':
        color = '#000';
        break;
      case 'Valkea':
        color = '#fff';
        break;
      default:
        color = '#fff'
        break;
    }
    let display = (this.props.selectedItem == this.props.data) ? (<View style={{height: 20, width: 20, backgroundColor: color, borderWidth: 2, borderColor: theme.color.hurja.main, borderRadius: 10}}></View>) : (<View style={{backgroundColor: color, height: 20, width: 20, borderRadius: 10}}></View>);
    return (
      <TouchableOpacity  key={ this.props.data.id } style={ styles.item } onPress={ () => { this.props.onPress(this.props.data); } } >
        {display}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 5,
  },
});

export default Item
