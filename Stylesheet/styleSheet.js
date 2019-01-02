import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    mainContainer1: {
        flex: 1,
        backgroundColor: '#cc504e',
        height: 1,
    },
    headerContainer: {
        height: 80,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#cc504e",
        alignItems:"center",
        paddingRight: 10
    },
    leftHeaderContainer: {
        alignItems: "flex-start",
        flexDirection: "row"
    },
    // contentContainer: {
    //     flex: 1,
    //     flexDirection: "row",
    // },
    logoText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
        alignItems: "flex-start",
        marginLeft: 20,
        marginTop:30
    },

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    row: {
        padding: 20,
        // alignItems: "flex-start",
        // borderBottomColor: "rgba(92,94,94,0.5)",
        // borderBottomWidth: 0.25,
        marginRight: 60,
        justifyContent:'space-between'
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
        alignItems: "flex-end",
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
        justifyContent:'space-between',
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
    },


    senderCallerDetailsContainerWrap: {
        flex: 1,
        // alignItems: "center",
        flexDirection: "row-reverse",
        // justifyContent : "space-between"
    },
    senderTextStyle:{
        marginLeft: 60,
        justifyContent : "space-between"

    },
    receiverCallerDetailsContainerWrap: {
        flex: 1,
        // alignItems: "center",
        flexDirection: "row",
    },
    iconContainer : {
        borderRadius: 30,
        width: 40,
        height: 40
    },

    receiverTextStyle:{
        marginRight: 100
    },
    contactSeparator: {
        flex: 1,
        alignItems: "flex-start",
        borderBottomColor: "rgba(92,94,94,0.5)",
        borderBottomWidth: 0.5,
        marginRight: 60
    },
});