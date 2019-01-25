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
    View,
    Dimensions
} from 'react-native';


export default class FlexDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            
                <View style={styles.container}>
                    <Text>sss</Text>
                    <View style={styles.views}>
                        <Image
                            style={styles.image}
                            source={{uri:'https://gd1.alicdn.com/imgextra/i4/791105148/O1CN01uVEr3b1ntpQGtz8Cg_!!791105148.jpg_400x400.jpg'}}
                        /> 
                    </View >
                </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F5FCFF',
    },
    views: {
        flex: 1,
        height:400,
        backgroundColor: 'red',
        flexDirection:'row'
    },
    image: {
        flex:1,
        height:100
    },
   
});
