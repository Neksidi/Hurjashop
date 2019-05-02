import React, { PureComponent } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { theme } from '../../../styles/global'
import PropTypes from 'prop-types';

class Loader extends PureComponent {

  constructor(props) {
    super(props);
  }

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
export { Loader }