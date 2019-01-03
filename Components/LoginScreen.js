import React, {Component} from 'react';
import {View,TextInput,Button} from 'react-native';
import styles from "../Stylesheet/styleSheet";
import Header from "./Header";
import firebase from '../firebase/firebase';

class LoginScreen extends React.Component{
   state = { number : '',}

    validNumber = (text) => {
       this.setState({
           number:text
       })
    }
    handlePress = () => {
      let db = firebase.database();
      let taskRef = db.ref('registeredUsers');
      this.props.navigation.navigate("HomeScreen",{sender:this.state.number});
      taskRef.once('value',(registeredUsers) => {
          if(!registeredUsers.hasChild(this.state.number)){
              taskRef.child(this.state.number).set('done');
          }
      })
    }
    static navigationOptions = ({ navigation }) => {
        return(
            {
                headerTitle: "SolluApp",
                headerBackTitle: "Back",
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
            <View style={styles.mainContainer}>
                <Header title={'Sollu'}/>
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
            </View>

        );
    }
}
export default LoginScreen;