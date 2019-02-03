import React from "react";
import {View,Text,FlatList,TouchableOpacity,Platform,PermissionsAndroid,Image,Button} from 'react-native';
import styles from "../Stylesheet/styleSheet";
import Contacts from 'react-native-contacts';
import firebase from '../firebase/firebase';


let user_pic = null;
export default class HomeScreen extends React.Component {
    state = {
        contacts:[],
        is_ProfilePicSet:false,
        profilePic: null
    };
    async requestContactsPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (error) {
            return Platform.OS === "ios" ? true : false;
        }
    }
    async componentDidMount() {
        const permission = await this.requestContactsPermission();
        if (!permission) {
            alert(permission);
            return;
        }
        let db = firebase.database();
        let localContacts = [];
        Contacts.getAll((err, contacts) => {
            if (err) throw err;
            else {
                db.ref("registeredUsers").once('value', (registeredUsers) =>  {
                    for(let i=0;i<contacts.length;i++) {
                        if(contacts[i].phoneNumbers.length!==0) {
                            const number = contacts[i].phoneNumbers[0].number.replace(/\D/g,'');
                            if (number) {
                                if (number && registeredUsers.hasChild(number)) {
                                    localContacts.push({
                                        key: number,
                                        name: contacts[i].givenName,
                                    })
                                }
                            }
                        }
                    }
                    this.setState({
                        contacts:localContacts
                    })
                });
                let imageRef = db.ref('registeredUserProfileInfo')
                let phoneNo = this.props.navigation.getParam("sender")
                let user;
                let imageURL ;
                imageRef.child(phoneNo).on('value', (registeredUserProfileInfo)=> {
                     user = registeredUserProfileInfo.val();
                     if(user){
                         if((typeof user.imageURL==='undefined' && typeof user.Gender === 'undefined')){
                             user_pic = "https://firebasestorage.googleapis.com/v0/b/chatbox-992a8.appspot.com/o/images%2FgeneralUserIcon.png?alt=media&token=5aca0ddf-29f1-48f8-aa7d-78996b5a81a3"
                         }else if(user.imageURL){
                             user_pic = user.imageURL
                             console.log("else")
                             console.log(user.imageURL)
                         }else if(user.Gender){
                                 if(user.Gender === "Male") {
                                     console.log("male inside else if");
                                     user_pic= "https://firebasestorage.googleapis.com/v0/b/chatbox-992a8.appspot.com/o/images%2FMale_User_Icon.png?alt=media&token=19a99982-2a29-4065-806c-98545201f92e";
                                 }
                                 else if( user.Gender === "Female"){
                                     user_pic = "https://firebasestorage.googleapis.com/v0/b/chatbox-992a8.appspot.com/o/images%2Ffemale_user_icon.jpeg?alt=media&token=1ac3889b-c899-494b-8d4e-8bbc9d283e12";
                                 }
                                 else if(user.Gender === "Select Gender"){
                                     user_pic = "https://firebasestorage.googleapis.com/v0/b/chatbox-992a8.appspot.com/o/images%2FgeneralUserIcon.png?alt=media&token=5aca0ddf-29f1-48f8-aa7d-78996b5a81a3"
                                 }
                             }
                         }
                    this.setState({
                        is_ProfilePicSet : true,
                        profilePic : user_pic
                    })
                }
                )
            }
        })
    }

    renderName(contact) {
        let info={
            sender:this.props.navigation.getParam("sender"),
            receiver:contact
        }
        return(
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('ChatScreen',{info:info,contactName:contact.item.name})} style={styles.separator}>
                <Text style={styles.item}> {contact.item.name} </Text>
            </TouchableOpacity>
        );
    }
    render() {
        return (
            <View>
                <View style={styles.headerContainer}>
                    <View style={styles.leftHeaderContainer}>
                        <Text style={styles.logoText}>Sollu</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfilePage',{phoneNo: this.props.navigation.getParam("sender")})}>
                                <Image style={styles.iconContainer} source={{uri:this.state.profilePic}}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    data={this.state.contacts}
                    renderItem={this.renderName.bind(this)}
                    extradata={this.state.contacts}
                    ref={ref => this.flatList = ref}
                />
            </View>
        );
    }
}

