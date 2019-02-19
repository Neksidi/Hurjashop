import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'



class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 0,
      message: this.props.message ? this.props.message : '',
      uppercase: this.props.uppercase ? this.props.uppercase : false,
      postition_offset: this.props.positionOffset ? this.props.positionOffset : 50,
      positionTop: this.props.position == 'TOP' ? this.props.positionOffset : null,
      positionBottom: this.props.position == 'BOTTOM' ? this.props.positionOffset : null,
      background_color: this.props.backgroundColor ? this.props.backgroundColor : '#fff',
      border_radius: this.props.borderRadius ? this.props.borderRadius : 5,
      border_width: this.props.borderWidth ? this.props.borderWidth : 0,
      border_color: this.props.borderColor ? this.props.borderColor : '#292929',
      text_color: this.props.textColor ? this.props.textColor : '#000',
      text_weight: this.props.textWeight ? this.props.textWeight : 'normal',
      text_align: this.props.textAlign ? this.props.textAlign : 'center',
      duration: 4000,
    }

    switch (this.props.textAlign) {
      case 'center':
        this.state.text_align = 'center';
        break;
      case 'left':
        this.state.text_align = 'flex-start';
        break;
      case 'right':
        this.state.text_align = 'flex-end';
        break;
      default:
        break;
    }

    switch (this.props.duration) {
      case 'LONG':
        this.state.duration = 5000; //5s
        break;
      case 'MIDDLE':
        this.state.duration = 3500;//3,5s
      case 'SHORT':
        this.state.duration = 2000;//2s
      default:
        break;
    }

    switch (this.props.position) {
      case 'TOP':
        this.state.positionTop = this.state.postition_offset;
        this.state.positionBottom = null;
        break;
      case 'BOTTOM':
        this.state.positionTop = null;
        this.state.positionBottom = this.state.postition_offset;
      default:

    }

  }

  _closeToast(){
    this.setState({opacity: 0});
  }

  show(message){
    this.state.message = message;
    this.setState({opacity: 1});
    setTimeout(function() {
      this._closeToast();
    }.bind(this), 2000);
  }

  render (){
    const message = this.props.uppercase ? ((this.state.message).toUpperCase()) : (this.state.message);
    if(this.props.onPress){
      return(
          <View style={{backgroundColor: this.state.background_color,
              borderRadius: this.state.border_radius,
              opacity: this.state.opacity,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 10,
              paddingHorizontal: 20,
              position: 'absolute',
              zIndex: 999, elevation: 999,
              bottom: this.state.positionBottom,
              top: this.state.positionTop,
              borderWidth: this.state.border_width,
              borderColor: this.state.border_color}}>
              <TouchableOpacity onPress={() => this.props.onPress()}>
                <View style={{flex: 1}}>
                  <Text style={{color: this.state.text_color, fontWeight: this.state.text_weight,}}>{message}</Text>
                </View>
            </TouchableOpacity>
            </View>
      );
    }else {
      return (
        <View style={{backgroundColor: this.state.background_color,
            borderRadius: this.state.border_radius,
            opacity: this.state.opacity,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 20,
            position: 'absolute',
            zIndex: 999, elevation: 999,
            bottom: this.state.positionBottom,
            top: this.state.positionTop,
            borderWidth: this.state.border_width,
            borderColor: this.state.border_color}}>
            <Text style={{color: this.state.text_color, fontWeight: this.state.text_weight,}}>{message}</Text>
          </View>
        );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#999',
    borderRadius: 10,
  },
});

export default Index
