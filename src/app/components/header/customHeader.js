import React, { Component } from 'react';
import { Header } from 'react-navigation';
import { View, Platform, Text, Image, Button} from 'react-native';
import { styles, theme } from '../../../app/styles/global'
class CustomHeader extends Component {
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
                    <Button
				        onPress={() => alert('This is a button!')}
			        	title="Info"
				        color="green"
			        />
                </View>
		    </View>
        );
    }
};

export default CustomHeader;
