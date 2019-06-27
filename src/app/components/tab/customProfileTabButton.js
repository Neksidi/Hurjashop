import React, {Component} from 'react';
import {TouchableOpacity, View} from "react-native";
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'
import { withNavigation } from 'react-navigation';
import { theme } from '../../styles/global'

class ProfileTabButton extends Component {
    constructor(props) {
		super(props);
    }
    
    render() {
        switch (this.props.route) {
            case "Profile": {
                return (
                    <TouchableOpacity
                        onPress={() => this.props.navigation.toggleDrawer()}
                        underlayColor="#2882D8"
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: theme.color.hurja.main,
                            flex: 1
                        }}
                    >
                        <FAIcon name="user" size={40} color="#F8F8F8"/>
                    </TouchableOpacity>
                );
            }
            case "Homeroute": {
                return (
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Home')}
                        underlayColor="#2882D8"
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: theme.color.hurja.main,
                            flex: 1
                        }}
                    >
                        <FAIcon name="home" size={40} color="#F8F8F8"/>
                    </TouchableOpacity>
                );
            }
            case "Search": {
                return (
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate(this.props.route)}
                        underlayColor="#2882D8"
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: theme.color.hurja.main,
                            flex: 1
                        }}
                    >
                        <FAIcon name="search" size={40} color="#F8F8F8"/>
                    </TouchableOpacity>
                );
            }
            default:
                return (
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate(this.props.route)}
                        underlayColor="#2882D8"
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: theme.color.hurja.main,
                            flex: 1
                        }}
                    >
                        <FAIcon name="android" size={40} color="#F8F8F8"/>
                    </TouchableOpacity>
                );
              
        }
    }
}
export default withNavigation(ProfileTabButton);