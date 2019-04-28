// React
import React, { Component } from 'react'
// React native components
import { View, TouchableOpacity, Text } from 'react-native'
// Style(s) used through the application
import { btn } from '../../../app/styles/global'
// Vendor components
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'

class Default extends Component {

  constructor(props) {
  	super(props);
  	this.state = {
		btn_style: btn.default,
		txt_style: btn.default_txt
  	};
  	switch(this.props.type) {
		case 'danger':
			this.state.btn_style = btn.danger;
			this.state.txt_style = btn.danger_txt;
		break;
		case 'warning':
			this.state.btn_style = btn.warning;
			this.state.txt_style = btn.warning_txt;
		break;
		case 'primary':
			this.state.btn_style = btn.primary;
			this.state.txt_style = btn.primary_txt;
		break;
		case 'success':
			this.state.btn_style = btn.success;
			this.state.txt_style = btn.success_txt;
		break;
		case 'login':
			this.state.btn_style = btn.login;
			this.state.txt_style = btn.login_text;
		break;
		case 'facebook':
			this.state.btn_style = btn.facebook;
			this.state.txt_style = btn.facebook_text;
		break;
		default:
			this.state.btn_style = btn.default;
			this.state.txt_style = btn.default_txt;
		break;
  	}
  }

  render() {
    let icon = this.props.icon ? (<FAIcon name={this.props.icon} size={20} color={'#fff'} style={{paddingRight: 5}} ></FAIcon>) : (<View></View>);
    if(this.props.disabled){
      return (
  	<View>
        <TouchableOpacity style={ btn.disabled } onPress={ this.props.onPress } disabled={this.props.disabled}>
          <View style={{flexDirection: 'row'}}>
            {icon}
            <Text style={ this.state.txt_style }>{ this.props.text }</Text>
          </View>
        </TouchableOpacity>
  	</View>
    );
  }else {
    return (
  <View>
      <TouchableOpacity style={ this.state.btn_style } onPress={ this.props.onPress }>
        <View style={{flexDirection: 'row'}}>
          {icon}
          <Text style={ this.state.txt_style }>{ this.props.text }</Text>
        </View>
      </TouchableOpacity>
  </View>
  );
  }

  }
}

export default Default
