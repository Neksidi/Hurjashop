
import React, { PureComponent } from 'react'
import { View, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types';
import { theme } from '../../../../app/styles/global'

export default class Loader extends PureComponent {

  static propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  };

  static defaultProps = {
    color: theme.color.hurja.main,
    size: 'large',
  };

  render() {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={this.props.size} color={this.props.color}/>
      </View>
    );
  }
}
