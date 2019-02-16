import React from 'react'
// React Native components
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'

// Vendor components
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'
// Global styles
import { theme } from '../../styles/Global'
import CartComponent from './CartNavi'



const icon_size = 25;
const icon_color = theme.color.navigation.main;


const Logo = (navigation) => {
	return (
  		<Image  style={styles.logo} source={require('../../assets/images/hurja_shop_logo.png')} resizeMode='contain' />
	)
}

const Drawer = (navigation) => {
	return (
		<TouchableOpacity onPress={ () => { navigation.toggleDrawer()} } style={{ paddingRight: 20 }}>
		    <FAIcon name={ 'bars' } size={ icon_size } color={ icon_color } style={ styles.icon }></FAIcon>
		</TouchableOpacity>
    )
}

const Cart = (navigation) => {
	return (
		<CartComponent />
	)
}


const styles = StyleSheet.create({
    logo: {
      flex: 1,
      marginVertical: 10,
          height: 100,
    },
    icon: {
      marginLeft: 20,
    },
  });

export {
    Logo,
    Drawer,
}

