import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity,Platform} from 'react-native';
import ImagePicker from "react-native-image-picker";
import firebase from "../firebase/firebase";
import RNFetchBlob from 'react-native-fetch-blob'


const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
var options = {
    title : "Pick an Image",
    maxWidth: 800,
    maxHeight: 600,
    storageOptions: {
        path: 'sourceImages',
    },
};
export default class Profile extends Component {
    constructor(props){
        super();
        this.state = {
            image_uri: null
        }
    }
        uploadImage(uri, mime = 'image/jpeg')
        {
            return new Promise((resolve, reject) => {
                let imageURI = uri;
                let uploadBlob = null;
                const uploadUri = Platform.OS === 'ios' ? imageURI.replace('file://', '') : imageURI
                const imageRef = firebase.storage().ref('images').child('image_003')
                console.log("   jbjb :" + imageRef);
                fs.readFile(uploadUri, 'base64')
                    .then((data) => {
                        return Blob.build(data, {type: `${mime};BASE64`})
                    })
                    .then((blob) => {
                        uploadBlob = blob
                        return imageRef.put(blob, {contentType: mime})
                    })
                    .then(() => {
                        uploadBlob.close()
                        return imageRef.getDownloadURL()
                    })
                    .then((url) => {
                        resolve(url)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })

        }
        pickImageHandler()
        {
            ImagePicker.showImagePicker(options, (responce) => {
                console.log('Response = ', +responce);
                if (responce.didCancel) {
                    console.log("User cancelled!");
                } else if (responce.error) {
                    console.log("Error", responce.error);
                } else {
                    let image_uri = [];
                    this.uploadImage(responce.uri)
                        .then(url => {
                            this.setState({
                                image_uri: responce.uri
                            })
                        })
                        .catch(error => console.log(error))
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
                        <TouchableOpacity  onPress={this.pickImageHandler.bind(this)}>
                            {   this.state.image_uri === null ?
                                <Image style={styles.placeholder} source={require('../Icon/userIcon1.png')}/>:
                                <Image style={styles.placeholder} source={{uri : this.state.image_uri}}/>
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