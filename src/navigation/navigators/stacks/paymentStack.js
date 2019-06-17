import {createStackNavigator} from 'react-navigation';
import { Easing, Animated } from 'react-native'
import PaymentScreen from '../../../containers/payment/screens/paymentScreen'

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
}, 
{
  navigationOptions: ({ navigation }) => ({
    transitionConfig,
    initialRouteName: 'Payment',
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