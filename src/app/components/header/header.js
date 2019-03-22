import React, { Component } from 'react'
import { View, Text, StyleSheet, ImageBackground, Animated } from 'react-native'
import { theme, app_style } from '../../styles/global'


class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      topOpacity: new Animated.Value(0),//EKA
      bottomOpacity: new Animated.Value(0),
      topScale: new Animated.Value(0),//TOKA
      bottomScale: new Animated.Value(0),
    }
  }

  componentDidMount(){

    Animated.parallel([
      Animated.timing(this.state.topOpacity, {
        toValue: 1,
        duration: 1500,
        delay: 500,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.topScale, {
        toValue: 1,
        duration: 1500,
        delay: 500,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.bottomOpacity, {
        toValue: 1,
        duration: 1500,
        delay: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.bottomScale, {
        toValue: 1,
        duration: 1500,
        delay: 1000,
        useNativeDriver: true,
      })
    ]).start(() => {
      //CALLBACK
    });
  }

  render(){

    const topScale = {
      transform: [{ scale: this.state.topScale }]
    }
    const bottomScale = {
      transform: [{ scale: this.state.bottomScale }]
    }

    return (
      <View style={[{ ...this.props.style }, styles.container]}>
        <ImageBackground source={require('../../assets/images/header_tmp.jpg')} style={{height: 300, width: '100%'}} resizeMode='cover'>
          <View style={styles.innerContainer}>
            <Animated.View style={[{opacity: this.state.topOpacity}, topScale]}>
              <Text style={styles.pacifico}>Myö viännellään</Text>
            </Animated.View>
            <Animated.View style={[{opacity: this.state.bottomOpacity}, bottomScale]}>
              <Text style={styles.barlow}>HURJAN NÄTTIÄ</Text>
              <Text style={styles.barlow}>{'APPLIKAATIOTA </>'}</Text>
            </Animated.View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    backgroundColor: 'rgba(233, 70, 65, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pacifico: {
    fontFamily: 'Pacifico-Regular',
    color: '#fff',
    fontSize: 28,
  },
  barlow: {
    fontFamily: 'BarlowCondensed-ExtraBoldItalic',
    color: '#fff',
    fontSize: 34,
  }
});

export default Header
