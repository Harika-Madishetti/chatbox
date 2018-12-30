import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    row: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    message: {
        fontSize: 18,
    },
    sender: {
        fontWeight: 'bold',
        paddingRight: 10,
    },
    footer: {
        flexDirection: 'row',
        backgroundColor: '#eee',
    },
    input: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 18,
        flex: 1,
    },
    send: {
        alignSelf: 'center',
        color: 'lightseagreen',
        fontSize: 16,
        fontWeight: 'bold',
        padding: 20,
    },
    avatar: {
        borderRadius: 20,
        width: 40,
        height: 40,
        marginRight: 10,
    },
    rowText: {
        flex: 1,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        height: 24,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 50,
        flexDirection: "row",
    },
    separator: {
        justifyContent: "center",
        padding: 10,
        height: 50,
        borderBottomColor: "rgba(92,94,94,0.5)",
        borderBottomWidth: 0.25
    },
    Box:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputBox: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 18,

    },
    button:{
        backgroundColor:"red"
    }

});