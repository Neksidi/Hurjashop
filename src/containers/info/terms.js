import React, { Component } from 'react'
import { View, StyleSheet, Text, Button, ScrollView, FlatList, ActivityIndicator, WebView, } from 'react-native';

//import { Logo, Drawer, Cart, CustomBackButton } from '../../navigation/options/Items'
// Global styles
import { theme } from '../../app/styles/global'
import CustomHeader from '../../app/components/header/customHeader'

class Index extends Component {

    static navigationOptions = {
		headerStyle: {
			backgroundColor: theme.color.navigation.background,
			height: theme.navigation.height,
		},
		headerTitle: <CustomHeader/>,
		headerLeft: (
			<View></View> //needed to justify logo in center
		
		  ),
		
	};

    constructor(props) {
        super(props);
        this.state = {
            data: null,
        }
    }

    componentWillMount() {
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

    parseHtml(html) {
        let str = html.replace('<p>[vc_row][vc_column][vc_column_text el_class=&#8221;tietosuojaseloste&#8221;]</p>', ' ')
        str = str.replace(/[\u00e4]/g, '&#228').replace(/[\u00f6]/g, '&#246').replace('[/vc_column_text][/vc_column][/vc_row]', ' ')
        return str
    }

    render() {
        let output = this.state.data != null ? (
            <WebView source={{ html: this.parseHtml(this.state.data.content.rendered) }} style={{ flex: 1 }} />
        ) : (<ActivityIndicator />);
        return (
            <View style={{ flex: 1, }}>
                {output}
            </View>
        );

    }
}




export default Index;
