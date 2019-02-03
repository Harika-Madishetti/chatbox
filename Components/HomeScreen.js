import React from "react";
import {View,Text,FlatList,TouchableOpacity,Platform,PermissionsAndroid,Image,Button} from 'react-native';
import styles from "../Stylesheet/styleSheet";
import Contacts from 'react-native-contacts';
import firebase from '../firebase/firebase';
import { Avatar } from 'react-native-elements'
import { ListItem } from 'react-native-elements'


let user_pic = null;
export default class HomeScreen extends React.Component {
    state = {
        contacts:[],
        contactsProfilePics:[],
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
        let localContactsProfilePics=[];
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
                let imageRef = db.ref('registeredUserProfileInfo');
                let phoneNo = this.props.navigation.getParam("sender");
                let user;
                let imageURL ;
                imageRef.child(phoneNo).on('value', (registeredUserProfileInfo)=> {
                     user = registeredUserProfileInfo.val();
                     if(user){
                         if((typeof user.imageURL==='undefined' && typeof user.Gender === 'undefined')){
                             user_pic = "https://firebasestorage.googleapis.com/v0/b/chatbox-992a8.appspot.com/o/images%2FgeneralUserIcon.png?alt=media&token=5aca0ddf-29f1-48f8-aa7d-78996b5a81a3"
                         }else if(user.imageURL){
                             user_pic = user.imageURL
                         }else if(user.Gender){
                                 if(user.Gender === "Male") {
                                     user_pic= "https://firebasestorage.googleapis.com/v0/b/chatbox-992a8.appspot.com/o/images%2FMale-profile-icon-red.png?alt=media&token=3e48646e-25ae-43a4-8e2e-f7e2255e18cf";
                                 }
                                 else if( user.Gender === "Female"){
                                     user_pic = "https://firebasestorage.googleapis.com/v0/b/chatbox-992a8.appspot.com/o/images%2FFemale-profile-icon-.png?alt=media&token=c553bc7c-4bc7-48b9-9026-a50591356bfd";
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
                })
                db.ref('registeredUserProfileInfo').once('value',(registeredUserProfileInfo)=>{
                    for(let i=0;i<localContacts.length;i++) {
                        const number = localContacts[i].key;
                        if (registeredUserProfileInfo.hasChild(number)) {
                            if (number === registeredUserProfileInfo.child(number).key) {
                                localContactsProfilePics.push({
                                    key: number,
                                    url: registeredUserProfileInfo.child(number).val().imageURL
                                })
                            }
                        }
                    }
                }
                );
                this.setState({
                    contactsProfilePics : localContactsProfilePics
                })
                console.log(this.state.contactsProfilePics)
            }
        })
    }
    renderName = (contact) => {
        let info = {
            sender: this.props.navigation.getParam("sender"),
            receiver: contact
        }
        let contactImageUrl = '';
        this.state.contactsProfilePics.forEach(number=>{
            if (number.key === contact.item.key) {
                contactImageUrl = number.url;
            }
        });
        return(
            <View >
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('ChatScreen',{info:info,contactName:contact.item.name,profilePicUrl:contactImageUrl})} style={styles.contactStyle}>
                    <ListItem style={styles.listview} roundAvatar={true} leftAvatar={ {source: { uri: contactImageUrl }}}/>
                    <Text style={styles.homecontact}> {contact.item.name} </Text>
            </TouchableOpacity>
            </View>
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

