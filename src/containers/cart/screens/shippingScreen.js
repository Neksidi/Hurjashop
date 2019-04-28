import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Button, TouchableOpacity, TextInput, } from 'react-native';
import { bindActionCreators } from 'redux';
import { btn, theme, primaryGradientColors } from '../../../app/styles/global'
import { addShipping } from '../../profile/redux/userActions'
import LinearGradient from 'react-native-linear-gradient';


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

            <LinearGradient 
						start={{x: 0, y: 0}} end={{x: 1, y: 1}}
						colors={primaryGradientColors} 
						style={[styles.linearGradient, theme.inputScreenContainer, {height:'100%'}]}>
                       
                <ScrollView>
                    <View style={theme.container}>
                        <View style={theme.inputContainer}> 
                            <Text style={theme.label}>Etunimi</Text>
                            <TextInput style={theme.textInput} onChangeText={(first_name) => this.setState({ first_name })} value={this.state.first_name} underlineColorAndroid='transparent' />
                        </View>

                        <View style={theme.inputContainer}>
                            <Text style={theme.label}>Sukunimi</Text>
                            <TextInput style={theme.textInput} onChangeText={(last_name) => this.setState({ last_name })} value={this.state.last_name} underlineColorAndroid='transparent' />
                        </View>

                        <View style={theme.inputContainer}>
                            <Text style={theme.label}>Osoite</Text>
                            <TextInput style={theme.textInput} onChangeText={(address) => this.setState({ address })} value={this.state.address} underlineColorAndroid='transparent' />
                        </View>

                        <View style={theme.inputContainer}>
                            <Text style={theme.label}>Postitoimipaikka</Text>
                            <TextInput style={theme.textInput} onChangeText={(city) => this.setState({ city })} value={this.state.city} />
                        </View>

                        <View style={theme.inputContainer}>
                            <Text style={theme.label}>Postinumero</Text>
                            <TextInput style={theme.textInput} onChangeText={(zipcode) => this.setState({ zipcode })} value={this.state.zipcode} keyboardType='numeric' maxLength={5} />
                        </View>

                        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={theme.linearGradient}>
                            <Text 
                                onPress={() => { this.handleSubmit(); this.props.navigation.navigate('Methods'); }} 
                                style={theme.continueButton}
                            >
                            Jatka
                            </Text>
                        </LinearGradient>

                    </View>
                </ScrollView>
            </LinearGradient>
		);
	}
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 0,
        padding: 5,
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

