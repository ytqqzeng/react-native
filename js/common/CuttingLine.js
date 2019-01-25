/**
 * 分割线
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
import { scaleSize, scaleHeight, setSpText2, } from '../util/screenUtil'
export default class CuttingLine extends Component {
    render() {
        // 通过参数来标记使用哪一种分割线
            return (
                <View style={styles.container}>
                     <Text style={styles.content}>{this.props.title}</Text>
                     <View style={styles.line}>
                        <View style={[styles.dolt,styles.leftdolt]}></View>
                        <View style={[styles.dolt,styles.middolt]}></View>
                        <View style={[styles.dolt,styles.righttdolt]}></View>
                     </View>
                </View>
            );
    }
}
// 第二种样式的分割线 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        left:scaleSize(-20)
         
    },
    content: {
        width:scaleSize(200),
        height:scaleHeight(24),
        lineHeight:scaleHeight(20),
        textAlign:'left',
        color:'#fff',
        fontSize:setSpText2(12),
        backgroundColor: '#000',
        paddingLeft:scaleSize(30),
    },
    line: {
        // flex:1,
        width:scaleSize(260),
        height:2,
        backgroundColor: '#333',
        zIndex:100
    },
    dolt:{
        position:'absolute',
        top:-5,
        width:scaleSize(6),
        height:scaleSize(6),
        borderRadius:scaleSize(3),
        backgroundColor:'#333'
    },
    leftdolt:{
        left:30
    },
    middolt:{
        left:60
    },
    righttdolt:{
        left:90
    },
});
