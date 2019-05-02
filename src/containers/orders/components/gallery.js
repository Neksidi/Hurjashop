import React, { Component } from 'react'
import {TouchableWithoutFeedback, TouchableOpacity, Text, View, Modal, StyleSheet } from 'react-native'
import Gallery from 'react-native-image-gallery';
// Vendor components
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'

export default class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      images: [],
      visible: false,
      initialPage: 0,
      index: 0,
      altEnabled: false,
      countEnabled: true,
    }
  }

  componentWillMount() {
    let imgs = [];
    for(i in this.props.images){
      imgs.push({
        source: {
          uri: this.props.images[i].src
        },
        caption: this.props.images[i].alt,
      });
    }
    this.setState({images: imgs});
  }

  show(activeSlide){
    this.setState({visible: true, initialPage: activeSlide});

  }

  _renderCount(){
    return(
      <View style={{position: 'absolute', top:10, left: 10, zIndex: 99, padding: 5, }}>
        <Text style={{fontSize: 20, color: '#fff'}}>{this.state.index + 1} / {this.props.images.length}</Text>
      </View>
    );
  }

  _renderAlt(){
    const { images, index } = this.state;
    return(
      <View>
        <Text style={{color: '#fff'}}>{ (images[index] && images[index].caption) || '' }</Text>
      </View>
    );
  }

  render() {
    return (
      <Modal visible={this.state.visible}
        onRequestClose={() => {this.setState({visible: false})}}
        transparent={true}
        animationType={'fade'}
        >
        <TouchableWithoutFeedback onPress={() => {this.setState({visible: false})}}>
          <View style={styles.modalContainer}>

            <TouchableWithoutFeedback onPress={() => {}}>
              <View>
                <Gallery
                  images={this.state.images}
                  initialPage={this.state.initialPage}
                  onPageSelected={(index) => this.setState({index})}
                  keyExtractor={(_, index) => index.toString()}
                  />
                {this.state.altEnabled && this._renderAlt()}
                <TouchableOpacity style={{position: 'absolute', top: 10, right: 10, elevation: 99, zIndex: 99, padding: 5,}} onPress={() => {this.setState({visible: !this.state.visible})}}>
                  <FAIcon name={'times'} size={35} color={'#fff'}></FAIcon>
                </TouchableOpacity>
                {this.state.countEnabled && this._renderCount()}
              </View>
            </TouchableWithoutFeedback>

          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
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
    backgroundColor: '#292929'
  },
  contentContainer: {
    backgroundColor: '#fff',
  }
});
