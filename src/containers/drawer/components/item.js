import React, { Component } from 'react';
import { View, Text, TouchableOpacity, } from 'react-native';
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'
import PropTypes from 'prop-types'

export default class MyComponent extends Component {

  static propTypes = {
    icon: PropTypes.string,
    iconSize: PropTypes.number,
    color: PropTypes.string,
    title: PropTypes.string.isRequired,
    fontStyle: PropTypes.object,
    arrow: PropTypes.bool,
  }

  static defaultProps = {
    iconSize: 20,
    color: '#fff',
  }

  render(){
    let icon = this.props.icon ? (
      <FAIcon name={this.props.icon} size={this.props.iconSize} color={this.props.color} />
    ) : null;
    let arrow = (
      <FAIcon name='angle-right' size={this.props.iconSize} color={this.props.color} style={{position: 'absolute', right: 20}}/>
    );
    return (
      <TouchableOpacity
        style={{
          width: '100%',
          paddingVertical: 5,
          paddingLeft: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => this.props.onPress()}
        disabled={this.props.disabled}>
          <View style={{ width: this.props.iconSize + 10, alignItems: 'center', marginLeft: 5, marginRight: 5}}>
            { icon }
          </View>
          <Text style={[{ fontFamily: 'BarlowCondensed-Bold', fontSize: 20, color: this.props.color}, this.props.fontStyle]}>{this.props.title}</Text>
        {this.props.arrow && arrow}
      </TouchableOpacity>
    );
  }
}
