import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      padding: 20,
    },
    logoContainer: {
      paddingBottom: 30,
    },
    logo: {
      width: 100,
      height: 100,
    },
    formContainer: {
      alignItems: 'flex-start',
      width: '100%',
    },
    formTitle: {
      fontFamily: 'BarlowCondensed-Regular',
      fontSize: 35,
      color: '#fff',
      alignSelf: 'center',
      marginBottom: 10,
    },
    inputContainer: {
      width: '100%',
      marginBottom: 10,
      maxWidth: 400,
    },
    inputTitle: {
      color: '#fff',
    },
    textInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: '#fff',
    },
    textInput: {
      color: '#fff',
      flex: 1,
    },
    visibilityButton: {
      marginRight: 10,
      padding: 5,
    },
    submitButtonContainer: {
      width: '100%',
      marginTop: 20,
      maxWidth: 400,
    },
    customBackButton: {
      position: 'absolute',
      top: 10,
      left: 10,
    }
});