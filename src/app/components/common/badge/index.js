import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class Badge extends PureComponent {
  render() {
    return (
      <View style={{zIndex: 4, elevation: 99, width: 16, height: 16, borderWidth: 1, backgroundColor: '#fff', borderRadius: 8, position: 'absolute', top: -40, right: 10, justifyContent: 'center', alignItems: 'center'}}>
        <Text>{this.props.count}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
