import React, { Component } from 'react';
import { Header } from 'react-navigation';
import { View, Platform, Text, Image, Button, TouchableOpacity} from 'react-native';
import { styles, theme } from '../../../app/styles/global'
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'
import NavigationService from '../../../navigation/navigators/NavigationService'

const icon_size = 25;
const icon_color = theme.color.navigation.main;

class CustomHeader extends Component {

	onPress(){
		//this.props.navigation.navigate('Cart')
		console.log("Cart")
	}

    render() {
        return (
		    /*<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
			    <View style={{ flex: 1, paddingLeft: 10 }}>
				   
			    </View>
			    <View style={{ flex: 1, top: 30, flexDirection: 'row', justifyContent: 'center'}}>
				    <Image style={styles.logo} source={require('../../../assets/images/hurja_shop_logo.png')} />
			    </View>
			    <View style={{flex: 1}}> 
                    <Button
				        onPress={() => alert('This is a button!')}
			        	title="Info"
				        color="green"
			        />
                </View>
			</View>*/
			<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
			   
			    <View style={{ flex: 1, top: 30, flexDirection: 'row', justifyContent: 'center'}}>
				    <Image style={styles.logo} source={require('../../../assets/images/hurja_shop_logo.png')} />
			    </View>
				<View > 
					<TouchableOpacity onPress={ () => { NavigationService.navigate('Cart') } } style={styles.headerContainer}>
       				 	<FAIcon name={ 'shopping-cart' } size={ icon_size } color={ icon_color } style={ styles.icon } ></FAIcon>
      				</TouchableOpacity>
                </View>
			
		    </View>
        );
	}
	
};

export default CustomHeader;
