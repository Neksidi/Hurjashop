import { StyleSheet, } from 'react-native'
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
  }
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
    paddingBottom: 5,
  },
  front_slider_title: {
    fontFamily: 'BarlowCondensed-Light',
    fontSize: 26,
    alignSelf: 'center',
  },
  medium_title: {
    fontFamily: 'BarlowCondensed-Medium',
    fontSize: 25,
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
  }
});
