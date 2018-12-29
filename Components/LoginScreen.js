import React, {Component} from 'react';
import {View,TextInput,Button} from 'react-native';

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
            <View>
                <TextInput placeholder="Enter your number"
                           keyboardType='numeric'
                           maxLength={10}
                      >
                </TextInput>
                <Button  title="Next"
                         onPress={()=> this.props.navigation.navigate('Home',)}
                            >
                </Button>
            </View>
        );
    }
}
export default LoginScreen;
