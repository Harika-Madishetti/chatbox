import React, {Component} from 'react';
import {View,TextInput,Button} from 'react-native';
import styles from "../Stylesheet/styleSheet";
import Header from "./Header";

class LoginScreen extends React.Component{
    render(){
        return(
            <View style={styles.mainContainer}>
                <Header title={'Sollu'}/>
            <View style={styles.Box}>
                <TextInput
                    style={styles.inputBox}
                    placeholder="Enter your number"
                    keyboardType='numeric'
                    maxLength={10}
                      >
                </TextInput>
                <View>
                <Button  style={styles.button}
                         title="Next"
                         onPress={()=> this.props.navigation.navigate('Home',{sender:'9940279032'})}>
                </Button>
                </View>
            </View>
            </View>

        );
    }
}
export default LoginScreen;