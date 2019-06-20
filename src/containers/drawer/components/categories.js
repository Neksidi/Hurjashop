import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { ScrollView, Text, View, Button, ImageBackground, TouchableOpacity, Image, TouchableWithoutFeedback, Linking } from 'react-native';
import { DrawerActions } from 'react-navigation';
import Item from '../components/item'
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'
import { theme } from '../../../app/styles/global'
import { setLoginStatus } from '../../profile/redux/userActions'
import { bindActionCreators } from 'redux';
import { getCategories } from '../../category/controller/requests'
import { setCategories } from '../../category/redux/categoryActions'
import CustomModal from '../../../app/components/common/modal'


class Categories extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
		if(!this.props.categories.length) {
			getCategories(this.props,this);
		}
	}

  categoryButtonHandler() {
    console.log("clicketi click")
  }

  //TODO TOTEUTA KAIKKI TUOTTEET SIVU JA NAVIGOI

  render() {

    let allProductsCategory = 
		this.props.categories ? (
      <Item title="Kaikki tuotteet" arrow onPress={() => this.props.navigation.navigate('AllProducts')} />
      ) : (
          <Loader />
      );

		let categories =
		  this.props.categories ? (
      this.props.categories.map((category, index) => {
        if(category.name != undefined) {
          return (
            <Item key={index} title={category.name + ' (' + category.count + ')'} arrow onPress={() => this.props.navigation.navigate('Category', { category : category })} />
          );
        }
      })
		) : (
			<Loader />
    );

    return (
      <View style={{ width: '100%', borderBottomWidth: 1, borderColor: '#ffffff50', paddingBottom: 10 }}>
        <View>
          <Item title='Kategoriat' icon='cubes' onPress={this.categoryButtonHandler} />
          <ScrollView style={{ height: 200 }}>
            {allProductsCategory}
            {categories}        
          </ScrollView>
        </View>
        <CustomModal ref='getcategories' title="Virhe haettassa kategorioita" content="Yritä uudelleen" visible={false} /> 
      </View>
    );
  }
}

const mapStateToProps = (state) => {
	const categories = state.categories.all;
	return { categories }
};

const mapDispatchToProps = dispatch => (
	bindActionCreators({ getCategories, setCategories }, dispatch));
	
export default connect(mapStateToProps, mapDispatchToProps)(Categories);