import React, {Component} from 'react';
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native';;
import { RNCamera } from 'react-native-camera';

export default class ProfileSettingsScreen extends Component {
    render() {
            return (
                <View style={styles.container}>
                    <RNCamera
                        ref={ref => {this.camera = ref;}}
                        style={styles.preview}
                        type={RNCamera.Constants.Type.back}
                        flashMode={RNCamera.Constants.FlashMode.on}/>
                    <View style={styles.button}>
                        <TouchableOpacity style={styles.capture}>
                            <Text style={styles.text}> SNAP </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        preview: {
            flex: 1,
            alignItems: 'center',
        },
        capture: {
            flex: 0,
            backgroundColor: '#fff',
            padding: 1,
            paddingHorizontal: 20,
            alignSelf: 'center',
            margin: 10,
        },
        button : {
            flex: 0,
            flexDirection: 'row',
            justifyContent: 'center'
        },
        text : {
            fontSize: 14
        }
    });