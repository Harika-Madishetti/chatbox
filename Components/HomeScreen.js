import React from "react";
import {View,Text,FlatList,TouchableOpacity} from 'react-native';
import styles from "../Stylesheet/styleSheet";
import Contacts from 'react-native-contacts';
import firebase from '../firebase/firebase';


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
                db.ref("registeredUsers").once('value', (registeredUsers) =>  {

                    for(let i=0;i<contacts.length;i++) {
                        if(contacts[i].phoneNumbers.length!==0) {
                            let number = contacts[i].phoneNumbers[0].number.replace(/\D/g,'');
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
    renderName = ({item}) => {

        let info={
            sender:'8919746244',
            receiver:item
        }

        return(
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('ChatScreen',{info:info})} style={styles.separator}>
                <Text style={styles.item}> {item.name} </Text>
            </TouchableOpacity>
        );
    }
    static navigationOptions = ({ navigation }) => {
        return(
            {
                headerTitle:'Sollu',
                headerBackTitle:"Back",
                headerTintColor:'white',
                headerStyle:{
                    backgroundColor: '#cc504d',
                }
            }
        );
    };
    render() {
        return (
            <View>
                <FlatList
                    data={this.state.contacts}
                    renderItem={this.renderName}
                    extradata={this.state.contacts}
                />
            </View>
        );
    }
}

