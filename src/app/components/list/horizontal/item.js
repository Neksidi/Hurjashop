import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions} from 'react-native'
import { app_style, carousel_styles } from '../../../styles/global'
//import Platform from '../../../utility/platform'

//let {width, height} = Dimensions.get('screen');

//let oWidth = Platform.isPortrait() ? width : height;

class Item extends Component {

  render(){
    return (
      <TouchableOpacity  key={ this.props.data.id } style={ [{paddingHorizontal: 20}, carousel_styles.carouselItem] } onPress={ () => { this.props.onPress(this.props.data); } } >
        <ImageBackground source={{uri: this.props.data.images[0].src}} style={{width: '100%', height: '100%'}} resizeMode='contain'>
          <View style={{backgroundColor: 'rgba(255, 255, 255, 0.2)', flex: 1, justifyContent: 'flex-end'}}>
            <Text style={app_style.front_slider_title}>{this.props.data.name} </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}

export default Item
