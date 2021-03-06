import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen');

export const theme = {
  underline: {
    light: {
      borderBottomWidth: 1,
      borderBottomColor: '#cacaca'
    }
  },
  color: {
    bg: {
      main: '#f5f5f5'
    },
    font: {
      main: '#342e37',
      secondary: '#848484'
    },
    highlight: {
      main: '#ff5722',
      secondary: '#3c91e6'
    },
    alert: {
      danger: '#e71d36'
    },
    navigation: {
      main: '#FFFFFF',
      background: '#e94641',
    },
    drawer: {
      background: '#f5f5f5',
    },
    hurja: {
      main: '#e94641',
      dark: '#e73832',
    },
    status: {
      processing: '#49ca2d',
      pending: '#ffc24a',
      failed: '#e84b48',
    }
  },
  navigation: {
    height: 50,
  },

  imageView: {
  
      width: '50%',
      height: 100 ,
      margin: 7,
      borderRadius : 7
  
  },
  
  textView: {
      width:'50%', 
      textAlignVertical:'center',
      padding:10,
      color: '#000'
  
  },

  
  inputScreenContainer : {
    marginTop: 0,
    paddingVertical:5,
    paddingHorizontal: 5

  },



  inputContainer: {
    flex:1,
    textAlign: 'center',
    marginBottom:5,
    flexDirection: 'row',
    alignItems:'center',
    marginVertical: 5,
    backgroundColor: '#e94641',
    borderRadius: 4,
 
    padding:5,

  },

    label : {
      
      fontWeight: 'bold',
      color: '#FFF',
      paddingHorizontal:10,
      flex:1,
      
    },
    inputs:{
      borderRadius: 3,
      backgroundColor: '#f5f5f5',
      flex:2,
      paddingHorizontal:10,
    },

    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      marginTop: 5,
      borderRadius: 4,
      paddingHorizontal: 25,
      paddingVertical: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
  },

  continueButton: {
    fontSize: 18,
    textAlign: 'center',
    margin: 5,
    color: '#FFFFFF',
    backgroundColor: 'transparent',
  },

  continueButtonDisabled: {
    fontSize: 18,
    textAlign: 'center',
    margin: 5,
    color: '#000000',
    backgroundColor: 'transparent',
  },
};

export const btn = {

  default: {
    elevation: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  default_txt: {
    color: theme.color.font.main
  },

  primary: {
    elevation: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: theme.color.highlight.main,
  },

  primary_txt: {
    color: '#fff'
  },

  success: {
    elevation: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#49ca2d',
  },

  success_txt: {
    color: '#fff'
  },

  warning: {
    elevation: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#ffc24a',
  },

  warning_txt: {
    color: '#fff'
  },

  danger: {
    elevation: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#e84b48',
  },

  danger_txt: {
    color: '#fff'
  },

  disabled: {
    elevation: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
  },
  disabled_text: {
    color: '#fff'
  },

  login: {
    elevation: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#125194',
  },

  login_text: {
    color: '#fff'
  },

  facebook: {
    elevation: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#3b5998',
  },

  facebook_text: {
    color: '#fff'
  },

};
export const app_style = StyleSheet.create({
  header_title: {
    fontSize: 28,
    marginTop: 16,
    paddingTop: 3,
    lineHeight: 30,
    color: '#212121',
    fontFamily: 'BarlowCondensed-Medium'
  },
  drawer_title: {
    fontFamily: 'BarlowCondensed-Medium',
    fontSize: 23,
    color: '#fff',
    marginLeft: 10
  },
  drawer_contact: {
    fontFamily: 'BarlowCondensed-Medium',
    fontSize: 20,
    color: '#fff',
    marginLeft: 10
  },
  drawer_item: {
    fontFamily: 'BarlowCondensed-Regular',
    fontSize: 18,
  },
  front_item_title: {
    fontFamily: 'BarlowCondensed-Medium',
    fontSize: 28,
    alignSelf: 'center',
    color: '#fff',
    fontWeight:'bold',
  },
  front_slider_title: {
    fontFamily: 'BarlowCondensed-Light',
    fontSize: 26,
    alignSelf: 'center',
  },

  large_title: {
    fontFamily: 'BarlowCondensed-Medium',
    fontSize: 28,
    color: '#fff',
    fontWeight:'bold',
  },

  medium_title: {
    fontFamily: 'BarlowCondensed-Medium',
    fontSize: 25,
    color: '#fff',
  },
  product_list_item_title: {
    fontFamily: 'BarlowCondensed-Medium',
    fontSize: 20,

  },
  product_list_item_price: {
    fontFamily: 'BarlowCondensed-Regular',
    fontSize: 20,
  },
  product_list_item_regular_price: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    fontSize: 20,
    fontFamily: 'BarlowCondensed-Regular',
  },

  body: {
    flex: 1,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  containerRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  productTitle: {
    fontSize: 20,
  },
  productImage: {
    height: 200,
    width: 300,
  },
  price: {
    fontSize: 20,
  },
  quantityButton: {
    marginHorizontal: 10,
    fontSize: 20,
  },
  countText: {
    fontSize: 40,
  },
  separatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    maxWidth: 400
  },
  separatorLine: {
    flex: 2,
    borderBottomWidth: 1,
    borderColor: '#8a8a8a',
    alignItems: 'center',
  
  },
  productDescription: {
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30,
  },

  logo: {
    width: 75,
    height: 75
  },
  
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 5
  },

  footer: {
    backgroundColor: '#e94641',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 15
  }
});

export const carousel = {
  layout: {
    width: width,
    height: 300,
    item: {
      width: (width / 2) - 15,
      height: 300,
    }
  }
}

export const grid = {
    container: {
      flex: 1,
      marginVertical: 20,
    },
    item: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      margin: 5,
    },
    itemInvisible: {
      backgroundColor: 'transparent',
    },
    itemText: {
      color: '#fff',
      fontSize:20,
      fontWeight:'bold',
    },
}

export const carousel_styles = StyleSheet.create({
  carouselItem: {
    height: carousel.layout.item.height,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  }
});

export const product_item_list = {
  color: {
    background: '#fff',
    grid: {
      main: '#bbb',
      selected: '#777',
    }
  },
  layout: {
    grid: {
      height: 270,
    },
    list: {
      height: 200,
    },
    detailPadding: 10,
  },
  btn_size: 25,
}

export const styles = StyleSheet.create({


  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 78,
    height: 75,
    position: 'absolute',
    zIndex: 4,
    alignSelf: 'center',
    top: -40,
    //elevation: 99,
  },
  logoSmall: {
    width: 50,
    height: 48,
    position: 'absolute',
    zIndex: 4,
    alignSelf: 'center',
    //elevation: 99,
  },
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical:10,
    paddingHorizontal: 5
  },
  footer: {
    backgroundColor: '#e94641',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 15
  },
  icon: {
    marginLeft:20

  },
  headerContainer: {
    paddingRight: 20
  },

  linearGradient: {
    flex: 1,
  },
  orderText:{
    fontFamily: "BarlowCondensed-Regular",
    fontSize: 30,
    fontWeight: "bold",
    color: "white"
  }
  
});

export const primaryGradientColors = ['#a6c0fe', '#f68084'];
export const primaryGradientColorsButton = ['#4c669f', '#3b5998', '#192f6a'];
export const modalColors = ['#FFFFFF', '#d8e4ff'];

export const boxHeight =  Dimensions.get('window').width / 2
export const boxWidth = Dimensions.get('window').width / 2 - grid.item.margin * 2
export const textBoxHeight = boxHeight / 3;