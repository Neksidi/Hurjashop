import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { bindActionCreators } from 'redux';
import { buyAnimal, sellAnimal } from '../redux/tutorialActions'

class Home extends Component {
	constructor(props) {
		super(props);
	}

	updateValue = (value) => {
		if(this.updateValue == null || this.updateValue == undefined){
			return "Moi";
		}
		console.log("New text")
		console.log(value)
		return value;
	}

	componentWillMount() {
	}

	componentWillUnmount() {
	}

	componentDidMount() {
	}

	render() {
		return (
			/**
			 * 
			 * 
			 * 
			 * THIS WHOLE TUTORIAL FOLDER IS FOR REDUX EDUCATION PURPOSES.
			 * YOU CAN REFACTOR THIS TO ANYTHING YOU WANT
			 * 
			 * 
			 */
			<View>
                <Text>Welcome to Henq's redux tutorial!</Text>
				{
          			this.props.animals.all.map((animal, index) => {
						const button = <Button
              				key={ index }
              				title={  animal  }
              				onPress={() =>
								this.props.buyAnimal(index)
              				}
            			/>
						return button;
						})
				}
				<Text>Sinulla on seuraavat eläimet: </Text>
				<View>
				{
					this.props.animals.bought.map((animal, index) => {
						const row = 
							<View key={index} style={{flexDirection: "row", justifyContent: "space-around"}}>
								<Text>
									{animal.name}: {animal.count} kpl  
								</Text>
								<Button 
								title="Myy"
								onPress={() =>
									this.props.sellAnimal(index)
              					}/>
							</View>
						return row;
					})
				}
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	const { animals } = state
	return { animals }
};

const mapDispatchToProps = dispatch => (
	bindActionCreators({ buyAnimal, sellAnimal }, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Home);
