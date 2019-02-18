/* @flow */

import React, { Component } from 'react';
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types'
import { theme } from '../../../app/styles/global'
import FeatherIcon from 'react-native-vector-icons/dist/Feather'

const SHAKE_TIMINGS = {
  SLOW: 150,
  FAST: 100,
}

export default class AnimatedWithLoader extends Component {
    constructor(props) {
      super(props);
      this.state = {
        animatedBackgroundColor: new Animated.Value(0),
        borderRadius: new Animated.Value(5),
        color: this.props.color,
        disabled: this.props.disabled,
        disabledColor: this.props.disabledColor,
        failed: false,
        failedColor: this.props.failedColor,
        failedIconOpacity: new Animated.Value(1),
        isLoading: this.props.isLoading ? this.props.isLoading : false,
        loaderOpacity: new Animated.Value(0),
        loaderSize: this.props.loaderSize,
        paddingVertical: this.props.paddingVertical,
        positionX: new Animated.Value(0),
        success: false,
        successIconOpacity: new Animated.Value(0),
        title: this.props.title,
        width: new Animated.Value(100),
      }
    }

    static propTypes = {
      color: PropTypes.string,
      disabled: PropTypes.bool,
      disabledColor: PropTypes.string,
      failedColor: PropTypes.string,
      loaderSize: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      marginVertical: PropTypes.number,
      paddingVertical: PropTypes.number,
      title: PropTypes.string.isRequired,
    }

    static defaultProps = {
      color: '#125194',
      disabledColor: '#D3D3D3',
      failedColor: theme.color.hurja.main,
      paddingVertical: 15,
      disabled: false,
    }

    static navigationOptions = ({ navigation }) => {
      return {
        header: null,
      }
    };

    animateIn(){
      this.props.onPress();
      this.setState({isLoading: true, paddingVertical: 6.5});
      Animated.parallel([
        Animated.timing(this.state.width, {
          toValue: 0,
          duration: 800,
        }),
        Animated.timing(this.state.borderRadius, {
          toValue: 25,
          duration: 500,
        }),
        Animated.timing(this.state.loaderOpacity, {
          toValue: 1,
          duration: 1000,
        }),
      ]).start();
    }

    animateOutFailed(){
      Animated.timing(this.state.animatedBackgroundColor, {
        toValue: 1,
        duration: 1000,
      }).start(() => {
        this.setState({failed: true});
        //SHAKE ANIMATION
        Animated.sequence([
          Animated.timing(this.state.positionX, {
            toValue: -15,
            duration: SHAKE_TIMINGS.SLOW,
          }),
          Animated.timing(this.state.positionX, {
            toValue: 15,
            duration: SHAKE_TIMINGS.SLOW,
          }),
          Animated.timing(this.state.positionX, {
            toValue: -5,
            duration: SHAKE_TIMINGS.FAST,
          }),
          Animated.timing(this.state.positionX, {
            toValue: 0,
            duration: SHAKE_TIMINGS.FAST,
          }),
        ]).start(() => {
          this.props.errorHandler();
          Animated.parallel([
            Animated.timing(this.state.width, {
              toValue: 100,
              duration: 500,
              delay: 500,
            }),
            Animated.timing(this.state.borderRadius, {
              toValue: 5,
              duration: 500,
              delay: 500,
            }),
            Animated.timing(this.state.loaderOpacity, {
              toValue: 0,
              duration: 300,
              delay: 500,
            }),
            Animated.timing(this.state.animatedBackgroundColor, {
              toValue: 0,
              duration: 500,
              delay: 500,
            }),
            Animated.timing(this.state.failedIconOpacity, {
              toValue: 0,
              duration: 300,
              delay: 300,
            }),
          ]).start(() => {
            this.setState({isLoading: false, paddingVertical: 15, failed: false,});
            this.state.failedIconOpacity.setValue(1);
            this.props.onAnimationFinished();
          });
        });
      });
    }

    success(){
      this.setState({success: true});
      Animated.timing(this.state.successIconOpacity, {
        toValue: 1,
        duration: 500,
      }).start();
    }
  
    dismiss(){
      this.animateOutFailed();
    }
  
    handlePress(){
      this.animateIn();
    }

    render() {

        let buttonTitle = !this.state.isLoading ? (
            <Text
              style={{
                color: '#fff',
                opacity: this.state.titleOpacity,
              }}>
              {this.props.title}
            </Text>
          ) : (
            <Animated.View
              style={{
                opacity: this.state.loaderOpacity,
              }}>
              <ActivityIndicator size={'large'} color='#fff'/>
            </Animated.View>
        );

        let color = this.props.disabled ? this.state.disabledColor : this.state.color;

        let successIcon = (
            <Animated.View style={{opacity: this.state.successIconOpacity}}>
                <FeatherIcon name='check' size={35} color='#fff' />
            </Animated.View>
        );

        let failedIcon = (
          <Animated.View style={{opacity: this.state.failedIconOpacity}}>
            <FeatherIcon name='x' size={35} color='#fff' />
          </Animated.View>
        );

        return (
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: this.props.marginVertical,
            }}>
            <Animated.View style={{
                width: this.state.width.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%'],
                }),
                backgroundColor: this.state.animatedBackgroundColor.interpolate({
                  inputRange: [0, 1],
                  outputRange: [color, this.state.failedColor],
                }),
                borderRadius: this.state.borderRadius,
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: 50,
                elevation: 1,
                transform: [{translateX: this.state.positionX}],
              }}>
              <TouchableOpacity
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: this.state.paddingVertical,
                }}
                onPress={() => this.handlePress()}
                disabled={this.state.isLoading || this.props.disabled}>
                {!this.state.success && !this.state.failed && buttonTitle}
                {this.state.success && !this.state.failed && successIcon}
                {!this.state.success && this.state.failed && failedIcon}
              </TouchableOpacity>
            </Animated.View>
          </View>
        );
    }
}
