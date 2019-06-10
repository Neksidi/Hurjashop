import React, { Component } from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'
// Vendor components
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'
// Global styles
import { theme } from '../../styles/Global'

const icon_size = 25;
const icon_color = theme.color.navigation.main;
const icon_color_invert = '#FFFFFF';

class Cart extends Component {
  render(){
    return(
      <TouchableOpacity style={styles.container}>
<Text>dfl</Text>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingRight: 20,
  },
  icon: {
    marginLeft: 20,
  },
});

export default (Cart)
