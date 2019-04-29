import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Button, TouchableOpacity, TextInput, } from 'react-native';
import { bindActionCreators } from 'redux';
import { btn, theme, primaryGradientColors, primaryGradientColorsButton } from '../../../app/styles/global'
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
                            <TextInput style={theme.inputs} onChangeText={(first_name) => this.setState({ first_name })} value={this.state.first_name} underlineColorAndroid='transparent' />
                        </View>

                        <View style={theme.inputContainer}>
                            <Text style={theme.label}>Sukunimi</Text>
                            <TextInput style={theme.inputs} onChangeText={(last_name) => this.setState({ last_name })} value={this.state.last_name} underlineColorAndroid='transparent' />
                        </View>

                        <View style={theme.inputContainer}>
                            <Text style={theme.label}>Osoite</Text>
                            <TextInput style={theme.inputs} onChangeText={(address) => this.setState({ address })} value={this.state.address} underlineColorAndroid='transparent' />
                        </View>

                        <View style={theme.inputContainer}>
                            <Text style={theme.label}>Postitoimipaikka</Text>
                            <TextInput style={theme.inputs} onChangeText={(city) => this.setState({ city })} value={this.state.city} />
                        </View>

                        <View style={theme.inputContainer}>
                            <Text style={theme.label}>Postinumero</Text>
                            <TextInput style={theme.inputs} onChangeText={(zipcode) => this.setState({ zipcode })} value={this.state.zipcode} keyboardType='numeric' maxLength={5} />
                        </View>

						<TouchableOpacity
							onPress={() =>{this.handleSubmit(); this.props.navigation.navigate('Methods');}}>
							<LinearGradient colors={primaryGradientColorsButton} style={[theme.linearGradient]}>	
								<Text style={{color: '#fff', fontWeight: 'bold', marginLeft: 10}}>Jatka</Text>
							</LinearGradient>
						</TouchableOpacity>


                

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

const mapStateToProps = (state) => {
    return {
        contact: state.user.contact,
    }
}

const mapDispatchToProps = dispatch => (
	bindActionCreators({ addShipping }, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Shipping);

