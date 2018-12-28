import React from "react";
import {View,Text,TextInput,StyleSheet} from 'react-native';

export default class ChatScreen extends React.Component {
    render() {
        return (
            <View>
                <Text>Chat Screen</Text>
                <View style={styles.footer}>
                    <TextInput placeholder="TEXT HERE">
                    </TextInput>
                </View>
            </View>
        );
    }
}
const styles= StyleSheet.create({
    footer: {
        flexDirection: 'row',
        backgroundColor: '#eee',
    },
})