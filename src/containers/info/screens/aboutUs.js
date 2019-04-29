import React, { Component } from 'react'
import { View, StyleSheet, Text, Button, ScrollView, FlatList, ActivityIndicator } from 'react-native';
//import { Logo, Drawer, Cart, } from '../../navigation/options/Items'
// Global styles
import { theme } from '../../../app/styles/global'
import CustomHeader from '../../../app/components/header/customHeader'
import { HeaderBackButton } from 'react-navigation';
class Index extends Component {

    /*static navigationOptions = {
		headerStyle: {
			backgroundColor: theme.color.navigation.background,
			height: theme.navigation.height,
		},
		headerTitle: <CustomHeader/>,
		headerLeft: (
			<View></View> //needed to justify logo in center
		
		  ),
		
    };*/
    static navigationOptions = ({ navigation }) => {
        return {
            headerStyle: {
                backgroundColor: theme.color.navigation.background,
                height: theme.navigation.height,
            },
            headerTitle: <CustomHeader />,
            headerLeft: (<HeaderBackButton tintColor='#FFFFFF' onPress={() => { navigation.navigate('Home') }} />)
        }
    }
    render() {

        return (
            <ScrollView>
                <View>
                    <Text style={{ fontSize: 20, marginLeft: 5 }}>
                        {`
Tietoa meistä

Olemme mutkaton kumppani digitaalisissa kehityshankkeissasi. Teemme verkkopalveluita, räätälöityjä ohjelmistoja ja mobiilikehitystä. Ammattitaitoisella otteella, sopivan rennolla meiningillä ja hyvällä sykkeellä.
Hurja Solutions Oy:n tehtävänä on tuottaa ohjelmistokehityksen palveluita, jotka antavat etumatkaa asiakkaamme kilpailukyvylle muuttuvassa maailmassa. Kun asiakkaamme menestyvät, menestymme mekin.

Toimipaikkamme on Kuopiossa, asiakkaamme ympäri Suomea. Yrityksessämme työskentelee lähes 20 henkilöä monipuolisella osaamisella ja hyvällä tekemisen meiningillä. Vahvan osaamisen ja jatkuvan kehittymisen myötä voimme tuottaa asiakkaillemme parhaan mahdollisen arvon.

Teemme nättiä koodia!
`}
                    </Text>
                </View>
            </ScrollView>
        );

    }
}




export default Index;
