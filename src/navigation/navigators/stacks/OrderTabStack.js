import { createStackNavigator } from 'react-navigation';
import { Easing, Animated } from 'react-native'
import reviewScreen from '../../../containers/cart/screens/reviewScreen'
import createOrderScreen from '../../../containers/orders/screens/createOrderScreen/'
import paymentScreen from '../../../containers/payment/screens/paymentScreen'



const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 500,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps

      const thisSceneIndex = scene.index
      const width = layout.initWidth

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0],
      })

      return { transform: [ { translateX } ] }
    },
}
}


const MainNavigator = createStackNavigator({
  review: { screen: reviewScreen },
  createorder: { screen: createOrderScreen },
  payment: { screen: paymentScreen }
}, {
  navigationOptions: ({ navigation }) => ({
    transitionConfig,
    initialRouteName: 'Order',
    tabBarVisible: false,
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#e94641',
      },
    },
  }),

  }
);

export default MainNavigator;
