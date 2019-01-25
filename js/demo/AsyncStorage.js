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
import NavigationBar from '../common/NavigationBar'
import Toast, {DURATION} from 'react-native-easy-toast' 
 
 
export default class StoragePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            text:''
        }
    }
    save(){
        AsyncStorage.setItem('text',this.state.text,(error)=>{//注意回调的参数
            if(!error){
                this.refs.toast.show('数据保存成功!',DURATION.LENGTH_LONG) 
            }
        })
    }
    getData(){
        AsyncStorage.getItem('text',(error,result)=>{ //注意回调的参数
            if(!error){
                if(result){
                    this.refs.toast.show('获取数据成功----'+result,DURATION.LENGTH_LONG) // LENGTH_SHORT 持续时间短
                }else{
                    this.refs.toast.show('没有保存的数据')
                }
            }
        })
    }
    del(){
        AsyncStorage.removeItem('text',(error)=>{
            if(!error){
                this.refs.toast.show('删除数据成功',1000) //持续1s的时间
            }
        })
    }
    render() {
        return (
            <View style={styles.container}>
                 <NavigationBar
                    title= '数据储存'
                    style = {{backgroundColor:'#2196F3'}}
                 />
                 <TextInput 
                 style={{borderWidth:1}}
                    placeholder={'请输入'}
                    onChangeText={(text) => this.setState({text})}
                 />
                 <View style={{flexDirection:'row'}}>
                    <Text 
                        style={styles.btn}
                        onPress = {()=>{
                            this.save()
                        }}
                    >保存</Text>
                    <Text 
                        style={styles.btn}
                        onPress = {()=>{
                            this.del()
                        }}
                    >清除</Text>
                    <Text 
                        style={styles.btn}
                        onPress = {()=>{
                            this.getData()
                        }}
                    >获取</Text>
                 </View>
                 <Toast 
                    ref="toast"
                    style={{backgroundColor:'red'}}
                    position='top' //设置位置
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{color:'#000'}}
                />
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
