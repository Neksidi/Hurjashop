import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions} from 'react-native'
import { theme, app_style } from '../../../../app/styles/global'

let {height, width} = Dimensions.get('window');

class Item extends Component {

  render(){
    let display = (this.props.selectedItem == this.props.data) ? (<View style={styles.selected}><Text>{this.props.data}</Text></View>) : (<View style={styles.unselected}><Text>{this.props.data}</Text></View>);
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
  selected:{
    height: 30,
    width:30,
    backgroundColor: theme.color.hurja.main,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  unselected:{
    height: 30,
    width:30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default Item
