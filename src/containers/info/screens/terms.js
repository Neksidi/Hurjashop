import React, { Component } from 'react'
import { View, StyleSheet, Text, Button, ScrollView, FlatList, ActivityIndicator, WebView, BackHandler } from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import { theme } from '../../../app/styles/global'
import CustomHeader from '../../../app/components/header/customHeader'

class Terms extends Component {
    _didFocusSubscription;
    _willBlurSubscription;

    constructor(props) {
        super(props);
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
            BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
        this.state = {
            data: null,
            refresh: 0,
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerStyle: {
                backgroundColor: theme.color.navigation.background,
                height: theme.navigation.height,
            },
            headerTitle: <CustomHeader />,
            headerLeft: (<HeaderBackButton 
                            tintColor='#FFFFFF' 
                            onPress={ navigation.getParam('handleBack') }
                        />)
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
            BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
        this.props.navigation.setParams({ handleBack: this.handleBack });
        fetch('http://hurjashop.qs.fi/wp-json/wp/v2/pages/1011/')
        .then((response) => {
            response.json()
                .then((responseJson) => {
                    this.setState({ data: responseJson })
                })
        }).catch((error) => {
            console.error(error)
        })
    }

    componentWillUnmount() {
        this._didFocusSubscription && this._didFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();
    }

    handleBack = () => {
        console.log("Header back")
        this.setState({refresh: this.state.refresh + 1});
        this.props.navigation.navigate('Home');
    };

    onBackButtonPressAndroid = () => {
        console.log("DIEEE")
        this.setState({refresh: this.state.refresh + 1});
    };

    parseHtml(html) {
        let str = html.replace('<p>[vc_row][vc_column][vc_column_text el_class=&#8221;tietosuojaseloste&#8221;]</p>', '<br><br/>')
        str = str.replace(/[\u00e4]/g, '&#228').replace(/[\u00f6]/g, '&#246').replace('[/vc_column_text][/vc_column][/vc_row]', ' ')
        return str
    }

    render() {
        let output = this.state.data != null ? (
            <WebView 
            key={this.state.refresh}
            source={{ html: this.parseHtml(this.state.data.content.rendered) }} 
            style={{ flex: 1 }} />
        ) : (<ActivityIndicator />);
        return (
                <View style={{ flex: 1, marginTop: -15 }}>
                   {output}
                </View>
        );

    }
}

export default Terms;
