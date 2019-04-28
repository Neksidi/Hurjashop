import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Button, TouchableOpacity, TextInput, } from 'react-native';
import { bindActionCreators } from 'redux';
import { theme } from '../../../app/styles/global'
import { addShipping } from '../../profile/redux/userActions'


class Shipping extends Component {
	constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: null,
            first_name: 'Severi',
            last_name: 'Serveri',
            address: 'Kauppakatu 20',
            zipcode: '70100',
            city: 'Mualiman napa',
            shipping: null,
        };
	}

	static navigationOptions = {
		headerStyle: {
            backgroundColor: theme.color.navigation.background,
        },
    headerTitle: "Lähetystiedot",
    headerTintColor: 'white',
    };
    
    handleSubmit = () => {
        this.state.shipping = {
            first_name: this.state.first_name, 
            last_name: this.state.last_name, 
            address: this.state.address, 
            zipcode: this.state.zipcode, 
            city: this.state.city,
        };
        this.props.addShipping(this.state.shipping);

    };

	render() {
       
		return (
            <ScrollView style={{ backgroundColor: '#fff' }}>
                <View style={styles.container}>

                <View style={styles.inputContainer}> 
                        <Text style={styles.label}>Etunimi</Text>
                        <TextInput style={styles.textInput} onChangeText={(first_name) => this.setState({ first_name })} value={this.state.first_name} underlineColorAndroid='transparent' />
                    </View>

                    <View >
                    <Text style={styles.label}>Sukunimi</Text>
                        <TextInput style={styles.textInput} onChangeText={(last_name) => this.setState({ last_name })} value={this.state.last_name} underlineColorAndroid='transparent' />
                    </View>

                    <View >
                        <Text style={styles.label}>Osoite</Text>
                        <TextInput style={styles.textInput} onChangeText={(address) => this.setState({ address })} value={this.state.address} underlineColorAndroid='transparent' />
                    </View>

                    <View >
                        <Text style={styles.label}>Postitoimipaikka</Text>
                        <TextInput style={styles.textInput} onChangeText={(city) => this.setState({ city })} value={this.state.city} />
                    </View>

                    <View >
                        <Text style={styles.label}>Postinumero</Text>
                        <TextInput style={styles.textInput} onChangeText={(zipcode) => this.setState({ zipcode })} value={this.state.zipcode} keyboardType='numeric' maxLength={5} />
                    </View>
                    <Button title="Jatka" type="success" onPress={() => { this.handleSubmit(); this.props.navigation.navigate('Methods'); }} style={styles.signupButton} />
                </View>
            </ScrollView>
		);
	}
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 0,
        padding: 20,
    },
    textInput: {
        width: '100%',
        height: 40,
        borderRadius: 3,
        borderWidth: 1,
    },
    inputContainer: {
        marginVertical: 10,
    },
    label: {
        marginBottom: 5,
    },
    checkBoxContainer: {
        justifyContent: 'center',
    },
});

const mapDispatchToProps = dispatch => (
	bindActionCreators({ addShipping }, dispatch));

export default connect(null, mapDispatchToProps)(Shipping);

