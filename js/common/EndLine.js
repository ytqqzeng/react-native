/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
 
export default class EndLine extends Component {
     
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.left}></View>
                {this.props.title ? <Text style={styles.content}>{this.props.title}</Text>:null}
                <View style={styles.right}></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    left:{
        width: 200,
        height:2,
        backgroundColor: '#666',
    },
    right:{
        width: 200,
        height:2,
        backgroundColor: '#666'

    },
    content: {
        paddingLeft: 20,
        paddingRight: 20,
        color: '#333',
        textAlign:'center'
    }
});
