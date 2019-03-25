import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { ScrollView, Text, View, Button, ImageBackground, TouchableOpacity, Image, TouchableWithoutFeedback, Linking } from 'react-native';
import { DrawerActions } from 'react-navigation';
import Item from '../components/item'
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'
import { theme } from '../../../app/styles/global'
import { renderUserLinks, renderAuthLinks, logOut } from '../controllers/drawerController'
import { setLoginStatus } from '../../profile/redux/userActions'
import { bindActionCreators } from 'redux';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: ['Paidat', 'Lippikset', 'Mäkiautot']
    }
  };

  categoryButtonHandler() {
    console.log("clicketi click")
  }

  render() {
    return (
      <View style={{ width: '100%', borderBottomWidth: 1, borderColor: '#ffffff50', paddingBottom: 10 }}>
        <View>
          <Item title='Kategoriat' icon='cubes' onPress={this.categoryButtonHandler} />
          <ScrollView style={{ height: 100 }}>
            {
              this.state.categories.map((category, index) => {
                return (
                  <Item key={index} title={category + ' (' + category.count + ')'} arrow onPress={() => this.props.navigation.navigate('Category', { item: category })} />
                );
              })
            }
          </ScrollView>
        </View>
      </View>
    );
  }
}
/*  Get categories
const mapStateToProps = (state) => {
 
};
*/

export default connect(null, null)(Categories);