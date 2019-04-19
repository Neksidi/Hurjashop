import React, { Component } from 'react'
import { View, StyleSheet, Text, Button, ScrollView, FlatList, ActivityIndicator } from 'react-native';
//import { Logo, Drawer, Cart, } from '../../navigation/options/Items'
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
    render() {

        return (
            <ScrollView>
                <View>
                    <Text>Tietoa meistä</Text>
                </View>
            </ScrollView>
        );

    }
}




export default Index;
