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
    TouchableOpacity
} from 'react-native';
 
 
export default class RepositoryCell extends Component {
    render() {
        return (
            <TouchableOpacity
                style={styles.container}
            >
                <View style={styles.cell_container}>
                    <Text style={styles.title}>{this.props.data.full_name}</Text>
                    <Text style={styles.description}>{this.props.data.description}</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text>author:</Text>
                            <Image 
                                style={{height:22,width:22}}
                                source = {{uri:this.props.data.owner.avatar_url}}
                            />
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text>stars:</Text>
                            <Text>{this.props.data.stargazers_count}</Text>
                            <Image 
                                style={{height:22,width:22}}
                                source = {require('../../res/images/ic_star.png')}
                        />
                        </View>
                        
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
    ,
    title: {
        fontSize:16,
        marginBottom:2,
        color:'#212121'
    },
    description:{
        fontSize:16,
        marginBottom:2,
        color:'#757575',
        borderRadius:2
    },
    cell_container:{
        backgroundColor:'#fff',
        padding:10,
        marginLeft:5,
        marginRight:5,
        marginVertical:3,
        borderWidth:0.5,
        // 这几个是ios下面的样式
        // shodowColor:'grey',
        // shodowOffset:{width:0.5,height:0.5},
        // shodowOpacity:'0.4',
        // shodowRadius:1,
        elevation:2 //android独有为视图添加一个投影
        
    }
});
