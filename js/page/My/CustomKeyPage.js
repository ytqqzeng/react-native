/**
 * react-native-easy-toast 插件的使用和 AsyncStorage的基本使用
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Image,
    Text,
    TextInput,
    View,
    AsyncStorage
} from 'react-native';
import NavigationBar from '../../common/NavigationBar'
// import Toast, {DURATION} from 'react-native-easy-toast' 
export default class CustomKeyPage extends Component {
    constructor(props){
        super(props);
        this.state = {
             
        }
    }
     
    render() {
        return (
            <View style={styles.container}>
                 <NavigationBar
                    title= '自定义标签'
                    style = {{backgroundColor:'#2196F3'}}
                 />
                <Text>自定义标签</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    btn: {
        margin:5,
        borderWidth:1,
        padding:2
    },
    page2: {
        flex:1,
        backgroundColor: 'green',
    },
    image:{
        height: 22,
        width: 22
    }
});
