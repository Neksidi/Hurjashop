import { StyleSheet } from 'react-native';

export const reviewStyles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 0,
        padding: 20,
    },
    item: {
        height: 'auto',
        elevation: 2,
        width: '100%',
        borderRadius: 5,
        marginBottom: 10,
        paddingVertical: 1,
        paddingLeft: 8,
        position: 'relative',
        shadowColor: '#000000',
        backgroundColor: '#FFFFFF',
        flex: 1,
        flexDirection: 'column',
    },
    text: {
        textAlign: 'right',
        marginRight: 20,
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