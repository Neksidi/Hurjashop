import { connect } from 'react-redux'
import React, { Component } from 'react'
import { View, StyleSheet, Text, Button, ScrollView, FlatList, ActivityIndicator, Picker, TextInput, Keyboard, TouchableOpacity } from 'react-native';

import ButtonDefault from '../profile/components/defaultLoginButton'
//import { Logo, Drawer, Cart, CustomBackButton } from '../../navigation/options/Items'
// Global styles
import { theme } from '../../app/styles/global'
import { MAIL_URL } from '../../app/config/index'
import Validator from './validator'
import FeatherIcon from 'react-native-vector-icons/dist/Feather'
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.logged ? (this.props.contact.first_name + ' ' + this.props.contact.last_name) : '',
            email: this.props.logged ? this.props.contact.email : '',
            subject: '',
            comment: '',
            response: null,
            isFilled: false,
            isSending: false,
            selected: 'productFeedback',//DEFAULT
            otherReason: '',
        }
    }

    componentDidUpdate() {
        if (!this.state.isFilled && this.state.name != '' && this.state.email != '' && this.state.comment != '' && Validator.email(this.state.email) && this.state.selected != null) {

            if ((this.state.selected != 'other') || (this.state.selected == 'other' && this.state.otherReason != '')) {
                this.setState({ isFilled: true });
            }

        } else if (this.state.isFilled && (this.state.name == '' || this.state.email == '' || this.state.comment == '' || !Validator.email(this.state.email) || this.state.selected == null || (this.state.selected == 'other' && this.state.otherReason == ''))) {
            this.setState({ isFilled: false });
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
        }
    };

    sendFeedback() {
        Keyboard.dismiss();
        this.setState({ isSending: true });
        let body;
        if (this.state.selected == 'other') {
            body = {
                "name": this.state.name,
                "email": this.state.email,
                "subject": 'Muu: ' + this.state.otherReason,
                "comment": this.state.comment,
            }
        } else {
            body = {
                "name": this.state.name,
                "email": this.state.email,
                "subject": this.state.selected,
                "comment": this.state.comment,
            }
        }
        return fetch(MAIL_URL + "/feedback", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    response: responseJson,
                }, function () {
                    if (response == 201) {
                        this.setState({ isSending: false })
                        console.log("Email success")
                    }
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    _renderContactInfoInput() {
        return (
            <View style={{ width: '100%' }}>
                <View style={styles.inputContainer}>
                    <TextInput placeholder='Nimi:' autoCapitalize='words' inputStyle={styles.input} underlineColorAndroid='transparent' blurOnSubmit={false} onChangeText={(name) => this.setState({ name })} returnKeyType={'next'} onSubmitEditing={() => { this.emailTextInput.focus(); }} blurOnSubmit={false} />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput placeholder='Sähköposti:' keyboardType={'email-address'} autoCapitalize='none' inputStyle={styles.input} underlineColorAndroid='transparent' onChangeText={(email) => this.setState({ email })} ref={(input) => { this.emailTextInput = input }} returnKeyType={'next'} />
                </View>
            </View>
        );
    }

    render() {
        let send = this.state.isSending ? (<ActivityIndicator size={'large'} color={'#fff'} />) : (<ButtonDefault disabled={!this.state.isFilled} text="Lähetä" type="success" onPress={() => { this.sendFeedback() }} />);

        let contactInfo = !this.props.logged ? (<View style={{ width: '100%' }}>{this._renderContactInfoInput()}</View>) : null;
        let other = this.state.selected == 'other' ? (<TextInput style={{ width: '100%', height: 40, marginTop: 4, backgroundColor: '#fff', borderRadius: 4, }} placeholder='Muu syy:' underlineColorAndroid={'transparent'} autoCapitalize='sentences' onChangeText={(otherReason) => this.setState({ otherReason })} />) : null;

        return (
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <TouchableOpacity style={styles.customBackButton} onPress={() => this.props.navigation.navigate("Home")}>
                        <FeatherIcon name='chevron-left' size={25} color='#fff' />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.title}>Ota yhteyttä</Text>
                </View>

                {contactInfo}
                <Text style={styles.subtitle}>Aihe:</Text>
                <View style={styles.inputContainer}>
                    <Picker selectedValue={this.state.selected}
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                        onValueChange={(itemValue, itemIndex) => { this.setState({ selected: itemValue }) }}
                        mode={'dropdown'}>

                        <Picker.Item value='productFeedback' label='Tuotepalaute' />
                        <Picker.Item value='devIdea' label='Kehitysidea verkkokauppaan' />
                        <Picker.Item value='technicalError' label='Tekninen vika' />
                        <Picker.Item value='internalError' label='Sisällinen virhe' />
                        <Picker.Item value='other' label='Muu syy' />
                    </Picker>
                </View>
                {other}
                <Text style={styles.subtitle}>Palaute:</Text>
                <View style={styles.commentContainer}>
                    <TextInput placeholder='Palaute:' autoCapitalize='sentences' inputStyle={styles.input} underlineColorAndroid='transparent' onChangeText={(comment) => this.setState({ comment })} ref={(input) => { this.commentTextInput = input }} />
                </View>
                <View style={{ width: '100%', marginTop: 10, maxWidth: 400 }}>
                    {send}
                </View>

                <Text style={{ color: '#fff' }}>HUOM EI LÄHETÄ VIELÄ MINNEKÄÄN!</Text>


            </View>
        );

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.color.hurja.main,
        padding: 20,
    },
    leftContainer: {
        flex: 1,
        alignSelf: 'flex-start'

    },
    inputContainer: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 4,
        margin: 5,
        maxWidth: 400,
    },
    commentContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        borderRadius: 4,
        marginVertical: 10,
        maxWidth: 400,
        maxHeight: 100,

    },
    input: {
        color: '#000',
    },
    separatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        maxWidth: 400
    },
    separatorLine: {
        flex: 2,
        borderBottomWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
    },
    separatorText: {
        color: '#fff'
    },
    title: {
        fontSize: 40,
        color: '#fff',
        fontFamily: 'BarlowCondensed-Medium'

    },
    picker: {
        width: '100%',
        maxWidth: 400,
        height: 40,
    },
    pickerItem: {

    },
    subtitle: {
        alignSelf: 'flex-start',
        color: '#fff',
        fontSize: 30,
        fontFamily: 'BarlowCondensed-Medium'
    }
});

const map_state_props = (state) => {
    /* return {
         logged: state.contact_reducer.isLogged,
         contact: state.contact_reducer.contact,
     }*/
}

export default connect(map_state_props)(Index);
