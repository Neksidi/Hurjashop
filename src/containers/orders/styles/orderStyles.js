import { StyleSheet } from 'react-native'

export const orderStyles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    orderItemsHeaderContainer: {
      width: '100%',
      backgroundColor: '#eee',
      flexDirection: 'row',
      height: 30,
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderBottomWidth: 1,
      borderColor: '#29292950',
    },
    item: {
        elevation: 2,
        width: '100%',
        position: 'relative',
        shadowColor: '#000000',
        backgroundColor: '#FFFFFF',
        marginVertical: 2,
        paddingBottom: 5,
        borderColor: 'black',
        borderWidth: 1,
    },
    empty:{
      flex: 1,
      width: 1,
    },
    itemCol: {
      flex: 4,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      borderColor: 'black',
      borderWidth: 1,
      flexWrap: 'wrap',
    },
    priceCol: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'black',
      borderWidth: 1,
    },
    quantityCol: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'black',
      borderWidth: 1,
    },
    totalPriceCol: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'black',
      borderWidth: 1,
    },
    orderItemContainer: {
      width: '100%',
      backgroundColor: '#fff',
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: '#29292930',
      paddingVertical: 5,
      paddingHorizontal: 10,
    }
  });