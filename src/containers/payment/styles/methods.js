import { StyleSheet } from 'react-native';

export const methodsStyles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 0,
        padding: 10,
    },
    postBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    postcodeInput: {
        width: 50,
        backgroundColor: 'white'
    },
    textInput: {
        width: '100%',
        height: 40,
        borderRadius: 3,
        borderWidth: 1,
    },
    inputContainer: {
        marginVertical: 10,
    },
    label: {
        marginBottom: 5,
    },
    checkBoxContainer: {
        justifyContent: 'center',
    },
    checkbox: {
        color: '#00ff00',
        width: 150,
    },
    cardButton: {
        height: 50,
        width: '100%',
        elevation: 2,
        borderRadius: 5,
        marginBottom: 10,
        paddingVertical: 1,
        paddingLeft: 8,
        position: 'relative',
        shadowColor: '#000000',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'skyblue'
    },
  });