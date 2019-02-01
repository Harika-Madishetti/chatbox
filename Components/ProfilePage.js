import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity,Platform} from 'react-native';
import ImagePicker from "react-native-image-picker";
import firebase from "../firebase/firebase";
import RNFetchBlob from 'react-native-fetch-blob';
import { Picker } from 'react-native-picker-dropdown'

let user_pic=null;
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
var options = {
    title : "Profile Photo  ",
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
            image_uri: null,
            is_image : 'false',
            gender : 'select gender'
        }
        this.onValueChange = this.onValueChange.bind(this)
    };
    componentDidMount() {
        let db = firebase.database();
        let profileimageRef = db.ref('registeredUserProfileInfo')
        let phoneNo = this.props.navigation.getParam("phoneNo")
        let user;
        profileimageRef.child(phoneNo).on('value', (snapshot) => {
            user = snapshot.val();
            if(user.imageURL) {
                user_pic=user.imageURL
            }
            console.log(user_pic);
            this.setState({
                is_image : true,
                image_uri: user_pic});
        })
    }
        uploadImage(uri, mime = 'image/jpeg')
        {
            return new Promise((resolve, reject) => {
                let imageURI = uri;
                let uploadBlob = null;
                const uploadUri = Platform.OS === 'ios' ? imageURI.replace('file://', '') : imageURI
                const imageRef = firebase.storage().ref('images').child('image__005');
                imageRef.getDownloadURL().then((url) => {
                    let db = firebase.database();
                    let profileimageRef = db.ref('registeredUserProfileInfo')
                    let phoneNo = this.props.navigation.getParam("phoneNo")
                    let profile = {
                        'imageURL': url,
                    }
                    profileimageRef.child(phoneNo).set(profile);
                });
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
                    .then((url) => {
                        resolve(url)
                    })
                    .catch((error) => {
                        reject(error)
                    })
                    })

        }

        pickImageHandler(){
            ImagePicker.showImagePicker(options, (responce) => {
                console.log('Response = ', +responce);
                if (responce.didCancel) {
                    console.log("User cancelled!");
                } else if (responce.error) {
                    console.log("Error", responce.error);
                } else {
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
    onValueChange(gender) {
        this.setState({
            gender
        })
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
                            {   this.state.is_image === false ?
                                <Image style={styles.placeholder} source={require('../Icon/userIcon1.png')}/>:
                                <Image style={styles.placeholder} source={{uri : this.state.image_uri}}/>
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={styles.dropdowncontainer}>
                        <Picker
                            selectedValue={this.state.gender}
                            onValueChange={this.onValueChange}
                            style={styles.picker}
                            textStyle={styles.pickerText}
                            cancel>
                            <Picker.Item label="Select Gender  " value="" />
                            <Picker.Item label="Male" value="Male" />
                            <Picker.Item label="Female" value="Female" />
                        </Picker>
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
    },

    dropdowncontainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    picker: {
        alignSelf: 'stretch',
        backgroundColor: "#cc504e",
        margin: 20,
        borderRadius: 10,
    },
    pickerText: {
        color: 'white',
    }
});