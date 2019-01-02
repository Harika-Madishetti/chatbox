import React from "react";
import {Platform,View,Text,TextInput,KeyboardAvoidingView,FlatList,TouchableOpacity,Image} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import styles from "../Stylesheet/styleSheet";
import firebase from "../firebase/firebase";
import Header from "./Header";

export default class ChatScreen extends React.Component {
    constructor(props){
        super(props);
        this.state={
            typing : "",
            messages: []
        }
    }
    componentDidMount(){
        const db = firebase.database();
        let {navigation} = this.props;
        const info = navigation.getParam('info');
        const taskRef = db.ref('registeredUsers').child(info.sender).child("chat").child(info.receiver.item.key);
        taskRef.on('value', (data) => {
            let chatData = data.val();
            console.log(chatData);
            let tempChat = []
            for (let chatID in chatData) {
                const message = {
                    _id: chatData[chatID]._id,
                    text: chatData[chatID].text,
                    createdAt: new Date(chatData[chatID].createdAt),
                };
                tempChat.push(message);
            }
            console.log(tempChat);
            this.setState({ messages: tempChat});
        });
    }
    static navigationOptions = ({ navigation }) => {
        return(
            {
                headerTitle: navigation.getParam("name"),
                headerBackTitle: "Back",
                headerTintColor: "white",
                headerStyle: {
                    backgroundColor: '#cc504e'
                },
            }
        );
    };
    renderItem({item}){
        let msgstyle;
        let msgtextstyle;
        if(item._id === 1) {
            msgstyle = styles.senderCallerDetailsContainerWrap;
            msgtextstyle = styles.senderTextStyle;
        }else {
            msgstyle =styles.receiverCallerDetailsContainerWrap;
            msgtextstyle = styles.receiverTextStyle;
        }
        return (
                <View style={[msgstyle,styles.row]}>
                    <Image style={styles.iconContainer} source={require('../Icon/userIcon.png')} />
                    <Text style={[msgtextstyle,styles.contactContainer]}>{item.text}</Text>
                    </View>
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
        };
        db.ref('registeredUsers').child(info.sender).child("chat").child(info.receiver.item.key).push(msg);
        msg._id=1;
        db.ref('registeredUsers').child(info.receiver.item.key).child("chat").child(info.sender).push(msg);
        this.setState({typing:''});
    }
    render() {
        const keyboardVerticalOffset = Platform.OS === 'ios' ? Header.HEIGHT + 20 : 0;
        const padding = Platform.OS === 'ios' ? "padding" : '';
        let {navigation} = this.props;
        const info=navigation.getParam("info");
        const title=info.receiver.item.name
        return (
            <View style={styles.mainContainer}>
                  <Header title={title}/>
            <View style={styles.container}>
                <FlatList
                    data={this.state.messages}
                    renderItem={this.renderItem}
                    extradata={this.state}
                    keyExtractor={(item, index) => index.toString()}
                    ref={ref => this.flatList = ref}
                    onContentSizeChange={() => this.flatList.scrollToEnd({animated: true})}
                    onLayout={() => this.flatList.scrollToEnd({animated: true})}
                />
                <KeyboardAvoidingView
                    keyboardVerticalOffset = {keyboardVerticalOffset}
                    behavior= {padding}
                >
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
            </View>
        );
    }
}
