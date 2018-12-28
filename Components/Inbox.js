import React, {Component} from 'react';
import { Text, FlatList , TouchableOpacity} from 'react-native';
import styles from "../Stylesheet/styleSheet";


export default class Inbox extends Component{
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
    render() {
        return(
            <FlatList
                data={this.state.ChatListContacts}
                renderItem={({ item }) =>(
                    <TouchableOpacity >
                        <Text style={styles.item}> {item.name} </Text>
                    </TouchableOpacity>
                )}
            />

        );
    }
}

