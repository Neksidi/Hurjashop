import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { bindActionCreators } from 'redux';
import { addProduct } from '../../redux/shopactions'

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//TODO: change to true when loading function is working
			isLoading: false,
			data: null,
			categories: null
		};
	}

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
          			this.props.products.possible.map((product, index) => {
						const button = <Button
              				key={ product }
              				title={  product  }
              				onPress={() =>
								this.props.addProduct(index)
              				}
            			/>
						return button;
						})
				}
				<Text>{
					this.props.products.current.map((product, index) => {
						return <Text>
							{product} { index }
						</Text>
					})
				}</Text>
			</View>
		);
	}
}

const mapDispatchToProps = dispatch => (
	bindActionCreators({
	  addProduct,
	}, dispatch)
  );

const mapStateToProps = (state) => {
	const { products } = state
	return { products }
  };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
