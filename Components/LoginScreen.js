import React, {Component} from 'react';
import {View,TextInput,Button} from 'react-native';
import styles from "../Stylesheet/styleSheet";
import firebase from '../firebase/firebase';

class LoginScreen extends React.Component{
   state = { phoneNumber : '',}

    validNumber = (number) => {
       this.setState({
           phoneNumber:number
       })
    }
    handlePress = () => {
      let db = firebase.database();
      let taskRef = db.ref('registeredUsers');
      this.props.navigation.navigate("HomeScreen",{sender:this.state.phoneNumber});
      taskRef.once('value',(registeredUsers) => {
          if(!registeredUsers.hasChild(this.state.phoneNumber)){
              taskRef.child(this.state.phoneNumber).set('done');
          }
      })
    }
    static navigationOptions = ({ navigation }) => {
        return(
            {
                headerTitle: "SolluApp",
                // headerBackTitle: "Back",
                headerTintColor: "white",
                headerStyle: {
                    backgroundColor: '#cc504e',
                },
                headerTitleStyle: {
                    textAlign:"left",
                    flex:1
                }
            }
        );
    };
    render(){
        return(
            <View style={styles.Box}>
                <TextInput
                    style={styles.inputBox}
                    placeholder="Enter your number"
                    keyboardType='numeric'
                    maxLength={10}
                    onChangeText = {this.validNumber}>
                </TextInput>
                <View>
                <Button  style={styles.button}
                         title="Next"
                         onPress={this.handlePress}>
                </Button>
                </View>
            </View>
        );
    }
}
export default LoginScreen;