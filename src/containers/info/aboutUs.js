import React, { Component } from 'react'
import { View, StyleSheet, Text, Button, ScrollView, FlatList, ActivityIndicator } from 'react-native';
//import { Logo, Drawer, Cart, } from '../../navigation/options/Items'
// Global styles
import { theme } from '../../app/styles/global'


class Index extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
          header: null,
        }
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
