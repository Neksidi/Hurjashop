import React, { Component } from 'react';
import { Header } from 'react-navigation';
import { View, Platform, Text, Image, Button, TouchableOpacity} from 'react-native';
import { styles, theme } from '../../../app/styles/global'
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'
import NavigationService from '../../../navigation/navigators/NavigationService'

const icon_size = 25;
const icon_color = theme.color.navigation.main;

class CustomHeader extends Component {
    render() {
		let logoSize = this.props.small == true ? (styles.logoSmall) : (styles.logo);
		let logoTop = this.props.small == true ? (0) : (30);

        return (
		    
			<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
			   
			    <View style={{ flex: 1, top: logoTop, flexDirection: 'row', justifyContent: 'center'}}>
				    <Image style={logoSize} source={require('../../../assets/images/hurja_shop_logo.png')} />
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
