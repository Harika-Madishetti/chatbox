import React from "react";
import {View,Text,FlatList,TouchableOpacity} from 'react-native';
import styles from "../Stylesheet/styleSheet";
import Contacts from 'react-native-contacts';
import firebase from '../firebase/firebase';
import Header from "./Header";


export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            contacts:[]
        };
    }
    componentDidMount() {
        let db = firebase.database();
        let temContacts = [];
        Contacts.getAll((err, contacts) => {
            if (err) throw err;
            else {
                console.log(contacts);
                db.ref("registeredUsers").once('value', (registeredUsers) =>  {
                    for(let i=0;i<contacts.length;i++) {
                        if(contacts[i].phoneNumbers.length!==0) {
                            let number = contacts[i].phoneNumbers[0].number.replace(/\D/g,'');
                            console.log(number);
                            if (number) {
                                if (!(number.includes("*")) && registeredUsers.hasChild(number)) {
                                    temContacts.push({
                                        key: number,
                                        name: contacts[i].givenName
                                    })
                                }
                            }
                        }
                    }

                    this.setState({
                        contacts:temContacts
                    })
                });

            }
        })
    }
    renderName(temp) {
        console.log("inside render");
        let info={
            sender:this.props.navigation.getParam("sender"),
            receiver:temp
        }
        return(
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('ChatScreen',{info:info, })} style={styles.separator}>
                <Text style={styles.item}> {temp.item.name} </Text>
            </TouchableOpacity>
        );
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                <Header title={'Sollu'}/>
            <View>
                <FlatList
                    data={this.state.contacts}
                    renderItem={this.renderName.bind(this)}
                    extradata={this.state.contacts}
                    ref={ref => this.flatList = ref}
                    onContentSizeChange={() => this.flatList.scrollToEnd({animated: true})}
                    onLayout={() => this.flatList.scrollToEnd({animated: true})}
                />
            </View>
            </View>
        );
    }
}

