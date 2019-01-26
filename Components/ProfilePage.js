import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default class Profile extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.leftHeaderContainer}>
                        <Text style={styles.logoText}>{"Profile"}</Text>
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileSettingsScreen')}>
                        <Image style={styles.avatar} source={require('../Icon/userIcon1.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    header:{
        backgroundColor: "#cc504e",
        height:80,
    },
    avatar: {
        borderRadius: 40,
        width: 130,
        height: 130,
        alignSelf:'center'
    },
    name:{
        fontSize:22,
        color:"#FFFFFF",
        fontWeight:'600',
    },
    body:{
        marginTop:40,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding:30,
    },
    logoText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        alignItems: "flex-start",
        marginLeft: 20,
        marginTop:30
    },
    leftHeaderContainer: {
        alignItems: "flex-start",
        flexDirection: "row"
    },
});