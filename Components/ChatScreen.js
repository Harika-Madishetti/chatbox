import React from "react";
import {Platform,View,Text,TextInput,KeyboardAvoidingView,FlatList,TouchableOpacity} from 'react-native';
import {Header,SafeAreaView} from 'react-navigation';
import styles from "../Stylesheet/styleSheet";
import firebase from "../firebase/firebase"

export default class ChatScreen extends React.Component {
    constructor(props){
        super(props);
        this.state={
            typing : "",
            messages: []
        }
    }
    componentDidMount(){
        let {navigation} = this.props;
        const info = navigation.getParam('info');
        const db = firebase.database();
        const taskRef = db.ref('registeredUsers').child(info.sender).child("chat").child(info.receiver.key);
        taskRef.on('value', (data) => {
            let chatData = data.val();
            console.log(chatData);
            let tempChat = []
            for (let chatID in chatData) {
                const message = {
                    _id: chatData[chatID]._id,
                    text: chatData[chatID].text,
                    createdAt: new Date(chatData[chatID].createdAt),
                    user: chatData[chatID].user
                };
                tempChat.push(message);
            }
            console.log(tempChat);
            this.setState({ messages: tempChat});
        });
    }
    renderItem({item}){
        console.log(item);
        return (
            <View style={styles.row}>
                <View style={styles.rowText}>
                    <Text style={styles.sender}>{item.sender}</Text>
                    <Text style={styles.message}>{item.text}</Text>
                </View>
            </View>
        );
    };
    static navigationOptions = ({ navigation }) => {
        return(
            {
                headerTitle: navigation.getParam("name"),
                headerTintColor:'white',
                headerStyle:{
                    backgroundColor: '#cc504d',
                    fontFamily:'sans-serif-light',
                }
            }
        );
    };
    sendMessage(){
        if (this.state.typing.trim()===''){
            return;
        }
        let {navigation}= this.props;
        let db = firebase.database();
        const info = navigation.getParam('info');
        let msg={
            _id:2,
            text:this.state.typing.trim(),
            createdAt:new Date().getTime(),
            user: {_id:1}
        };
        db.ref('registeredUsers').child(info.sender).child("chat").child(info.receiver.key).push(msg);
        msg._id=1;
        msg.user._id=2;
        db.ref('registeredUsers').child(info.receiver.key).child("chat").child(info.sender).push(msg);
        this.setState({typing:''});
    }
    render() {
        const keyboardVerticalOffset = Platform.OS === 'ios' ? Header.HEIGHT + 20 : 0;
        const padding = Platform.OS === 'ios' ? "padding" : '';
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.messages}
                    renderItem={this.renderItem}
                    extradata={this.state}
                    keyExtractor={(item, index) => index.toString()}
                />
                <KeyboardAvoidingView
                    keyboardVerticalOffset = {keyboardVerticalOffset}
                    behavior= {padding}>
                <SafeAreaView forceInset={{ bottom: 'never' }}>
                <View style={styles.footer}>
                    <TextInput
                        placeholder="TEXT HERE"
                        value={this.state.typing}
                        style={styles.input}
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
