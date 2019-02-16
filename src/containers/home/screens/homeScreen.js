import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { bindActionCreators } from 'redux';
import { addProduct } from '../redux/homeActions'

class Home extends Component {
	constructor(props) {
		super(props);
	}

	static navigationOptions = {
		headerStyle: {
      	backgroundColor: '#fcf',
    },
    headerTitle: "Koti",
    headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
		color="green"
      />
    ),
  };

	componentWillMount() {
	}

	componentWillUnmount() {
	}

	componentDidMount() {
	}

	render() {
		return (
			<View>
        		<Text>Welcome Home!</Text>
				{
          			this.props.home.possible.map((item, index) => {
						const button = <Button
              				key={ item }
              				title={  item  }
              				onPress={() =>
												this.props.addProduct("Uusi " + item)
              				}
            			/>
						return button;
					})
				}
				{
					this.props.home.current.map((item, index) => {
						return <Text key={ item }>
							{item} { index }
						</Text>
					})
				}
				<Button 
					title="Avaa Drawer"
					onPress={() =>
						this.props.navigation.toggleDrawer()
					}
				/>
				<Button 
					title="Kaikki tuotteet"
					onPress={() =>
						this.props.navigation.navigate('AllProducts')
					}
				/>
				<Button 
					title="Tutoriaaliin"
					onPress={() =>
						this.props.navigation.navigate('Tutorial')
					}
				/>
				<Button 
					title="Kategoriaan"
					onPress={() =>
						this.props.navigation.navigate('Category')
					}
				/>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	const { home } = state
	return { home }
};

const mapDispatchToProps = dispatch => (
	bindActionCreators({ addProduct }, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Home);
