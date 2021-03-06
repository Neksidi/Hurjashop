import React, { Component } from 'react'
import { Text, View, ActivityIndicator, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { theme, primaryGradientColorsButton, app_style, modalColors } from '../../../styles/global'
import Modal from "react-native-modal";
import LinearGradient from 'react-native-linear-gradient';

const boxWidth = Dimensions.get('window').width * 0.9;

export default class Index extends Component {
	constructor(props) {
        super(props);
        
		this.state = {
            visible: false,
            title:"",
            content:"",
            type:"info",
		  }
    }
    

    componentDidMount() {
		this.setState({
            title:this.props.title,
            content:this.props.content,
        });

  }
  
  renderOkButton = () => (
    <TouchableOpacity
        onPress={() => {this.hide();}}>
        <LinearGradient colors={primaryGradientColorsButton} style={[
            theme.linearGradient, {
            postion:"absolute",
            bottom:0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 2}]}>
                
        <Text style={{color: '#fff', fontWeight: 'bold'}}>OK</Text>
        </LinearGradient>
    </TouchableOpacity>
  
  )

  renderModalContent = () => (
    <View style={{justifyContent: "center", alignItems: "center"}}>
        <LinearGradient 
            start={{x: 0, y: 0}} end={{x: 1, y: 1}}
            colors={modalColors} 
            style={[styles.modalBox, styles.linearGradient, {width:boxWidth}]}>
            
            <View styles={styles.modalContent}>
                <Text style={{fontFamily: 'BarlowCondensed-Bold', fontSize: 20}}>{this.state.title ? ((this.state.title)) : ((""))}</Text>
                <Text style={{fontFamily: 'BarlowCondensed-Bold', fontSize: 20}}>{this.state.content ? ((this.state.content)) : ((""))}</Text>
                {this.renderOkButton()}
            </View>
    
        </LinearGradient>
    </View>
  );

  handleOnScroll = event => {
    this.setState({
      scrollOffset: event.nativeEvent.contentOffset.y,
    });
  };

  handleScrollTo = p => {
    if (this.scrollViewRef) {
      this.scrollViewRef.scrollTo(p);
    }
  };

  show() {
    this.setState({visible: true});

  }

  hide() {
    this.setState({visible: false});
  }

  setTitle(title) {
    this.setState({title: title});
  }

  setContent(content) {
    this.setState({content: content});
  }

  render() {
    return(
        <Modal
          isVisible={this.state.visible}
          backdropColor={"transparent"}
          backdropOpacity={1}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={1000}
          animationOutTiming={1000}
          backdropTransitionInTiming={1000}
          backdropTransitionOutTiming={1000}>
          {this.renderModalContent()}
        </Modal>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      margin:20,
      padding:20,
    },

    modalBox: {
        padding:10,
        borderWidth:2,
        borderColor: '#000000',
    },
    modalContent: {
      padding: 20,
      justifyContent: "center",
      alignItems: "center",
    },

    bottom: {
        flex:1, 
        justifyContent: 'flex-end',
    }
});