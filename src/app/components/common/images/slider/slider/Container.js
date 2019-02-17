import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Image, Animated, TouchableOpacity } from 'react-native'
import Item from './item'
// Vendor components
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'
import ImagePreview from '../../preview/preview'

class Index extends Component {

  scrollX = new Animated.Value(0);

  constructor(props){
    super(props);
    this.state = {
      dotsEnabled: this.props.dotsEnabled ? this.props.dotsEnabled : true,
      arrowsEnabled: this.props.arrowsEnabled ? this.props.arrowsEnabled : true,
      previewEnabled: this.props.previewEnabled ? this.props.previewEnabled : false,
    }
  }

  _renderDots(){
    return this.props.data.map((_, i) => {
      let opacity = position.interpolate({
        inputRange: [i - 1, i, i + 1],
        outputRange: [0.3, 1, 0.3],
        extrapolate: 'clamp'
      });
      return (
        <Animated.View key={i} style={styles.dot}>
        </Animated.View>
      );
    });
  }
  _scrollToItem(item){
    this._scrollView.scrollTo({x: this.props.imageWidth * item});
  }

  render(){
    let position = Animated.divide(this.scrollX, this.props.imageWidth);
    let content = this.props.data.map((item, i) => {
      return (
        <Item data={item} key={i} imageWidth={this.props.imageWidth} imageHeight={this.props.imageHeight}/>
      );
    });

    let dots, arrows = null;
    if(this.state.dotsEnabled){
      dots = (
        <View style={styles.dotContainer}>
          <View style={{flexDirection: 'row'}}>
            {this.props.data.map((_, i) => {
              let opacity = position.interpolate({
                inputRange: [i - 1, i, i + 1],
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp'
              });
              return (
                <TouchableOpacity key={i} onPress={() => {console.log(i); this._scrollToItem(i)}}>
                  <Animated.View style={{height: 10, width: 10, borderRadius: 5, backgroundColor: '#595959', opacity, margin: 8,}} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      );
    }
    if(this.props.previewEnabled){
      return(
        <View style={styles.container}>
          <ImagePreview openWithIcon={true} renderItems={this.props.data}>
              <ScrollView horizontal ref={(c) => {this._scrollView = c;}} pagingEnabled={true} showsHorizontalScrollIndicator={false} scrollEventThrottle={16} onScroll={Animated.event([{nativeEvent: { contentOffset: { x: this.scrollX } }}])}>
                {content}
              </ScrollView>
              {dots}
          </ImagePreview>
        </View>
        );
    }else {
      return(
        <View style={styles.container}>
          <ScrollView horizontal ref={(c) => {this._scrollView = c;}} pagingEnabled={true} showsHorizontalScrollIndicator={false} scrollEventThrottle={16} onScroll={Animated.event([{nativeEvent: { contentOffset: { x: this.scrollX } }}])}>
            {content}
          </ScrollView>
          {dots}
        </View>);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotContainer: {
    flex:1,
    position: 'absolute',
    bottom: 0,
  },
  arrowContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#f00',
    position: 'absolute',
  }
});

export default Index
