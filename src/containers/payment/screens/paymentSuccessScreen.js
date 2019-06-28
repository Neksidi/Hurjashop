import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, WebView, ActivityIndicator, Dimensions } from 'react-native';
import { Button } from 'react-native-elements'
import { theme } from '../../../app/styles/global'


const Success = (props) => {

	console.log("props: ",props)
	return (	
			<View style={{justifyContent: 'center',alignItems:'center'}}>
				<Text style={{fontSize:20}}>Tilauksesi {props.data.payment.order_key} on suoritettu ja maksettu onnistuneesti. Kiitos tilauksestasi</Text>
				<Button buttonStyle={{width: '80%', marginVertical : 20}} title='Palaa alkuun' onPress={() => {props.data.navigation.navigate('Home')}} />						
				<Button buttonStyle={{width: '80%', marginVertical : 20}} title='Omiin tilauksiin' onPress={() => {props.data.navigation.navigate('CustomerOrders')}} />
			</View>
	)
}	

export default Success;
