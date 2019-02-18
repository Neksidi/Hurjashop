import React from 'react';
import { ScrollView, Text, View, Button, ImageBackground, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';
import Item from '../components/item'
import { app_style } from '../../../app/styles/global'

function renderUserLinks(props){
    return (
      <View style={{ borderBottomWidth: 1, borderColor: '#ffffff50', paddingBottom: 10}}>
        <Text style={app_style.drawer_contact}>Hei {props.contact.first_name} {props.contact.last_name}!</Text>
        <Item title='Profiili' icon='user-o' onPress={() => props.navigation.navigate('Profile')}/>
        <Item title='Omat tilaukset' icon='list-alt' onPress={() => props.navigation.navigate('Orders')}/>
        <Item title='Kirjaudu ulos' icon='sign-out' onPress={() => logOut(props)}/>
      </View>
    );
  }

function renderAuthLinks(props) {
  return (
    <View style={{ borderBottomWidth: 1, borderColor: '#ffffff50', paddingBottom: 10}}>
      <Item title='Kirjaudu sisään' icon='sign-in' onPress={() => props.navigation.navigate('Login')}/>
      <Item title='Rekisteröidy' icon='user-plus' onPress={() => props.navigation.navigate('Register')}/>
    </View>
  );
}

function logOut(props){
  /*
  * TODO: handle logout with back-end
  */
  console.log("Logging out")
  this.props.navigation.closeDrawer();
    Alert.alert(
      'Kirjaudu ulos',
      'Haluatko varmasti kirjautua ulos?',
      [
        {text: 'Peruuta', onPress:()=> this.props.navigation.openDrawer()},
        {text: 'Kyllä', onPress: () => props.setLoginStatus(false)}
      ],
      {cancellable: true}
    );
}

function renderCategories(categories){
    return categories.map((category, index) => {
      return (
        <Item title={category.name + ' (' + category.count + ')'} arrow onPress={() => this.props.navigation.navigate('Category', {item: category})}/>
      );
    })
}

export {
    renderUserLinks,
    renderAuthLinks,
    renderCategories,
    logOut
}