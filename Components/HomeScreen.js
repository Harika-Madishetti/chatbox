import React from "react";
import styles from "../Stylesheet/styleSheet";
import {View,Text,FlatList,TouchableOpacity,StyleSheet,TextInput} from 'react-native';
import Header from "./Header";


export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            ChatListContacts:[
                {name: 'Ranga'},
                {name: 'Harika'},
                {name: 'Hema'},
                {name: 'Manoj'},
                {name: 'Harish'},
                {name: 'Katta'},
            ]
        };
    }
    renderName = ({item}) => {
        return(
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Details')} style={styles.separator}>
                <Text style={styles.item}> {item.name} </Text>
            </TouchableOpacity>
        );
    }

    static navigationOptions = {
      headerTitle: <Header/>
    };
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                {/*<Text>Home Screen</Text>*/}
                <FlatList
                    data={this.state.ChatListContacts}
                    renderItem={this.renderName}
                />


            </View>
        );
    }
}

