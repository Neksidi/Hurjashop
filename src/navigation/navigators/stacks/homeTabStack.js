import {createStackNavigator, createAppContainer} from 'react-navigation';
import { View, Text, Easing, Animated, ScrollView } from 'react-native'
import HomeScreen from '../../../containers/home/screens/homeScreen'
import CategoryScreen from '../../../containers/category/screens/categoryScreen'
import ProductScreen from '../../../containers/product/screens/productScreen'
import AllProductsScreen from '../../../containers/product/screens/allProductsScreen'
import CartScreen from '../../../containers/cart/screens/cartScreen'
import ShippingScreen from '../../../containers/cart/screens/shippingScreen'
import MethodsScreen from  '../../../containers/payment/screens/methodsScreen'
import OrderCreationScreen from '../../../containers/orders/screens/createOrderScreen'
import OrderReviewScreen from  '../../../containers/cart/screens/reviewScreen'
//import CustomHeader from '../../../app/components/header/customHeader'


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
  Home: {screen: HomeScreen},
  Category: {screen: CategoryScreen},
  Product: {screen: ProductScreen},
  AllProducts: {screen: AllProductsScreen},
  Cart: {screen: CartScreen},
  Shipping: {screen: ShippingScreen},
  Methods: {screen: MethodsScreen},
  OrderCreation: {screen: OrderCreationScreen},
  OrderReview: {screen: OrderReviewScreen}

}, {
    navigationOptions: ({ navigation }) => ({
      transitionConfig,
      initialRouteName: 'Home',
      tabBarVisible: true,
    }),
    defaultNavigationOptions: {
      //headerTitle: <CustomHeader/>,
      headerStyle: {
        backgroundColor: '#00ff00',
      }
    },
  }
);

export default MainNavigator;