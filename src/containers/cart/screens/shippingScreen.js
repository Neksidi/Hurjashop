import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Button, TouchableOpacity, TextInput, } from 'react-native';
import { bindActionCreators } from 'redux';

class Shipping extends Component {
	constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: null,
            firstname: 'Severi',
            lastname: 'Serveri',
            address: 'Kauppakatu 20',
            zipcode: '70100',
            city: 'Mualiman napa',
            country: 'FI',
            shipping: null,
        };
	}

	static navigationOptions = {
		headerStyle: {
      backgroundColor: '#fcf',
    },
    headerTitle: "Lähetystiedot",
   
  };
  //Tämä on kesken
  handleSubmit = () => {
    this.state.shipping = {first_name: this.state.firstname, last_name: this.state.lastname, address: this.state.address, zipcode: this.state.zipcode, city: this.state.city, country: this.state.country};
    //this.props.addShipping(this.state.shipping);

};

	render() {
		return (
            <ScrollView style={{ backgroundColor: '#fff' }}>
            <View>

                <View>
                    <Text>Etunimi</Text>
                    <TextInput onChangeText={(firstname) => this.setState({ firstname })} value={this.state.firstname} underlineColorAndroid='transparent' />
                </View>

                <View >
                    <Text>Sukunimi</Text>
                    <TextInput  onChangeText={(lastname) => this.setState({ lastname })} value={this.state.lastname} underlineColorAndroid='transparent' />
                </View>

                <View >
                    <Text >Osoite</Text>
                    <TextInput onChangeText={(address) => this.setState({ address })} value={this.state.address} underlineColorAndroid='transparent' />
                </View>

                <View >
                    <Text >Postitoimipaikka</Text>
                    <TextInput onChangeText={(city) => this.setState({ city })} value={this.state.city} />
                </View>

                <View >
                    <Text >Postinumero</Text>
                    <TextInput  onChangeText={(zipcode) => this.setState({ zipcode })} value={this.state.zipcode} keyboardType='numeric' maxLength={5} />
                </View>
                <View >
                    <Text >Maa</Text>
                    <TextInput onChangeText={(country) => this.setState({ country })} value={this.state.country} keyboardType='numeric' maxLength={5} />
                </View>
                <Button title="Jatka" type="success" onPress={() => { this.handleSubmit(); this.props.navigation.navigate('Methods'); }}  />
            </View>
        </ScrollView>
		);
	}
}

export default (Shipping);

