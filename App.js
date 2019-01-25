/**
 * Sample React Native App
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
    View
} from 'react-native';
 
 
export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
             
        }
    }
    render() {
        return (
            <View style={styles.container}>
                 
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    page1: {
        flex:1,
        backgroundColor: 'red',
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
