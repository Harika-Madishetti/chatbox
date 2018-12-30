import React, {Component} from 'react';
import {View,TextInput,Button} from 'react-native';
import styles from "../Stylesheet/styleSheet";
import Header from "./Header";

class LoginScreen extends React.Component{
    static navigationOptions = ({ navigation }) => {
        return(
            {
                headerTitle: 'P2PApp',
                headerBackTitle:"Back"
            }
        );
    };
    render(){
        return(
            <View style={styles.Box}>
                <View>
                <TextInput
                    style={styles.inputBox}
                    placeholder="Enter your number"
                    keyboardType='numeric'
                    maxLength={10}
                      >
                </TextInput>
                </View>
                <View>
                <Button  style={styles.button}
                         title="Next"
                         onPress={()=> this.props.navigation.navigate('Home')}>
                </Button>
                </View>
            </View>
        );
    }
}
export default LoginScreen;