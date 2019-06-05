import { StyleSheet } from 'react-native';

export const reviewStyles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 0,
        padding: 10,
    },
    list: {

    },
    item: {
        height: 'auto',
        elevation: 2,
        width: '100%',
        borderRadius: 5,
        marginBottom: 10,
        position: 'relative',
        shadowColor: '#000000',
        backgroundColor: '#FFFFFF',
        flex: 1,
        textAlign: 'right',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        borderWidth: 2,
        borderRadius:2,
    },
    header: {
        fontSize:20,
        backgroundColor: '#b5d8f6',
        fontWeight: 'bold',
    },
    flatlist: {

    },
    empty:{
        flex:1,
    },
    text: {
        textAlign: 'right',
        marginRight: 20,
        fontWeight: 'bold',
    },
    row1: {

    },
    row2: {
        backgroundColor: '#eae7e4',
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
    reviewItem: {
        height: 75,
        elevation: 0,
        width: '100%',
        borderRadius: 0,
        marginBottom: 10,
        paddingVertical: 1,
        paddingLeft: 8,
        position: 'relative',
        shadowColor: '#000000',
        backgroundColor: 'transparent',
        flex: 1,
        flexDirection: 'row',
    },
    reviewImage: {
      width: 70,
      height: 70,
      paddingHorizontal: 20,
      alignSelf: 'flex-start',
      alignSelf:'flex-start',
    },
    reviewItemName: {
      fontSize: 18,
      marginHorizontal: 2,
    },  
});