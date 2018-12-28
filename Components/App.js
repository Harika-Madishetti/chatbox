import React, {Component} from 'react';
import {View,Text,FlatList,TouchableOpacity,} from 'react-native';
import styles from "../Stylesheet/styleSheet";
import AppContainer from "./Navigator"

export default class App extends Component {
    render() {
        return (
            <View style={styles.mainContainer}>
                <AppContainer/>
                </View>
        );
    }
}
