import React from 'react';
import { ScrollView, Text, View, Button, ImageBackground, TouchableOpacity, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import Item from '../components/item'

function logOut(props){
  /*
  * TODO: handle logout with back-end
  */
  console.log("Logging out")
  props.navigation.closeDrawer();
    Alert.alert(
      'Kirjaudu ulos',
      'Haluatko varmasti kirjautua ulos?',
      [
        {text: 'Peruuta', onPress:()=> props.navigation.openDrawer()},
        {text: 'Kyllä', onPress: () => props.setLoginStatus(false)}
      ],
      {cancellable: true}
    );
}

export {
    logOut
}