//  头像组件
import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View
} from 'react-native';


export default class Avartar extends Component {
    
    render() {
        const size = this.props.size
        return (
            <View style={styles.container}>
                <Image
                    style={[styles.avatar,size]}
                    source={{ uri: this.props.avatarUrl }}
                />
                <Text style={styles.avatanamer}>{this.props.avatarName}</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    avatanamer:{
        fontSize:18,
        marginLeft:5,
    }
});
