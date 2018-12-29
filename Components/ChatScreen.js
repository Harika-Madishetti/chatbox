import React from "react";
import {Platform,View,Text,TextInput,StyleSheet,KeyboardAvoidingView,FlatList,TouchableOpacity} from 'react-native';
import {Header,SafeAreaView} from 'react-navigation';

export default class ChatScreen extends React.Component {
    constructor(props){
        super(props);
        this.state={
            typing : "",
            messages: []
        }
    }
    renderItem({item}){
        return (
            <View style={styles.row}>
                <View style={styles.rowText}>
                    <Text style={styles.sender}>{item.sender}</Text>
                    <Text style={styles.message}>{item.message}</Text>
                </View>
            </View>
        );
    };
    static navigationOptions = ({ navigation }) => {
        return(
            {
                headerTitle: navigation.getParam("name"),
            }
        );
    };
    sendMessage(){
        const messages=this.state.messages;
        messages.push({"sender":"harika","message":this.state.typing});
        this.setState({
            messages:messages,
            typing:""
        });
    }

    render() {
        const keyboardVerticalOffset = Platform.OS === 'ios' ? Header.HEIGHT + 20 : 0;
        const padding = Platform.OS === 'ios' ? "padding" : '';
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.messages}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
                <KeyboardAvoidingView
                    keyboardVerticalOffset = {keyboardVerticalOffset}
                    behavior= {padding}>
                <SafeAreaView forceInset={{ bottom: 'never' }}>
                <Text>Chat Screen</Text>

                <View style={styles.footer}>

                    <TextInput placeholder="TEXT HERE"
                        value={this.state.typing}
                        onChangeText={text => this.setState({typing: text})}>
                    </TextInput>
                    <TouchableOpacity onPress={this.sendMessage.bind(this)}>
                        <Text style={styles.send}>Send</Text>
                    </TouchableOpacity>
                </View>
                </SafeAreaView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}
const styles= StyleSheet.create({
    container: {
        flex:1,
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
})