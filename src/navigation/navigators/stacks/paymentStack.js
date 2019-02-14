import {createStackNavigator, createAppContainer} from 'react-navigation';
import { View, Text, Easing, Animated, ScrollView } from 'react-native'
import PaymentScreen from '../../../containers/payment/screens/paymentScreen'
import TutorialScreen from '../../../containers/tutorial/screens'


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
  Payment: {screen: PaymentScreen},
  Tutorial: {screen: TutorialScreen}
}, {
    transitionConfig,
    initialRouteName: 'Payment',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#e94641',
      },
    },
  }
);

export default MainNavigator;