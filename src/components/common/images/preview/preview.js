import React, { Component } from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, Dimensions, TouchableWithoutFeedback } from 'react-native'
// Vendor components
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'
import Slider from '../slider'

let {height, width} = Dimensions.get('window');

class Preview extends Component {

  /*KÄYTTÖ:
  - Komponentin tagien sisään tulee komponentti jolla avataan overlay
  - Jos halutaan kuva jonka päällä on ikoni, josta overlay aukeaa tulee asettaa propsi openWithIcon={true}
    - ikonin voi päättää FontAwesome ikoneista sen nimellä käyttäen propsia icon=' ikonin nimi ' stringinä. OLETUS: search.plus
    - ikonin värin voi päättää propsilla iconColor esim. iconColor={'#fff'}, joka on myös oletuksena
    - ikonin koon voi valita propsilla iconSize esim. iconSize={25} OLETUS: 25
  - Sisältö on tällä hetkellä mahdollista olla vain kuva(Image) ja sen voi asettaa propsilla contentUrl esim contentUrl={https://kivi.jpg}
    - kuvan kokoa voi muokata suhteessa laitteen kokoon:
      - Korkeus on prosenttuaalinen osuus laitteen korkeudesta
        - Käytetään propsia previewHeight esim. previewHeight={0.6} OLETUS 0.6 eli 60%
      - Leveys on prosenttuaalinen osuus laitteen leveydestä
        - Käytetään propsia previewWidth esim previewWidth={0.8} OLETUS 0.8 eli 80%
  - Komponentille voi määritellä animaatiosiirtymän käyttämällä propsia animationType:
    - Käytettävissä olevat animaatiot:
      - fade
      - slide
      - none OLETUS
  - Komponentin voi asettaa aukinaiseksi alussa propsilla visible={true}
  - Komponentin taustan voi asettaa läpinäkyväksi propsilla transparent={true} OLETUS
  */

  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible ? this.props.visible : false,
      transparent: this.props.transparent ? this.props.transparent : true,
      contentUrl: this.props.contentUrl ? this.props.contentUrl: '',
      icon: this.props.icon ? this.props.icon : 'search-plus',
      iconColor: this.props.iconColor ? this.props.iconColor : '#000',
      iconSize: this.props.iconSize ? this.props.iconSize : 25,
      previewWidth: this.props.previewWidth ? this.props.previewWidth : 0.8,
      previewHeight: this.props.previewHeight ? this.props.previewHeight : 0.6,
      animationType: 'none',
      openWithIcon: false,
      renderItems: this.props.renderItems ? this.props.renderItems : null,
    }
    switch (this.props.animationType) {
      case 'fade':
        this.state.animationType = 'fade';
        break;
      case 'slide':
        this.state.animationType = 'slide';
        break;
      case 'none':
        this.state.animationType = 'none';
        break;
      default:
        this.state.animationType = 'none';
        break;
    }
    if(this.props.openWithIcon != undefined){this.state.openWithIcon = this.props.openWithIcon}

  }

  render() {
    let openOption = this.state.openWithIcon ? (
      <View style={{backgroundColor: '#fff', padding: 5,flex: 1}}>
        <TouchableOpacity style={{position: 'absolute', top: 10, right: 10, elevation: 1, zIndex: 1, padding:5}} onPress={() => {this.setState({visible: true})}}>
            <FAIcon name={this.state.icon} size={this.state.iconSize} color={this.state.iconColor}></FAIcon>
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>{this.props.children}</View>
      </View>
    ) : (
      <View style={{backgroundColor: '#fff', flex: 1}}>
        <TouchableOpacity style={{}} onPress={() => {this.setState({visible: true})}}>
            <View style={{alignItems: 'center'}}>{this.props.children}</View>
        </TouchableOpacity>

      </View>
    );
    if (!this.state.renderItems || this.state.renderItems.length < 2){
      return(
        <View style={styles.container}>
          <Modal visible={this.state.visible}
                  onRequestClose={() => {this.setState({visible: false})}}
                  transparent={this.state.transparent}
                  animationType={this.state.animationType}
            >
            <TouchableWithoutFeedback onPress={() => {this.setState({visible: false})}}>
            <View style={styles.modalContainer}>

              <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.contentContainer}>

                <TouchableOpacity style={{position: 'absolute', top: 10, right: 10, elevation: 99, zIndex: 99, padding: 5}} onPress={() => {this.setState({visible: !this.state.visible})}}>
                  <FAIcon name='times' size={25} color={this.state.iconColor}></FAIcon>
                </TouchableOpacity>
                <View style={{alignItems: 'center', height: height*this.state.previewHeight, width: width*this.state.previewWidth}}><Image source={{uri: this.state.contentUrl}} style={{height: height*this.state.previewHeight, width: width*this.state.previewWidth}}/></View>
              </View>

              </TouchableWithoutFeedback>

            </View>
            </TouchableWithoutFeedback>
          </Modal>
          {openOption}
        </View>
      );
  } else {
    return (
      <View style={styles.container}>
        <Modal visible={this.state.visible}
                onRequestClose={() => {this.setState({visible: false})}}
                transparent={this.state.transparent}
                animationType={this.state.animationType}
          >
          <TouchableWithoutFeedback onPress={() => {this.setState({visible: false})}}>
          <View style={styles.modalContainer}>

            <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.contentContainer}>

              <TouchableOpacity style={{position: 'absolute', top: 10, right: 10, elevation: 99, zIndex: 99, padding: 5}} onPress={() => {this.setState({visible: !this.state.visible})}}>
                <FAIcon name='times' size={25} color={this.state.iconColor}></FAIcon>
              </TouchableOpacity>
              <View style={{alignItems: 'center', height: height*this.state.previewHeight, width: width*this.state.previewWidth}}><Slider data={this.state.renderItems} imageWidth={width*this.state.previewWidth} imageHeight={height * this.state.previewHeight}/></View>
            </View>

            </TouchableWithoutFeedback>

          </View>
          </TouchableWithoutFeedback>
        </Modal>
        {openOption}
      </View>
    );
  }

  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0, 0.6)'
  },
  contentContainer: {
    backgroundColor: '#fff',
  }

});

export default Preview
