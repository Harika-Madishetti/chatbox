import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity,Button } from 'react-native';
import ImagePicker from "react-native-image-picker";

export default class Profile extends Component {
    state = {
        pickedImage: null
    }
    pickImageHandler = () => {
        const options = {
            title : "Pick an Image",
            maxWidth: 800,
            maxHeight: 600,
            storageOptions: {
                path: 'sourceImages',
            },

        };


        ImagePicker.showImagePicker(options, (responce) => {
            if (responce.didCancel) {
                console.log("User cancelled!");
            } else if (responce.error) {
                console.log("Error", responce.error);
            } else {
                const source = {
                    uri: responce.uri,
                }
                this.setState({
                    pickedImage: source,
                });

            }
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.leftHeaderContainer}>
                        <Text style={styles.logoText}>{"Profile"}</Text>
                    </View>
                </View>
                <View>
                    <View style={styles.imageContainer}>
                        <TouchableOpacity  onPress={this.pickImageHandler}>
                            {  this.state.pickedImage === null ?
                                <Image style={styles.placeholder} source={require('../Icon/userIcon1.png')}/>:
                                <Image style={styles.placeholder} source={this.state.pickedImage}  />
                            }
                        </TouchableOpacity>
                    </View>
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


    imageContainer: {
        alignItems:"center"
    },
    textStyle: {
        fontWeight:"bold",
        fontSize:30,
        textAlign:"center",
        color:"red",
        marginTop:10
    },
    placeholder: {
        alignSelf:'center',
        borderColor: "black",
        backgroundColor: "#eee",
        borderRadius: 100,
        width: 200,
        height: 200,
        marginTop:50,
    },
    button: {
        width: "80%",
        marginTop:20,
        flexDirection:"row",
        justifyContent: "space-around"
    },
    previewImage: {
        alignSelf:'center',
        borderColor: "black",
        backgroundColor: "#eee",
        borderRadius: 100,
        width: 200,
        height: 200,
        marginTop:10,
    }
});